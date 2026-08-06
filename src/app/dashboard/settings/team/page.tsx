"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { useOrganization } from "@clerk/nextjs";
import Image from "next/image";
import {
  Users,
  Mail,
  Shield,
  MoreVertical,
  UserPlus,
  Clock,
  X,
  Send,
  Loader2,
  Building2,
  Camera,
  Save,
  Check,
  UserMinus,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";

function useOnClickOutside<T extends HTMLElement>(
  ref: React.RefObject<T>,
  handler: (event: MouseEvent | TouchEvent) => void,
) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}

const inviteSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  role: z.enum(["org:admin", "org:member"]),
});
type InviteFormValues = z.infer<typeof inviteSchema>;

const orgNameSchema = z.object({
  name: z.string().min(2, "Workspace name must be at least 2 characters."),
});
type OrgNameFormValues = z.infer<typeof orgNameSchema>;

const formatRole = (role: string) => {
  if (role === "org:admin") return "Admin";
  if (role === "org:member") return "Member";
  return role;
};

export default function TeamSettingsPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useOnClickOutside(dropdownRef as React.RefObject<HTMLElement>, () =>
    setActiveDropdown(null),
  );

  const {
    isLoaded,
    organization,
    memberships,
    invitations,
    membership: currentMembership,
  } = useOrganization({
    memberships: {
      pageSize: 50,
    },
    invitations: {
      pageSize: 50,
    },
  });

  const isAdmin = currentMembership?.role === "org:admin";

  type TeamMember = NonNullable<
    NonNullable<typeof memberships>["data"]
  >[number];

  const {
    register: registerInvite,
    handleSubmit: handleInviteSubmit,
    reset: resetInvite,
    setError: setErrorInvite,
    formState: { errors: inviteErrors, isSubmitting: isSubmittingInvite },
  } = useForm<InviteFormValues>({
    resolver: zodResolver(inviteSchema),
    defaultValues: { email: "", role: "org:member" },
  });

  const {
    register: registerOrg,
    handleSubmit: handleOrgSubmit,
    setError: setErrorOrg,
    formState: { errors: orgErrors, isSubmitting: isSubmittingOrg },
  } = useForm<OrgNameFormValues>({
    resolver: zodResolver(orgNameSchema),
    values: { name: organization?.name || "" },
  });

  const onInviteSubmit = async (data: InviteFormValues) => {
    if (!organization) return;
    try {
      await organization.inviteMember({
        emailAddress: data.email,
        role: data.role,
      });
      toast.success(`Invitation sent to ${data.email}`);
      resetInvite();
    } catch (error) {
      if (isClerkAPIResponseError(error)) {
        let hasFieldError = false;
        error.errors.forEach((err) => {
          if (err.meta?.paramName === "email_address") {
            setErrorInvite("email", {
              message: err.longMessage || err.message,
            });
            hasFieldError = true;
          }
        });

        if (!hasFieldError) {
          toast.error(
            error.errors[0]?.longMessage || "Failed to send invitation.",
          );
        }
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  const onOrgNameSubmit = async (data: OrgNameFormValues) => {
    if (!organization) return;
    try {
      await organization.update({ name: data.name });
      toast.success("Workspace name updated successfully!");
      router.refresh();
    } catch (error) {
      if (isClerkAPIResponseError(error)) {
        let hasFieldError = false;
        error.errors.forEach((err) => {
          if (err.meta?.paramName === "name") {
            setErrorOrg("name", { message: err.longMessage || err.message });
            hasFieldError = true;
          }
        });

        if (!hasFieldError) {
          toast.error(
            error.errors[0]?.longMessage || "Failed to update workspace name.",
          );
        }
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !organization) return;

    try {
      setIsUploadingLogo(true);
      await organization.setLogo({ file });
      toast.success("Workspace logo updated!");
      router.refresh();
    } catch (error) {
      if (isClerkAPIResponseError(error)) {
        toast.error(error.errors[0]?.longMessage || error.errors[0]?.message);
      } else {
        toast.error("Failed to update workspace logo. Please try again.");
      }
    } finally {
      setIsUploadingLogo(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleRemoveLogo = async () => {
    if (!organization) return;
    try {
      setIsUploadingLogo(true);
      await organization.setLogo({ file: null });
      toast.success("Workspace logo removed!");
      router.refresh();
    } catch (error) {
      if (isClerkAPIResponseError(error)) {
        toast.error(error.errors[0]?.longMessage || error.errors[0]?.message);
      } else {
        toast.error("Failed to remove workspace logo. Please try again.");
      }
    } finally {
      setIsUploadingLogo(false);
    }
  };

  type Invite = NonNullable<NonNullable<typeof invitations>["data"]>[number];

  const handleRevoke = async (invite: Invite) => {
    try {
      await invite.revoke();
      toast.success("Invitation cancelled.");
    } catch (error) {
      if (isClerkAPIResponseError(error)) {
        toast.error(error.errors[0]?.longMessage || error.errors[0]?.message);
      } else {
        toast.error("Failed to cancel invitation.");
      }
    }
  };

  const handleRoleChange = async (member: TeamMember, newRole: string) => {
    try {
      await member.update({ role: newRole });
      toast.success("Role updated successfully.");
    } catch (error) {
      if (isClerkAPIResponseError(error)) {
        toast.error(error.errors[0]?.longMessage || error.errors[0]?.message);
      } else {
        toast.error("Failed to update role. Please try again.");
      }
    } finally {
      setActiveDropdown(null);
    }
  };

  const handleRemoveMember = async (member: TeamMember) => {
    try {
      await member.destroy();
      toast.success("Member removed from workspace.");
    } catch (error) {
      if (isClerkAPIResponseError(error)) {
        toast.error(error.errors[0]?.longMessage || error.errors[0]?.message);
      } else {
        toast.error("Failed to remove member. Please try again.");
      }
    } finally {
      setActiveDropdown(null);
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "org:admin":
        return "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/20";
      case "org:member":
        return "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700";
      default:
        return "bg-violet-100 text-violet-700 dark:bg-violet-500/10 dark:text-violet-400 border border-violet-200 dark:border-violet-500/20";
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-[#0A0A0A]">
        <Loader2 className="w-8 h-8 animate-spin text-zinc-400" />
      </div>
    );
  }

  if (!organization) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-[#0A0A0A]">
        <p className="text-zinc-500">
          You must be in an organization to view team settings.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white mb-2">
          Team & Workspace
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Manage your workspace profile, team members, and permissions.
        </p>
      </div>

      {isAdmin && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-zinc-900/50 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-violet-50 dark:bg-violet-500/10 flex items-center justify-center border border-violet-100 dark:border-violet-500/20">
              <Building2 className="w-5 h-5 text-violet-600 dark:text-violet-400" />
            </div>
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
              Workspace Profile
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row gap-8">
            <div className="flex flex-col items-center sm:items-start gap-4">
              <div className="relative group">
                <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 relative">
                  <Image
                    src={organization.imageUrl}
                    alt={`${organization.name} logo`}
                    fill
                    className="object-cover"
                  />

                  <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity gap-2">
                    {isUploadingLogo ? (
                      <Loader2 className="w-6 h-6 text-white animate-spin" />
                    ) : (
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="p-1.5 bg-white/20 hover:bg-white/30 rounded-lg backdrop-blur-sm transition-colors text-white"
                          title="Update Logo"
                        >
                          <Camera className="w-4 h-4" />
                        </button>
                        {organization.hasImage && (
                          <button
                            type="button"
                            onClick={handleRemoveLogo}
                            className="p-1.5 bg-red-500/80 hover:bg-red-500 rounded-lg backdrop-blur-sm transition-colors text-white"
                            title="Remove Logo"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleLogoUpload}
                  accept="image/png, image/jpeg, image/gif, image/webp"
                  className="hidden"
                />
              </div>
              <p className="text-[11px] text-zinc-500 text-center sm:text-left max-w-30">
                Recommended: Square JPG, PNG, or GIF, at least 256x256px.
              </p>
            </div>

            <form
              onSubmit={handleOrgSubmit(onOrgNameSubmit)}
              className="flex-1 space-y-4"
            >
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">
                  Workspace Name
                </label>
                <input
                  type="text"
                  {...registerOrg("name")}
                  placeholder="Acme Corp"
                  className="w-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl py-2.5 px-4 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all"
                />
                {orgErrors.name && (
                  <p className="text-[10px] text-red-500 mt-1">
                    {orgErrors.name.message}
                  </p>
                )}
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={isSubmittingOrg}
                  className="flex items-center gap-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all disabled:opacity-70"
                >
                  {isSubmittingOrg ? (
                    <div className="w-4 h-4 border-2 border-zinc-400 border-t-transparent dark:border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Save className="w-4 h-4" /> Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {isAdmin && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1 space-y-6"
          >
            <div className="bg-white dark:bg-zinc-900/50 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-violet-50 dark:bg-violet-500/10 flex items-center justify-center border border-violet-100 dark:border-violet-500/20">
                  <UserPlus className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                </div>
                <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
                  Invite Member
                </h2>
              </div>

              <form
                onSubmit={handleInviteSubmit(onInviteSubmit)}
                className="space-y-4"
              >
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                    <input
                      type="email"
                      {...registerInvite("email")}
                      placeholder="colleague@company.com"
                      className="w-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl py-2.5 pl-9 pr-4 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all"
                    />
                  </div>
                  {inviteErrors.email && (
                    <p className="text-[10px] text-red-500 mt-1">
                      {inviteErrors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">
                    Role
                  </label>
                  <div className="relative">
                    <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                    <select
                      {...registerInvite("role")}
                      className="w-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl py-2.5 pl-9 pr-4 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all appearance-none cursor-pointer"
                    >
                      <option value="org:admin">Admin</option>
                      <option value="org:member">Member</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmittingInvite}
                  className="w-full flex items-center justify-center gap-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all disabled:opacity-70"
                >
                  {isSubmittingInvite ? (
                    <div className="w-4 h-4 border-2 border-zinc-400 border-t-transparent dark:border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> Send Invitation
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`space-y-6 ${isAdmin ? "lg:col-span-2" : "lg:col-span-3"}`}
        >
          <div className="bg-white dark:bg-zinc-900/50 rounded-3xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm">
            <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center border border-zinc-200 dark:border-zinc-700">
                <Users className="w-5 h-5 text-zinc-600 dark:text-zinc-300" />
              </div>
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
                Active Members
              </h2>
            </div>

            <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {memberships?.data?.map((member) => (
                <div
                  key={member.id}
                  className="p-4 sm:p-6 flex items-center justify-between hover:bg-zinc-50/50 dark:hover:bg-zinc-800/20 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <Image
                      src={member.publicUserData?.imageUrl || ""}
                      alt={`${member.publicUserData?.firstName || "User"}'s avatar`}
                      width={40}
                      height={40}
                      className="rounded-full border border-zinc-200 dark:border-zinc-700 shadow-sm"
                    />
                    <div>
                      <p className="text-sm font-medium text-zinc-900 dark:text-white flex items-center gap-2">
                        {member.publicUserData?.firstName || "Unknown"}{" "}
                        {member.publicUserData?.lastName || ""}
                        {currentMembership?.id === member.id && (
                          <span className="text-[10px] bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 px-1.5 py-0.5 rounded-md font-semibold">
                            YOU
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-zinc-500">
                        {member.publicUserData?.identifier || ""}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`px-2.5 py-1 rounded-md text-xs font-medium ${getRoleBadge(member.role)}`}
                    >
                      {formatRole(member.role)}
                    </span>

                    {isAdmin && currentMembership?.id !== member.id && (
                      <div
                        className="relative"
                        ref={activeDropdown === member.id ? dropdownRef : null}
                      >
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveDropdown(
                              activeDropdown === member.id ? null : member.id,
                            );
                          }}
                          className="p-1.5 text-zinc-400 hover:text-zinc-900 dark:hover:text-white rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>

                        <AnimatePresence>
                          {activeDropdown === member.id && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95, y: -10 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.95, y: -10 }}
                              transition={{ duration: 0.15 }}
                              className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-lg z-50 overflow-hidden py-1"
                            >
                              <div className="px-3 py-2 border-b border-zinc-100 dark:border-zinc-800">
                                <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">
                                  Change Role
                                </span>
                              </div>

                              <button
                                onClick={() =>
                                  handleRoleChange(member, "org:admin")
                                }
                                className="w-full px-3 py-2 text-left text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 flex items-center justify-between transition-colors"
                              >
                                Admin
                                {member.role === "org:admin" && (
                                  <Check className="w-4 h-4 text-violet-500" />
                                )}
                              </button>
                              <button
                                onClick={() =>
                                  handleRoleChange(member, "org:member")
                                }
                                className="w-full px-3 py-2 text-left text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 flex items-center justify-between transition-colors"
                              >
                                Member
                                {member.role === "org:member" && (
                                  <Check className="w-4 h-4 text-violet-500" />
                                )}
                              </button>

                              <div className="h-px bg-zinc-100 dark:bg-zinc-800 my-1" />

                              <button
                                onClick={() => handleRemoveMember(member)}
                                className="w-full px-3 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 flex items-center gap-2 transition-colors"
                              >
                                <UserMinus className="w-4 h-4" />
                                Remove from Team
                              </button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {memberships?.hasNextPage && (
              <div className="p-4 flex justify-center border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/30 dark:bg-zinc-900/10">
                <button
                  onClick={() => memberships.fetchNext()}
                  disabled={memberships.isFetching}
                  className="text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center gap-2"
                >
                  {memberships.isFetching && (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  )}
                  Load More Members
                </button>
              </div>
            )}
          </div>

          {isAdmin && invitations?.data && invitations.data.length > 0 && (
            <div className="bg-white dark:bg-zinc-900/50 rounded-3xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm">
              <div className="p-6 border-b border-zinc-200 dark:border-zinc-800">
                <h2 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                  <Clock className="w-4 h-4 text-zinc-500" /> Pending
                  Invitations
                </h2>
              </div>

              <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {invitations.data.map((invite) => (
                  <div
                    key={invite.id}
                    className="p-4 sm:p-6 flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-900/20"
                  >
                    <div>
                      <p className="text-sm font-medium text-zinc-900 dark:text-white">
                        {invite.emailAddress}
                      </p>
                      <p className="text-xs text-zinc-500">
                        Invited as {formatRole(invite.role)} •{" "}
                        {new Date(invite.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleRevoke(invite)}
                        className="p-1.5 text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                        title="Cancel Invite"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {invitations?.hasNextPage && (
                <div className="p-4 flex justify-center border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/30 dark:bg-zinc-900/10">
                  <button
                    onClick={() => invitations.fetchNext()}
                    disabled={invitations.isFetching}
                    className="text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center gap-2"
                  >
                    {invitations.isFetching && (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    )}
                    Load More Invitations
                  </button>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
