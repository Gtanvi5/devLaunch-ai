import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import AdvancedAnalyticsUI from "./AdvancedAnalyticsUI";

export default async function AdvancedAnalyticsPage() {
  const { orgId } = await auth();

  // 1. Kick out users who aren't in a workspace
  if (!orgId) {
    redirect("/dashboard");
  }

  // 2. Fetch the active organization from Clerk
  const client = await clerkClient();
  const organization = await client.organizations.getOrganization({
    organizationId: orgId,
  });

  // 3. Check the plan metadata
  const plan = organization.publicMetadata?.plan as string | undefined;
  const isPro = plan === "pro" || plan === "enterprise";

  // 4. Redirect if they don't have access
  if (!isPro) {
    // Redirect them to an upgrade page with a specific error message
    redirect("/dashboard/billing?error=upgrade_required");
  }

  // 5. Render the pro content
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Advanced Analytics</h1>
      <AdvancedAnalyticsUI />
    </main>
  );
}
