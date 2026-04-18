import Link from "next/link";
import { instagram, studio } from "@/lib/data";

export function SiteFooter() {
  return (
    <footer className="border-t border-border px-5 py-10 sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <p className="brand-wordmark text-lg lowercase">noo.ma.de</p>
          <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
            Spécialiste de l’ongle naturel. Manucures minimalistes, propres et élégantes.
          </p>
        </div>
        <div className="text-sm leading-7 text-muted-foreground">
          <p className="mb-2 text-foreground">Adresse</p>
          {studio.address.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
        <div className="text-sm leading-7 text-muted-foreground">
          <p className="mb-2 text-foreground">Espace client</p>
          <Link href="/booking" className="block transition-colors hover:text-foreground">
            Réserver en ligne
          </Link>
          <Link href="/dashboard" className="block transition-colors hover:text-foreground">
            Gérer mon rendez-vous
          </Link>
          <Link href="/admin" className="block transition-colors hover:text-foreground">
            Admin
          </Link>
          <a href={instagram.url} target="_blank" rel="noreferrer" className="block transition-colors hover:text-foreground">
            Instagram
          </a>
          <a href={`mailto:${studio.email}`} className="block transition-colors hover:text-foreground">
            {studio.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
