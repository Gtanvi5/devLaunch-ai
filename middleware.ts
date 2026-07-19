// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// 1. Define the routes that anyone can access without logging in
const isPublicRoute = createRouteMatcher([
  "/", // Landing page
  "/pricing", // Pricing page
  "/sign-in(.*)", // Clerk Sign-in
  "/sign-up(.*)", // Clerk Sign-up
  "/api/webhooks(.*)", // Future Stripe webhooks
]);

export default clerkMiddleware((auth, req) => {
  // 2. If the user is trying to access a route that isn't public, force them to log in
  if (!isPublicRoute(req)) {
    auth().protect();
  }
});

// 3. Configure the middleware matcher to run on the correct paths
export const config = {
  matcher: [
    // Skip Next.js internals and all static files (images, css, fonts)
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run middleware for API routes
    "/(api|trpc)(.*)",
  ],
};
