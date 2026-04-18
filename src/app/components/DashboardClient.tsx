"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { format, isBefore, parseISO, startOfToday } from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarDays, CheckCircle2, Clock, RotateCcw, XCircle } from "lucide-react";
import { appointmentStatusLabel, currency, paymentStatusLabel, seedAppointments } from "@/lib/data";
import { readAppointments, writeAppointments } from "@/lib/storage";
import type { Appointment } from "@/lib/types";

export function DashboardClient() {
  const [appointments, setAppointments] = useState<Appointment[]>(seedAppointments);

  useEffect(() => {
    setAppointments(readAppointments(seedAppointments));
  }, []);

  const upcoming = useMemo(
    () => appointments.filter((appointment) => !isBefore(parseISO(appointment.date), startOfToday()) && appointment.status !== "cancelled"),
    [appointments]
  );
  const history = useMemo(
    () => appointments.filter((appointment) => isBefore(parseISO(appointment.date), startOfToday()) || appointment.status === "cancelled"),
    [appointments]
  );

  function cancelAppointment(id: string) {
    const next = appointments.map((appointment) =>
      appointment.id === id ? { ...appointment, status: "cancelled" as const } : appointment
    );
    setAppointments(next);
    writeAppointments(next);
  }

  return (
    <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:py-20">
      <div className="studio-reveal flex flex-col justify-between gap-8 border-b border-border pb-10 md:flex-row md:items-end">
        <div>
          <p className="text-xs lowercase tracking-[0.24em] text-muted-foreground">espace client</p>
          <h1 className="mt-5 text-5xl font-light lowercase leading-tight">vos rendez-vous, sans bruit.</h1>
        </div>
        <Link href="/booking" className="studio-cta rounded-lg bg-primary px-6 py-3 text-center text-sm text-primary-foreground">
          Réserver un autre soin
        </Link>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <Metric icon={<CalendarDays className="h-5 w-5" />} label="À venir" value={String(upcoming.length)} />
        <Metric icon={<CheckCircle2 className="h-5 w-5" />} label="Payés" value={String(appointments.filter((item) => item.paymentStatus === "paid").length)} />
        <Metric icon={<Clock className="h-5 w-5" />} label="Favori" value="soft gel" />
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <AppointmentList title="rendez-vous à venir" appointments={upcoming} onCancel={cancelAppointment} />
        <AppointmentList title="historique" appointments={history} compact />
      </div>
    </section>
  );
}

function Metric({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="studio-hover rounded-lg border border-border bg-card p-5">
      <div className="flex items-center gap-3 text-muted-foreground">{icon}<span className="text-sm">{label}</span></div>
      <p className="mt-6 text-3xl font-light">{value}</p>
    </div>
  );
}

function AppointmentList({
  title,
  appointments,
  onCancel,
  compact = false
}: {
  title: string;
  appointments: Appointment[];
  onCancel?: (id: string) => void;
  compact?: boolean;
}) {
  return (
    <section>
      <h2 className="text-2xl font-light lowercase">{title}</h2>
      <div className="mt-5 space-y-4">
        {appointments.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border p-8 text-sm text-muted-foreground">
            Aucun rendez-vous pour le moment.
          </div>
        ) : (
          appointments.map((appointment) => (
            <article key={appointment.id} className="studio-hover rounded-lg border border-border bg-card p-5">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <h3 className="text-xl lowercase">{appointment.serviceName}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {format(parseISO(appointment.date), "EEEE d MMMM", { locale: fr })} à {appointment.time}
                  </p>
                </div>
                <span className="rounded-lg bg-accent px-3 py-1 text-xs capitalize text-accent-foreground">
                  {paymentStatusLabel(appointment.paymentStatus)}
                </span>
              </div>
              <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span>{currency(appointment.servicePriceCents)}</span>
                <span>Statut : {appointmentStatusLabel(appointment.status)}</span>
              </div>
              {!compact && appointment.status !== "cancelled" && (
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link href={`/booking?service=${appointment.serviceId}`} className="studio-hover inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm">
                    <RotateCcw className="h-4 w-4" />
                    Reprogrammer
                  </Link>
                  <button
                    type="button"
                    onClick={() => onCancel?.(appointment.id)}
                    className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm transition hover:border-destructive hover:text-destructive"
                  >
                    <XCircle className="h-4 w-4" />
                    Annuler
                  </button>
                </div>
              )}
            </article>
          ))
        )}
      </div>
    </section>
  );
}
