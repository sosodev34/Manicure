import Link from "next/link";
import { currency, services } from "@/lib/data";

export function ServiceGrid({ compact = false }: { compact?: boolean }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {services.map((service) => (
        <Link
          key={service.id}
          href={`/booking?service=${service.id}`}
          className="group studio-hover overflow-hidden rounded-lg border border-border bg-card"
        >
          {!compact && (
            <div className="aspect-[5/3] overflow-hidden bg-muted">
              <img
                src={service.image}
                alt={`Résultat du soin ${service.name}`}
                className="h-full w-full object-cover saturate-[0.82] transition duration-700 group-hover:saturate-100"
              />
            </div>
          )}
          <div className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-normal lowercase">{service.name}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{service.description}</p>
              </div>
              <p className="whitespace-nowrap rounded-lg bg-accent px-3 py-1 text-sm text-accent-foreground">{currency(service.priceCents)}</p>
            </div>
            <div className="mt-6 flex items-center justify-between border-t border-border pt-4 text-xs lowercase text-muted-foreground">
              <span>{service.durationMinutes} min</span>
              <span>choisir</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
