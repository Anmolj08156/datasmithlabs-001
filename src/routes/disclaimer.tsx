import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "../components/site/LegalPage";

export const Route = createFileRoute("/disclaimer")({
  head: () => ({
    meta: [
      { title: "Disclaimer — DataSmith Research Labs" },
      {
        name: "description",
        content: "Disclaimer for DataSmith Research Labs content and outputs.",
      },
    ],
  }),
  component: () => (
    <LegalPage title="Disclaimer" updated="January 2026">
      <p>
        Research outputs, training materials, and product features are provided for informational
        and educational purposes. While we apply rigorous scientific method, no model or analysis
        should be treated as definitive without independent validation in your own context.
      </p>
    </LegalPage>
  ),
});
