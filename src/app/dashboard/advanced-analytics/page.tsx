import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function AdvancedAnalyticsPage() {
  const { orgId, sessionClaims } = await auth();

  if (!orgId) {
    redirect("/dashboard");
  }

  const plan = sessionClaims?.org_plan as string | undefined;
  const isPro = plan === "pro" || plan === "enterprise";

  if (!isPro) {
    redirect("/dashboard/billing");
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Advanced Analytics</h1>
      <div className="p-4 border rounded-xl bg-zinc-50">
        <p>
          Welcome to the Pro tools! You can only see this if your workspace is
          upgraded.
        </p>
      </div>
    </main>
  );
}
