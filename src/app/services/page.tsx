import { PageShell } from "../components/PageShell";
import { ServiceGrid } from "../components/ServiceGrid";

export default function ServicesPage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
        <div className="max-w-3xl">
          <p className="text-xs lowercase text-muted-foreground">tarifs / ongle naturel</p>
          <h1 className="mt-5 text-6xl font-light lowercase leading-tight">choisissez votre manucure.</h1>
          <p className="mt-6 text-sm leading-7 text-muted-foreground">
            Des soins minimalistes pour des ongles naturels, propres et élégants. Prix lisibles, réservation en ligne.
          </p>
        </div>
        <div className="mt-10">
          <ServiceGrid compact />
        </div>
      </section>
    </PageShell>
  );
}
