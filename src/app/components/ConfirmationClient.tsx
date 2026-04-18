"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import { CheckCircle2 } from "lucide-react";
import { currency, seedAppointments } from "@/lib/data";
import { readAppointments } from "@/lib/storage";
import type { Appointment } from "@/lib/types";

export function ConfirmationClient() {
  const searchParams = useSearchParams();
  const appointmentId = searchParams.get("appointment");
  const [appointment, setAppointment] = useState<Appointment | null>(null);

  useEffect(() => {
    const appointments = readAppointments(seedAppointments);
    setAppointment(appointments.find((item) => item.id === appointmentId) ?? appointments.at(-1) ?? null);
  }, [appointmentId]);

  return (
    <section className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-4xl items-center px-5 py-16 sm:px-8">
      <div className="studio-reveal-slow w-full rounded-lg border border-border bg-card p-8 text-center sm:p-12">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-lg bg-accent text-accent-foreground">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <p className="mt-8 text-xs lowercase tracking-[0.24em] text-muted-foreground">réservation confirmée</p>
        <h1 className="mt-5 text-5xl font-light lowercase leading-tight">rendez-vous confirmé.</h1>
        <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-muted-foreground">
          Votre créneau est réservé et le paiement est validé.
        </p>

        {appointment && (
          <div className="mx-auto mt-10 max-w-md rounded-lg border border-border bg-secondary/50 p-5 text-left text-sm">
            <Row label="Soin" value={appointment.serviceName} />
            <Row label="Date" value={format(parseISO(appointment.date), "EEEE d MMMM", { locale: fr })} />
            <Row label="Horaire" value={appointment.time} />
            <Row label="Payé" value={currency(appointment.servicePriceCents)} />
          </div>
        )}

        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/dashboard" className="studio-cta rounded-lg bg-primary px-6 py-3 text-sm text-primary-foreground">
            Voir mon espace
          </Link>
          <Link href="/booking" className="studio-hover rounded-lg border border-border px-6 py-3 text-sm">
            Réserver un autre soin
          </Link>
        </div>
      </div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-5 border-b border-border py-3 first:pt-0 last:border-b-0 last:pb-0">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-right">{value}</span>
    </div>
  );
}
