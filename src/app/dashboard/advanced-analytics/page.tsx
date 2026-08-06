import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function AdvancedAnalyticsPage() {
  const { orgId } = await auth();

  if (!orgId) {
    redirect("/dashboard");
  }

  const client = await clerkClient();
  const organization = await client.organizations.getOrganization({
    organizationId: orgId,
  });

  const plan = organization.publicMetadata?.plan as string | undefined;
  const isPro = plan === "pro" || plan === "enterprise";

  if (!isPro) {
    redirect("/dashboard/billing?upgrade_required=true");
  }

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Advanced Analytics</h1>

      <div className="p-6 border border-zinc-200 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 dark:border-zinc-800">
        <h2 className="text-xl font-semibold mb-2">Welcome to Pro</h2>
        <p className="text-zinc-600 dark:text-zinc-400">
          You are securely viewing this page because your workspace is upgraded.
          Server-side route guards have verified your Razorpay subscription
          status.
        </p>
      </div>
    </main>
  );
}
