"use client";

import { useState } from "react";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronsUpDown, Check, Plus, Building2, User } from "lucide-react";
import { useRouter } from "next/navigation";
import CreateWorkspaceModal from "./CreateWorkspaceModal";

export default function OrganizationSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const { organization, isLoaded: isOrgLoaded } = useOrganization();

  const {
    userMemberships,
    setActive,
    isLoaded: isListLoaded,
  } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });

  const isLoading = !isOrgLoaded || !isListLoaded;

  const handleOrganizationSelect = async (organizationId: string | null) => {
    if (!setActive) return;

    await setActive({ organization: organizationId });
    setIsOpen(false);

    router.refresh();
  };

  const plan = (organization?.publicMetadata?.plan as string) || "free";
  const isPro = plan === "pro" || plan === "enterprise";

  if (isLoading) {
    return (
      <div className="w-full h-12 bg-zinc-100 dark:bg-zinc-800 animate-pulse rounded-xl" />
    );
  }

  return (
    <>
      <div className="relative w-full">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between gap-3 p-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 rounded-xl transition-colors"
        >
          <div className="flex items-center gap-3 overflow-hidden">
            {organization ? (
              <div className="relative w-8 h-8 rounded-lg overflow-hidden shrink-0 border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800">
                <Image
                  src={organization.imageUrl}
                  alt={organization.name}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-8 h-8 rounded-lg bg-violet-100 dark:bg-violet-500/10 flex items-center justify-center shrink-0 border border-violet-200 dark:border-violet-500/20">
                <Building2 className="w-4 h-4 text-violet-600 dark:text-violet-400" />
              </div>
            )}

            <div className="flex flex-col items-start truncate">
              <span className="text-sm font-semibold text-zinc-900 dark:text-white truncate">
                {organization?.name || "Personal Workspace"}
              </span>
              <span
                className={`text-[10px] font-medium ${
                  isPro
                    ? "text-violet-600 dark:text-violet-400"
                    : "text-zinc-500"
                }`}
              >
                {isPro ? "Pro Plan" : "Free Plan"}
              </span>
            </div>
          </div>

          <ChevronsUpDown className="w-4 h-4 text-zinc-400 shrink-0 mr-1" />
        </button>

        <AnimatePresence>
          {isOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsOpen(false)}
              />

              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute left-0 right-0 top-full mt-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl z-50 overflow-hidden py-1"
              >
                <div className="px-3 py-2 border-b border-zinc-100 dark:border-zinc-800">
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                    Your Workspaces
                  </span>
                </div>

                <div className="max-h-70 overflow-y-auto py-1">
                  <button
                    onClick={() => handleOrganizationSelect(null)}
                    className={`w-full flex items-center justify-between px-3 py-2 text-sm transition-colors ${
                      !organization
                        ? "bg-violet-50 dark:bg-violet-500/10 text-violet-700 dark:text-violet-300"
                        : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                    }`}
                  >
                    <div className="flex items-center gap-3 truncate">
                      <div className="w-5 h-5 flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 rounded-md border border-zinc-200 dark:border-zinc-700">
                        <User className="w-3 h-3 text-zinc-500" />
                      </div>
                      <span className="truncate font-medium">
                        Personal Workspace
                      </span>
                    </div>
                    {!organization && <Check className="w-4 h-4 shrink-0" />}
                  </button>

                  {userMemberships?.data?.map((mem) => {
                    const isActive = organization?.id === mem.organization.id;

                    return (
                      <button
                        key={mem.id}
                        onClick={() =>
                          handleOrganizationSelect(mem.organization.id)
                        }
                        className={`w-full flex items-center justify-between px-3 py-2 text-sm transition-colors ${
                          isActive
                            ? "bg-violet-50 dark:bg-violet-500/10 text-violet-700 dark:text-violet-300"
                            : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                        }`}
                      >
                        <div className="flex items-center gap-3 truncate">
                          <Image
                            src={mem.organization.imageUrl}
                            alt={mem.organization.name}
                            width={20}
                            height={20}
                            className="rounded-md object-cover"
                          />
                          <span className="truncate font-medium">
                            {mem.organization.name}
                          </span>
                        </div>

                        {isActive && <Check className="w-4 h-4 shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                <div className="border-t border-zinc-100 dark:border-zinc-800 mt-1 pt-1">
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      setIsModalOpen(true);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors font-medium"
                  >
                    <Plus className="w-4 h-4" />
                    Create Workspace
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      <CreateWorkspaceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
