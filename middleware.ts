// middleware.ts
import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware(async (auth, req) => {
  const { pathname } = req.nextUrl;

  // 1. Define the routes that anyone can access without logging in natively
  const isPublicRoute =
    pathname === "/" ||
    pathname === "/pricing" ||
    pathname.startsWith("/sign-in") ||
    pathname.startsWith("/sign-up") ||
    pathname.startsWith("/api/webhooks");

  // 2. If the user is trying to access a route that isn't public, force them to log in
  if (!isPublicRoute) {
    await auth.protect();
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
