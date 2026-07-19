import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy | DevLaunch AI",
  description: "Our policy on refunds and subscription cancellations.",
};

export default function RefundPolicy() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-[#0A0A0A] pt-32 pb-24">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-medium tracking-tighter text-zinc-900 dark:text-white mb-4">
            Refund Policy
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400">
            Fair and transparent billing.
          </p>
        </div>

        <div className="prose prose-zinc dark:prose-invert max-w-none text-zinc-600 dark:text-zinc-400 space-y-8">
          <section>
            <h2 className="text-2xl font-medium tracking-tight text-zinc-900 dark:text-white mb-4">
              7-Day Money-Back Guarantee
            </h2>
            <p>
              We want you to be completely satisfied with DevLaunch AI. If you
              are not happy with your subscription within the first 7 days of
              your initial purchase, please contact us for a full refund.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium tracking-tight text-zinc-900 dark:text-white mb-4">
              Exceptions
            </h2>
            <p>
              Refunds are not granted if you have generated more than 5 complete
              validation reports using our AI engine, as this incurs significant
              server and API costs on our end.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium tracking-tight text-zinc-900 dark:text-white mb-4">
              Cancellations
            </h2>
            <p>
              You can cancel your subscription at any time from your dashboard.
              Once cancelled, you will retain access to your account until the
              end of your current billing cycle. We do not offer prorated
              refunds for mid-cycle cancellations.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
