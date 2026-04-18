import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageShell } from "./components/PageShell";
import { ServiceGrid } from "./components/ServiceGrid";
import { instagram, studio } from "@/lib/data";

const proofPoints = [
  { value: "naturel", label: "ongle respecté" },
  { value: "paiement", label: "en ligne" },
  { value: "sobre", label: "manucure minimaliste" }
];

export default function HomePage() {
  return (
    <PageShell>
      <section className="border-b border-border">
        <div className="mx-auto grid min-h-[calc(100vh-3.5rem)] max-w-7xl items-center gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[1fr_0.78fr] lg:py-20">
          <div className="max-w-3xl">
            <p className="studio-reveal text-xs lowercase text-muted-foreground">nōmade manucure / ongle naturel</p>
            <h1 className="studio-reveal studio-delay-1 studio-rule mt-7 text-6xl font-light lowercase leading-[1.06] sm:text-7xl lg:text-8xl">
              l’élégance de l’ongle naturel.
            </h1>
            <p className="studio-reveal studio-delay-2 mt-10 max-w-lg text-base leading-8 text-muted-foreground">
              Spécialiste de l’ongle naturel. Découvrez des manucures minimalistes, propres et élégantes, à réserver en ligne.
            </p>
            <div className="studio-reveal studio-delay-3 mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/booking" className="studio-cta inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm text-primary-foreground">
                <span>réserver une manucure</span>
                <ArrowRight className="relative z-10 h-4 w-4" />
              </Link>
              <Link href="/services" className="studio-hover inline-flex items-center justify-center rounded-lg border border-border bg-background px-6 py-3 text-sm">
                voir les tarifs
              </Link>
            </div>
          </div>

          <div className="studio-reveal-slow hidden lg:block">
            <div className="overflow-hidden rounded-lg border border-border bg-muted">
              <img
                src="https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1000&q=82"
                alt="Manucure fine et naturelle"
                className="h-[560px] w-full object-cover saturate-[0.82] transition duration-500 hover:saturate-100"
              />
            </div>
            <div className="mt-3 flex justify-between text-xs lowercase text-muted-foreground">
              <a
                href={instagram.url}
                target="_blank"
                rel="noreferrer"
                className="transition-colors duration-200 hover:text-primary"
              >
                {instagram.handle}
              </a>
              <span>manucures minimalistes</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid gap-3 sm:grid-cols-3">
          {proofPoints.map((point) => (
            <div key={point.label} className="rounded-lg border border-border bg-card p-5">
              <p className="text-2xl font-light lowercase text-primary">{point.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{point.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8">
        <div className="mb-8 max-w-2xl">
          <p className="text-xs lowercase text-muted-foreground">soins</p>
          <h2 className="mt-4 text-4xl font-light lowercase leading-tight sm:text-5xl">choisissez votre soin.</h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">
            Des prestations pensées pour l’ongle naturel, avec des prix lisibles et une réservation rapide.
          </p>
        </div>
        <ServiceGrid compact />
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8">
        <div className="rounded-lg border border-border bg-card p-6 sm:flex sm:items-center sm:justify-between sm:gap-8">
          <div>
            <p className="text-xs lowercase text-muted-foreground">instagram</p>
            <h2 className="mt-3 text-3xl font-light lowercase">suivez les créations du studio.</h2>
            <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground">
              Ongles naturels, inspirations minimalistes et petites nouvelles de NŌMADE à retrouver sur Instagram.
            </p>
          </div>
          <a
            href={instagram.url}
            target="_blank"
            rel="noreferrer"
            className="studio-hover mt-6 inline-flex rounded-lg border border-border px-5 py-3 text-sm lowercase sm:mt-0"
          >
            {instagram.handle}
          </a>
        </div>
      </section>

      <section className="border-y border-border bg-secondary/45 px-5 py-12 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="text-xs lowercase text-muted-foreground">studio</p>
            <h2 className="mt-4 text-4xl font-light lowercase">des ongles naturels, tout en délicatesse.</h2>
          </div>
          <div className="grid gap-6 text-sm leading-7 text-muted-foreground sm:grid-cols-2">
            <div>
              <p className="mb-2 text-foreground">Adresse</p>
              {studio.address.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
            <div>
              <p className="mb-2 text-foreground">Horaires</p>
              {studio.hours.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
