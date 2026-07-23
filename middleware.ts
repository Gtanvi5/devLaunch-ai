import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// 1. Define routes that require authentication
const isProtectedRoute = createRouteMatcher(["/dashboard(.*)", "/api(.*)"]);

// 2. Define API routes that must remain public (webhooks, newsletters)
const isPublicApiRoute = createRouteMatcher([
  "/api/webhooks/clerk(.*)",
  "/api/webhooks/razorpay(.*)",
  "/api/newsletter(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  // Allow public API routes to bypass protection entirely
  if (isPublicApiRoute(req)) {
    return;
  }

  // Protect dashboard and standard API routes
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
