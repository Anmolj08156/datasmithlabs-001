import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "../components/site/LegalPage";

export const Route = createFileRoute("/refund")({
  head: () => ({
    meta: [
      { title: "Refund Policy — DataSmith Research Labs" },
      {
        name: "description",
        content: "Refund policy for DataSmith Research Labs programs and services.",
      },
    ],
  }),
  component: () => (
    <LegalPage title="Refund Policy" updated="January 2026">
      <p>
        Training program fees are refundable in full up to 7 days before the program start date, and
        on a pro-rated basis thereafter where contractually permitted. Custom engagement fees follow
        the schedule defined in each Statement of Work.
      </p>
    </LegalPage>
  ),
});
