import Hero from "@/components/hero";
import Features from "@/components/features";
import Testimonials from "@/components/testimonials";
import SampleReport from "@/components/SampleReport";
import Comparison from "@/components/comparison";
import Pricing from "@/components/pricing";
import FAQ from "@/components/faq";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <Hero />
      {/* Added IDs so the Navbar anchor links can find these sections */}
      <section id="features">
        <Features />
      </section>

      <section id="testimonials">
        <Testimonials />
      </section>

      {/* Added IDs to the new sections for Navbar routing */}
      <section id="sample-report">
        <SampleReport />
      </section>

      <section id="comparison">
        <Comparison />
      </section>

      <section id="pricing">
        <Pricing />
      </section>

      <section id="faq">
        <FAQ />
      </section>
      <Footer />
    </main>
  );
}
