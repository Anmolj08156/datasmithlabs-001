import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "../components/site/LegalPage";

export const Route = createFileRoute("/terms")({
  head: () => ({ meta: [{ title: "Terms — DataSmith Research Labs" }, { name: "description", content: "Terms of service for DataSmith Research Labs." }] }),
  component: () => (
    <LegalPage title="Terms of Service" updated="January 2026">
      <p>These terms govern access to and use of DataSmith Research Labs websites, products, and engagements. By using our services you agree to act in good faith and to respect intellectual property delivered under each engagement.</p>
      <p>Specific commercial terms are defined per engagement in a signed Statement of Work.</p>
    </LegalPage>
  ),
});