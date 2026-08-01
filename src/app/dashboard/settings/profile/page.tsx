"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useUser } from "@clerk/nextjs";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { User, Camera, Upload, Trash2, Shield, Lock, Save } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/gif"];

const profileSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    avatar: z
      .any()
      .refine(
        (files) =>
          !files || files.length === 0 || files[0]?.size <= MAX_FILE_SIZE,
        "Max image size is 5MB.",
      )
      .refine(
        (files) =>
          !files ||
          files.length === 0 ||
          ACCEPTED_IMAGE_TYPES.includes(files[0]?.type),
        "Only .jpg, .png, and .gif formats are supported.",
      )
      .optional(),
    currentPassword: z.string().optional(),
    newPassword: z.string().optional(),
    confirmPassword: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.newPassword || data.confirmPassword || data.currentPassword) {
      if (!data.currentPassword) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Current password is required to change password.",
          path: ["currentPassword"],
        });
      }
      if (!data.newPassword) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please enter a new password.",
          path: ["newPassword"],
        });
      } else if (data.newPassword.length < 8) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Password must be at least 8 characters.",
          path: ["newPassword"],
        });
      }
      if (data.newPassword !== data.confirmPassword) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "New passwords do not match.",
          path: ["confirmPassword"],
        });
      }
    }
  });

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function ProfileSettingsPage() {
  const { user, isLoaded } = useUser();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  }, [user, reset]);

  const avatarFile = useWatch({
    control: useForm<ProfileFormValues>({
      resolver: zodResolver(profileSchema),
      defaultValues: {
        firstName: "",
        lastName: "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      },
    }).control,
    name: "avatar",
  });

  useEffect(() => {
    if (avatarFile && avatarFile.length > 0) {
      const file = avatarFile[0];
      const url = URL.createObjectURL(file);
      const timer = setTimeout(() => {
        setPreviewUrl(url);
      }, 0);

      return () => {
        clearTimeout(timer);
        URL.revokeObjectURL(url);
      };
    }
  }, [avatarFile]);

  const { ref: avatarRef, ...avatarRest } = register("avatar");

  const handleCancel = () => {
    if (user) {
      reset({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
    setPreviewUrl(null);
  };

  const onSubmit = async (data: ProfileFormValues) => {
    if (!user) return;

    const currentFirstName = user.firstName || "";
    const currentLastName = user.lastName || "";

    const tasks: { name: string; promise: Promise<unknown> }[] = [];

    if (
      data.firstName !== currentFirstName ||
      data.lastName !== currentLastName
    ) {
      tasks.push({
        name: "profile details",
        promise: user.update({
          firstName: data.firstName,
          lastName: data.lastName,
        }),
      });
    }

    if (data.avatar && data.avatar.length > 0) {
      const file = data.avatar[0];
      tasks.push({
        name: "profile picture",
        promise: user.setProfileImage({ file }),
      });
    }

    if (data.newPassword && data.currentPassword) {
      tasks.push({
        name: "password",
        promise: user.updatePassword({
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
        }),
      });
    }

    if (tasks.length === 0) {
      toast.info("No changes to save.");
      return;
    }

    const results = await Promise.allSettled(tasks.map((t) => t.promise));

    let passwordSucceeded = false;
    let hasErrors = false;

    results.forEach((result, index) => {
      const taskName = tasks[index].name;

      if (result.status === "rejected") {
        hasErrors = true;
        const error = result.reason;

        let errorMessage = `Failed to update ${taskName}.`;
        if (isClerkAPIResponseError(error)) {
          errorMessage =
            error.errors[0]?.longMessage ||
            error.errors[0]?.message ||
            errorMessage;
        } else if (error instanceof Error) {
          errorMessage = error.message;
        }

        toast.error(errorMessage);
      } else {
        if (taskName === "password") {
          passwordSucceeded = true;
        }
      }
    });

    setPreviewUrl(null);

    if (passwordSucceeded) {
      setValue("currentPassword", "");
      setValue("newPassword", "");
      setValue("confirmPassword", "");
    }

    if (!hasErrors) {
      toast.success("Profile updated successfully");
    } else if (results.some((r) => r.status === "fulfilled")) {
      toast.warning("Some changes were saved, but others failed.");
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageRemove = async () => {
    if (!user) return;

    if (confirm("Are you sure you want to remove your profile picture?")) {
      try {
        await user.setProfileImage({ file: null });
        setPreviewUrl(null);
        setValue("avatar", undefined);
        toast.success("Profile picture removed");
      } catch (error) {
        console.error("Error removing image:", error);
        toast.error("Failed to remove profile image.");
      }
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-[#0A0A0A]">
        <div className="w-6 h-6 border-2 border-zinc-400 border-t-zinc-900 rounded-full animate-spin" />
      </div>
    );
  }

  const displayImage = previewUrl || user?.imageUrl;

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-[#0A0A0A] p-4 md:p-8 pt-24 md:pt-8 lg:pl-72">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white mb-2">
            Profile Settings
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Manage your personal information and security preferences.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-zinc-900/50 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-6"
          >
            <div
              className="relative group cursor-pointer shrink-0"
              onClick={handleUploadClick}
            >
              <div className="w-24 h-24 rounded-full bg-linear-to-br from-violet-500 to-indigo-500 flex items-center justify-center text-white text-3xl font-bold shadow-md overflow-hidden relative">
                {displayImage ? (
                  <Image
                    src={displayImage}
                    alt="Profile"
                    fill
                    className="object-cover"
                    unoptimized={!!previewUrl}
                  />
                ) : (
                  <span>{user?.firstName?.charAt(0) || "U"}</span>
                )}

                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                Profile Picture
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-xs">
                We support PNG, JPEG, and GIF formats. The optimal size is
                256x256 pixels.
              </p>

              <input
                type="file"
                className="hidden"
                accept="image/png, image/jpeg, image/gif"
                {...avatarRest}
                ref={(e) => {
                  avatarRef(e);
                  fileInputRef.current = e;
                }}
              />

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleUploadClick}
                  className="inline-flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white px-4 py-2 rounded-xl text-xs font-semibold hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all"
                >
                  <Upload className="w-4 h-4" /> Upload New
                </button>
                <button
                  type="button"
                  onClick={handleImageRemove}
                  className="inline-flex items-center gap-2 text-zinc-500 hover:text-red-500 transition-colors px-3 py-2 text-xs font-medium"
                >
                  <Trash2 className="w-4 h-4" /> Remove
                </button>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-zinc-900/50 rounded-3xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm"
          >
            <div className="p-6 sm:p-8 border-b border-zinc-200 dark:border-zinc-800 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center border border-blue-100 dark:border-blue-500/20">
                <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
                  Personal Details
                </h2>
                <p className="text-xs text-zinc-500">
                  Update your name and primary email address.
                </p>
              </div>
            </div>

            <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label
                  htmlFor="firstName"
                  className="text-xs font-medium text-zinc-700 dark:text-zinc-300"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  {...register("firstName")}
                  className="w-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all"
                />
                {errors.firstName && (
                  <p className="text-[10px] text-red-500 mt-1">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="lastName"
                  className="text-xs font-medium text-zinc-700 dark:text-zinc-300"
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  {...register("lastName")}
                  className="w-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all"
                />
                {errors.lastName && (
                  <p className="text-[10px] text-red-500 mt-1">
                    {errors.lastName.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label
                  htmlFor="email"
                  className="text-xs font-medium text-zinc-700 dark:text-zinc-300"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  defaultValue={user?.primaryEmailAddress?.emailAddress || ""}
                  disabled
                  className="w-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-500 dark:text-zinc-400 cursor-not-allowed opacity-70"
                />
                <p className="text-[10px] text-zinc-500 mt-1">
                  To change your email address, please contact support.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-zinc-900/50 rounded-3xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm"
          >
            <div className="p-6 sm:p-8 border-b border-zinc-200 dark:border-zinc-800 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-500/10 flex items-center justify-center border border-orange-100 dark:border-orange-500/20">
                <Shield className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
                  Security
                </h2>
                <p className="text-xs text-zinc-500">
                  Ensure your account is using a long, random password.
                </p>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div className="space-y-1.5 max-w-md">
                <label
                  htmlFor="currentPassword"
                  className="text-xs font-medium text-zinc-700 dark:text-zinc-300"
                >
                  Current Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input
                    id="currentPassword"
                    type="password"
                    autoComplete="current-password"
                    placeholder="Enter current password"
                    {...register("currentPassword")}
                    className="w-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all"
                  />
                </div>
                {errors.currentPassword && (
                  <p className="text-[10px] text-red-500 mt-1">
                    {errors.currentPassword.message}
                  </p>
                )}
              </div>

              <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/50 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label
                    htmlFor="newPassword"
                    className="text-xs font-medium text-zinc-700 dark:text-zinc-300"
                  >
                    New Password
                  </label>
                  <input
                    id="newPassword"
                    type="password"
                    autoComplete="new-password"
                    placeholder="New password"
                    {...register("newPassword")}
                    className="w-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all"
                  />
                  {errors.newPassword && (
                    <p className="text-[10px] text-red-500 mt-1">
                      {errors.newPassword.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="confirmPassword"
                    className="text-xs font-medium text-zinc-700 dark:text-zinc-300"
                  >
                    Confirm New Password
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    placeholder="Confirm new password"
                    {...register("confirmPassword")}
                    className="w-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all"
                  />
                  {errors.confirmPassword && (
                    <p className="text-[10px] text-red-500 mt-1">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-end gap-4 pt-4"
          >
            <button
              type="button"
              onClick={handleCancel}
              className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all disabled:opacity-70 shadow-sm"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-zinc-400 border-t-transparent dark:border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Changes
                </>
              )}
            </button>
          </motion.div>
        </form>
      </div>
    </main>
  );
}
