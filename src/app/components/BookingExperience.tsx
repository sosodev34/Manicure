"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { addDays, format, parseISO, startOfToday } from "date-fns";
import { fr } from "date-fns/locale";
import { Check, CreditCard, Loader2, LockKeyhole, Sparkles } from "lucide-react";
import { currency, demoUser, generateAvailability, seedAppointments, services, slotStatusLabel } from "@/lib/data";
import { readAppointments, writeAppointments } from "@/lib/storage";
import type { Appointment, BookingDraft, Service } from "@/lib/types";

const steps = ["Soin", "Date", "Horaire", "Infos", "Paiement"];

export function BookingExperience() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialService = searchParams.get("service");
  const [appointments, setAppointments] = useState<Appointment[]>(() => readAppointments(seedAppointments));
  const [serviceId, setServiceId] = useState(initialService ?? services[0].id);
  const [date, setDate] = useState(format(startOfToday(), "yyyy-MM-dd"));
  const [time, setTime] = useState("");
  const [name, setName] = useState(demoUser.name);
  const [email, setEmail] = useState(demoUser.email);
  const [phone, setPhone] = useState(demoUser.phone ?? "");
  const [promoCode, setPromoCode] = useState("");
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  const availability = useMemo(() => generateAvailability(appointments), [appointments]);
  const dates = Array.from({ length: 14 }, (_, index) => format(addDays(startOfToday(), index), "yyyy-MM-dd"));
  const selectedService = services.find((service) => service.id === serviceId) ?? services[0];
  const visibleSlots = availability.filter((slot) => slot.date === date);
  const selectedSlot = visibleSlots.find((slot) => slot.time === time);
  const canContinue = [
    Boolean(serviceId),
    Boolean(date),
    Boolean(time && selectedSlot?.status === "available"),
    Boolean(name && email && phone),
    true
  ][step];

  function reserveAppointment(draft: BookingDraft) {
    const service = services.find((item) => item.id === draft.serviceId) as Service;
    const newAppointment: Appointment = {
      id: `apt_${Date.now()}`,
      serviceId: service.id,
      serviceName: service.name,
      servicePriceCents: service.priceCents,
      date: draft.date,
      time: draft.time,
      clientName: draft.clientName,
      clientEmail: draft.clientEmail,
      clientPhone: draft.clientPhone,
      status: "confirmed",
      paymentStatus: "paid",
      paymentIntentId: `pi_local_${Date.now()}`,
      createdAt: new Date().toISOString()
    };

    const nextAppointments = [...appointments, newAppointment];
    setAppointments(nextAppointments);
    writeAppointments(nextAppointments);
    return newAppointment;
  }

  async function handlePayment() {
    setStatus("loading");

    try {
      await new Promise((resolve) => setTimeout(resolve, 850));
      const appointment = reserveAppointment({
        serviceId,
        date,
        time,
        clientName: name,
        clientEmail: email,
        clientPhone: phone,
        promoCode
      });
      router.push(`/confirmation?appointment=${appointment.id}`);
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:py-20">
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <p className="text-xs lowercase text-muted-foreground">réservation / nōmade manucure</p>
          <h1 className="mt-5 max-w-lg text-5xl font-light lowercase leading-tight sm:text-6xl">
            réservez votre manucure naturelle.
          </h1>
          <p className="mt-6 max-w-md text-sm leading-7 text-muted-foreground">
            Choisissez votre soin, la date, l’horaire, puis confirmez votre rendez-vous en ligne.
          </p>
          <div className="studio-reveal studio-delay-1 mt-8 rounded-lg border border-border bg-secondary/50 p-5">
            <div className="flex items-center gap-3 text-sm">
              <LockKeyhole className="h-4 w-4" />
              Votre créneau est bloqué après paiement.
            </div>
            <div className="mt-4 text-sm leading-6 text-muted-foreground">
              Les créneaux déjà réservés ne peuvent plus être sélectionnés.
            </div>
          </div>
          <div className="studio-reveal studio-delay-2 mt-5 rounded-lg border border-border p-5 text-sm leading-6 text-muted-foreground">
            Annulation possible jusqu’à 24h avant le rendez-vous.
          </div>
        </aside>

        <div className="studio-reveal-slow rounded-lg border border-border bg-card">
          <div className="border-b border-border p-5 sm:p-7">
            <div className="flex flex-wrap gap-2">
              {steps.map((label, index) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => setStep(index)}
                  className={`rounded-lg px-3 py-2 text-xs transition-colors duration-200 ${
                    index === step ? "bg-foreground text-background" : "bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {index + 1}. {label}
                </button>
              ))}
            </div>
          </div>

          <div className="min-h-[500px] p-5 sm:p-7">
            {step === 0 && (
              <Panel title="choisir un soin" subtitle="Sélectionnez la prestation souhaitée.">
                <div className="grid gap-3">
                  {services.map((service) => (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => setServiceId(service.id)}
                      className={`studio-hover rounded-lg border p-5 text-left ${
                        serviceId === service.id ? "border-primary bg-secondary" : "border-border"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h2 className="text-xl lowercase">{service.name}</h2>
                          <p className="mt-2 text-sm leading-6 text-muted-foreground">{service.description}</p>
                        </div>
                        <span className="text-sm">{currency(service.priceCents)}</span>
                      </div>
                      <p className="mt-4 text-xs uppercase text-muted-foreground">
                        {service.durationMinutes} minutes
                      </p>
                    </button>
                  ))}
                </div>
              </Panel>
            )}

            {step === 1 && (
              <Panel title="choisir une date" subtitle="Choisissez le jour qui vous convient.">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {dates.map((day) => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => {
                        setDate(day);
                        setTime("");
                      }}
                      className={`studio-hover rounded-lg border p-4 text-left ${
                        date === day ? "border-primary bg-primary text-primary-foreground" : "border-border"
                      }`}
                    >
                      <span className="block text-xs opacity-70">{format(parseISO(day), "EEE", { locale: fr })}</span>
                      <span className="mt-2 block text-3xl font-light">{format(parseISO(day), "d")}</span>
                      <span className="mt-1 block text-xs opacity-70">{format(parseISO(day), "MMM", { locale: fr })}</span>
                    </button>
                  ))}
                </div>
              </Panel>
            )}

            {step === 2 && (
              <Panel title="choisir un horaire" subtitle="Les créneaux indisponibles sont désactivés.">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {visibleSlots.map((slot) => (
                    <button
                      key={slot.id}
                      type="button"
                      disabled={slot.status !== "available"}
                      onClick={() => setTime(slot.time)}
                      className={`studio-hover rounded-lg border p-4 ${
                        time === slot.time
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border"
                      } disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground disabled:opacity-55`}
                    >
                      <span className="block text-lg">{slot.time}</span>
                      <span className="mt-2 block text-xs opacity-70">{slotStatusLabel(slot.status)}</span>
                    </button>
                  ))}
                </div>
              </Panel>
            )}

            {step === 3 && (
              <Panel title="vos informations" subtitle="Ajoutez vos coordonnées pour recevoir la confirmation.">
                <div className="grid gap-5">
                  <Field label="Nom complet" value={name} onChange={setName} autoComplete="name" />
                  <Field label="Email" value={email} onChange={setEmail} type="email" autoComplete="email" />
                  <Field label="Téléphone" value={phone} onChange={setPhone} type="tel" autoComplete="tel" />
                  <Field label="Code promo" value={promoCode} onChange={setPromoCode} required={false} />
                </div>
              </Panel>
            )}

            {step === 4 && (
              <Panel title="confirmer et payer" subtitle="Le paiement valide définitivement votre réservation.">
                <div className="rounded-lg border border-border bg-secondary/50 p-5">
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-5 w-5" />
                    <p className="text-sm">Paiement sécurisé</p>
                  </div>
                  <div className="mt-5 space-y-3 text-sm">
                    <SummaryRow label="Soin" value={selectedService.name} />
                    <SummaryRow label="Date" value={format(parseISO(date), "EEEE d MMMM", { locale: fr })} />
                    <SummaryRow label="Horaire" value={time || "Sélectionnez un créneau"} />
                    <SummaryRow label="Total" value={currency(selectedService.priceCents)} />
                  </div>
                </div>
                <p className="mt-5 text-sm leading-6 text-muted-foreground">
                  Vous serez redirigée vers la confirmation une fois le paiement validé.
                </p>
              </Panel>
            )}
          </div>

          {status === "error" && (
            <p className="px-8 pb-3 text-sm text-destructive">Le paiement n’a pas pu démarrer. Réessayez dans un instant.</p>
          )}
          <div className="flex items-center justify-between gap-4 border-t border-border p-5 sm:p-7">
            <button
              type="button"
              onClick={() => setStep(Math.max(step - 1, 0))}
              disabled={step === 0}
              className="studio-hover rounded-lg border border-border px-5 py-3 text-sm disabled:cursor-not-allowed disabled:opacity-40"
            >
              Retour
            </button>
            {step < 4 ? (
              <button
                type="button"
                onClick={() => setStep(Math.min(step + 1, 4))}
                disabled={!canContinue}
                className="studio-cta rounded-lg bg-primary px-6 py-3 text-sm text-primary-foreground disabled:cursor-not-allowed disabled:opacity-40"
              >
                Continuer
              </button>
            ) : (
              <button
                type="button"
                onClick={handlePayment}
                disabled={status === "loading" || !time}
                className="studio-cta inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm text-primary-foreground disabled:cursor-not-allowed disabled:opacity-40"
              >
                {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                Confirmer et payer {currency(selectedService.priceCents)}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Panel({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="studio-reveal">
      <div className="mb-8">
        <div className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground">
          <Check className="h-4 w-4" />
        </div>
        <h2 className="text-3xl font-light lowercase">{title}</h2>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">{subtitle}</p>
      </div>
      {children}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  autoComplete,
  required = true
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <label className="block text-sm">
      <span>{label}</span>
      <input
        className="mt-2 w-full rounded-lg border border-border bg-input-background px-4 py-3 outline-none transition duration-300 focus:border-primary/70 focus:shadow-[0_12px_40px_rgba(111,143,114,0.14)]"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        type={type}
        autoComplete={autoComplete}
        required={required}
      />
    </label>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-6 border-b border-border pb-3 last:border-b-0 last:pb-0">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-right">{value}</span>
    </div>
  );
}
