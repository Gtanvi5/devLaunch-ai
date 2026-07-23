"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Mail,
  Shield,
  MoreVertical,
  UserPlus,
  CheckCircle2,
  Clock,
  X,
} from "lucide-react";

// Mock Data
const teamMembers = [
  {
    id: 1,
    name: "Alex Founder",
    email: "alex@devlaunch.ai",
    role: "Owner",
    avatar: "AF",
  },
  {
    id: 2,
    name: "Sarah Engineer",
    email: "sarah@devlaunch.ai",
    role: "Admin",
    avatar: "SE",
  },
  {
    id: 3,
    name: "Mike Marketing",
    email: "mike@devlaunch.ai",
    role: "Member",
    avatar: "MM",
  },
];

const pendingInvites = [
  {
    id: 1,
    email: "jessica@devlaunch.ai",
    role: "Member",
    invitedAt: "2 days ago",
  },
];

export default function TeamSettingsPage() {
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("Member");
  const [inviteSent, setInviteSent] = useState(false);

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail) return;

    // Simulate API call
    setInviteSent(true);
    setTimeout(() => {
      setInviteSent(false);
      setInviteEmail("");
    }, 3000);
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "Owner":
        return "bg-violet-100 text-violet-700 dark:bg-violet-500/10 dark:text-violet-400 border border-violet-200 dark:border-violet-500/20";
      case "Admin":
        return "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/20";
      default:
        return "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700";
    }
  };

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-[#0A0A0A] p-4 md:p-8 pt-24 md:pt-8 lg:pl-72">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white mb-2">
            Team & Workspace
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Invite colleagues, manage permissions, and collaborate on your
            DevLaunch projects.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Invite Section (Left Column) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
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

              <form onSubmit={handleInvite} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                    <input
                      type="email"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      placeholder="colleague@company.com"
                      className="w-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl py-2.5 pl-9 pr-4 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                    Role
                  </label>
                  <div className="relative">
                    <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                    <select
                      value={inviteRole}
                      onChange={(e) => setInviteRole(e.target.value)}
                      className="w-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl py-2.5 pl-9 pr-4 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all appearance-none cursor-pointer"
                    >
                      <option value="Admin">Admin</option>
                      <option value="Member">Member</option>
                      <option value="Viewer">Viewer (Read-only)</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={inviteSent}
                  className="w-full flex items-center justify-center gap-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all disabled:opacity-70"
                >
                  {inviteSent ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      Invite Sent
                    </>
                  ) : (
                    "Send Invitation"
                  )}
                </button>
              </form>
            </div>

            {/* Workspace Limits */}
            <div className="bg-zinc-50 dark:bg-zinc-900/30 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-6">
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-white mb-2">
                Workspace Seats
              </h3>
              <p className="text-xs text-zinc-500 mb-4">
                You are currently on the Pro Plan.
              </p>
              <div className="flex justify-between text-sm font-medium mb-2">
                <span className="text-zinc-900 dark:text-white">4 used</span>
                <span className="text-zinc-500">5 total</span>
              </div>
              <div className="w-full bg-zinc-200 dark:bg-zinc-800 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-violet-500 h-2 rounded-full"
                  style={{ width: "80%" }}
                ></div>
              </div>
            </div>
          </motion.div>

          {/* Team List Section (Right Column) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Active Members Table */}
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
                {teamMembers.map((member) => (
                  <div
                    key={member.id}
                    className="p-4 sm:p-6 flex items-center justify-between hover:bg-zinc-50/50 dark:hover:bg-zinc-800/20 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center text-white text-sm font-bold shadow-sm">
                        {member.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-zinc-900 dark:text-white">
                          {member.name}
                        </p>
                        <p className="text-xs text-zinc-500">{member.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <span
                        className={`px-2.5 py-1 rounded-md text-xs font-medium ${getRoleBadge(member.role)}`}
                      >
                        {member.role}
                      </span>
                      {member.role !== "Owner" && (
                        <button className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pending Invites */}
            {pendingInvites.length > 0 && (
              <div className="bg-white dark:bg-zinc-900/50 rounded-3xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm">
                <div className="p-6 border-b border-zinc-200 dark:border-zinc-800">
                  <h2 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                    <Clock className="w-4 h-4 text-zinc-500" /> Pending
                    Invitations
                  </h2>
                </div>

                <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
                  {pendingInvites.map((invite) => (
                    <div
                      key={invite.id}
                      className="p-4 sm:p-6 flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-900/20"
                    >
                      <div>
                        <p className="text-sm font-medium text-zinc-900 dark:text-white">
                          {invite.email}
                        </p>
                        <p className="text-xs text-zinc-500">
                          Invited as {invite.role} • {invite.invitedAt}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white bg-zinc-200 dark:bg-zinc-800 px-3 py-1.5 rounded-lg transition-colors">
                          Resend
                        </button>
                        <button
                          className="p-1.5 text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                          title="Cancel Invite"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </main>
  );
}
