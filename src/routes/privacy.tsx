import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "../components/site/LegalPage";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy — DataSmith Research Labs" },
      { name: "description", content: "How DataSmith Research Labs handles your data." },
    ],
  }),
  component: () => (
    <LegalPage title="Privacy Policy" updated="January 2026">
      <p>
        We collect only what we need to deliver our services and never sell client data.
        Consultation conversations, project artifacts, and dataset access are treated as
        confidential by default.
      </p>
      <p>
        For full details on processing, retention, and your rights, write to{" "}
        <a className="link-cyan underline" href="mailto:datasmithlabs@gmail.com">
          datasmithlabs@gmail.com
        </a>
        .
      </p>
    </LegalPage>
  ),
});
