import Pricing from "@/components/pricing";

export const metadata = {
  title: "Pricing | DevLaunch AI",
  description: "Simple, transparent pricing for founders.",
};

export default function PricingPage() {
  return (
    <main className="pt-20 min-h-screen bg-white dark:bg-[#0A0A0A]">
      {/* We simply call the component here instead of rewriting the code! */}
      <Pricing />
    </main>
  );
}
