"use client";

import { useEffect, useMemo, useState } from "react";
import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import {
  appointmentStatusLabel,
  currency,
  generateAvailability,
  paymentStatusLabel,
  seedAppointments,
  services,
  slotStatusLabel
} from "@/lib/data";
import { databaseSchema } from "@/lib/database-schema";
import { readAppointments, writeAppointments } from "@/lib/storage";
import type { Appointment, AppointmentStatus } from "@/lib/types";

export function AdminClient() {
  const [appointments, setAppointments] = useState<Appointment[]>(seedAppointments);
  const slots = useMemo(() => generateAvailability(appointments).slice(0, 28), [appointments]);

  useEffect(() => {
    setAppointments(readAppointments(seedAppointments));
  }, []);

  function updateStatus(id: string, status: AppointmentStatus) {
    const next = appointments.map((appointment) => (appointment.id === id ? { ...appointment, status } : appointment));
    setAppointments(next);
    writeAppointments(next);
  }

  return (
    <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:py-20">
      <div className="studio-reveal max-w-3xl">
        <p className="text-xs lowercase tracking-[0.24em] text-muted-foreground">administration</p>
        <h1 className="mt-5 text-5xl font-light lowercase leading-tight">un planning net, calme et maîtrisé.</h1>
        <p className="mt-5 text-sm leading-7 text-muted-foreground">
          Gérez les soins, les prix, les créneaux, les réservations et les statuts depuis une vue simple.
        </p>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="studio-reveal studio-delay-1 rounded-lg border border-border bg-card p-6">
          <h2 className="text-2xl font-light lowercase">soins</h2>
          <div className="mt-5 space-y-4">
            {services.map((service) => (
              <div key={service.id} className="rounded-lg border border-border p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="lowercase">{service.name}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{service.durationMinutes} minutes</p>
                  </div>
                  <span className="text-sm">{currency(service.priceCents)}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="studio-reveal studio-delay-2 rounded-lg border border-border bg-card p-6">
          <h2 className="text-2xl font-light lowercase">réservations</h2>
          <div className="mt-5 space-y-4">
            {appointments.map((appointment) => (
              <article key={appointment.id} className="rounded-lg border border-border p-4">
                <div className="flex flex-col justify-between gap-4 sm:flex-row">
                  <div>
                    <h3>{appointment.clientName}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {appointment.serviceName}, {format(parseISO(appointment.date), "d MMM", { locale: fr })} à {appointment.time}
                    </p>
                    <p className="mt-2 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                      Paiement {paymentStatusLabel(appointment.paymentStatus)}
                    </p>
                  </div>
                  <select
                    value={appointment.status}
                    onChange={(event) => updateStatus(appointment.id, event.target.value as AppointmentStatus)}
                    className="h-11 rounded-lg border border-border bg-background px-3 text-sm outline-none"
                    aria-label={`Statut pour ${appointment.clientName}`}
                  >
                    <option value="reserved">{appointmentStatusLabel("reserved")}</option>
                    <option value="confirmed">{appointmentStatusLabel("confirmed")}</option>
                    <option value="completed">{appointmentStatusLabel("completed")}</option>
                    <option value="cancelled">{appointmentStatusLabel("cancelled")}</option>
                  </select>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <section className="studio-reveal studio-delay-1 rounded-lg border border-border bg-card p-6">
          <h2 className="text-2xl font-light lowercase">créneaux disponibles</h2>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {slots.map((slot) => (
              <div key={slot.id} className="rounded-lg border border-border p-3 text-sm">
                <p>{format(parseISO(slot.date), "d MMM", { locale: fr })}</p>
                <p className="mt-1 text-muted-foreground">{slot.time}</p>
                <p className="mt-2 text-xs">{slotStatusLabel(slot.status)}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="studio-reveal studio-delay-2 rounded-lg border border-border bg-card p-6">
          <h2 className="text-2xl font-light lowercase">schéma de base de données</h2>
          <pre className="mt-5 max-h-96 overflow-auto rounded-lg bg-foreground p-4 text-xs leading-5 text-background">
            <code>{databaseSchema.trim()}</code>
          </pre>
        </section>
      </div>
    </section>
  );
}
