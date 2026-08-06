import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProRoute = createRouteMatcher([
  "/pro-tools(.*)",
  "/dashboard/premium(.*)",
]);

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/pro-tools(.*)",
  "/api(.*)",
  "/team(.*)",
]);

const isTeamAdminRoute = createRouteMatcher(["/team(.*)"]);

const isPublicApiRoute = createRouteMatcher([
  "/api/webhooks/clerk(.*)",
  "/api/webhooks/razorpay(.*)",
  "/api/newsletter(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (isPublicApiRoute(req)) {
    return;
  }

  if (isProtectedRoute(req)) {
    await auth.protect();
  }

  if (isTeamAdminRoute(req)) {
    const { has } = await auth();

    if (!has({ role: "org:admin" })) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  if (!isProRoute(req)) {
    return NextResponse.next();
  }

  const { orgId, sessionClaims } = await auth();

  if (!orgId) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  const plan = sessionClaims?.org_plan as string | undefined;

  if (plan !== "pro") {
    const billingUrl = new URL("/team", req.url);
    billingUrl.searchParams.set("error", "upgrade_required");
    return NextResponse.redirect(billingUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
