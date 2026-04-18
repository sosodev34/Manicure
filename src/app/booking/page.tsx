import { Suspense } from "react";
import { PageShell } from "../components/PageShell";
import { BookingExperience } from "../components/BookingExperience";

export default function BookingPage() {
  return (
    <PageShell>
      <Suspense fallback={<div className="px-5 py-20 text-sm text-muted-foreground">Préparation de la réservation...</div>}>
        <BookingExperience />
      </Suspense>
    </PageShell>
  );
}
