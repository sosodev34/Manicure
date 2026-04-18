import { Suspense } from "react";
import { ConfirmationClient } from "../components/ConfirmationClient";
import { PageShell } from "../components/PageShell";

export default function ConfirmationPage() {
  return (
    <PageShell>
      <Suspense fallback={<div className="px-5 py-20 text-sm text-muted-foreground">Chargement de la confirmation...</div>}>
        <ConfirmationClient />
      </Suspense>
    </PageShell>
  );
}
