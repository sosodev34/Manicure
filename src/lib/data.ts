import { addDays, format, isSunday, startOfToday } from "date-fns";
import type { Appointment, AvailabilitySlot, Service, UserProfile } from "./types";

export const studio = {
  name: "NŌMADE Manucure",
  email: "studio@noomade.fr",
  phone: "06 12 34 56 78",
  address: ["NŌMADE Manucure", "Puilboreau", "Charente-Maritime (17)"],
  hours: ["Lundi au vendredi, 9h à 19h", "Samedi, 10h à 18h", "Dimanche, fermé"]
};

export const instagram = {
  handle: "@noo.ma.de",
  url: "https://www.instagram.com/noo.ma.de/?hl=fr"
};

export const services: Service[] = [
  {
    id: "clean-manicure",
    name: "clean mani",
    description: "Mise en forme, cuticules nettes, soin des mains et fini naturel très propre.",
    durationMinutes: 45,
    priceCents: 5800,
    category: "hands",
    image: "https://images.unsplash.com/photo-1610992015762-45dca7fa3a85?auto=format&fit=crop&w=1200&q=85"
  },
  {
    id: "soft-gel",
    name: "soft gel",
    description: "Préparation minutieuse, couleur longue tenue et fini glossy, fin, sans épaisseur.",
    durationMinutes: 60,
    priceCents: 7600,
    category: "gel",
    image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1200&q=85"
  },
  {
    id: "repair-ritual",
    name: "care ritual",
    description: "Soin réparateur pour ongles fragilisés, mains sèches et besoin de pause.",
    durationMinutes: 75,
    priceCents: 9200,
    category: "care",
    image: "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?auto=format&fit=crop&w=1200&q=85"
  },
  {
    id: "signature-set",
    name: "nomade set",
    description: "Le rendez-vous complet: préparation naturelle, couleur gel et massage prolongé.",
    durationMinutes: 90,
    priceCents: 12800,
    category: "signature",
    image: "https://images.unsplash.com/photo-1599948128020-9a44c3c187d3?auto=format&fit=crop&w=1200&q=85"
  }
];

export const testimonials = [
  {
    quote: "Très clean, très précis. Ça garde un côté cool sans devenir froid.",
    name: "Amara L."
  },
  {
    quote: "Le rendu est fin, brillant, naturel. Exactement ce que je voulais.",
    name: "Juliette M."
  },
  {
    quote: "On sent le geste d’atelier. Rien de trop, tout est juste.",
    name: "Naomi R."
  }
];

const workingTimes = ["09:00", "10:00", "11:30", "13:00", "14:30", "16:00", "17:30"];

export function generateAvailability(booked: Appointment[] = []): AvailabilitySlot[] {
  const today = startOfToday();
  const slots: AvailabilitySlot[] = [];

  for (let day = 0; day < 18; day += 1) {
    const date = addDays(today, day);
    const dateKey = format(date, "yyyy-MM-dd");

    for (const time of workingTimes) {
      const bookedSlot = booked.some(
        (appointment) =>
          appointment.date === dateKey &&
          appointment.time === time &&
          appointment.status !== "cancelled"
      );

      slots.push({
        id: `${dateKey}-${time}`,
        date: dateKey,
        time,
        status: isSunday(date) ? "unavailable" : bookedSlot ? "reserved" : "available"
      });
    }
  }

  return slots;
}

export const demoUser: UserProfile = {
  id: "usr_demo",
  name: "Emma Laurent",
  email: "emma@example.com",
  phone: "06 12 34 56 78",
  favoriteServiceId: "soft-gel"
};

export const seedAppointments: Appointment[] = [
  {
    id: "apt_seed_1",
    serviceId: "soft-gel",
    serviceName: "soft gel",
    servicePriceCents: 7600,
    date: format(addDays(startOfToday(), 3), "yyyy-MM-dd"),
    time: "14:30",
    clientName: demoUser.name,
    clientEmail: demoUser.email,
    clientPhone: demoUser.phone ?? "",
    status: "confirmed",
    paymentStatus: "paid",
    paymentIntentId: "pi_demo_paid",
    createdAt: new Date().toISOString()
  }
];

export function currency(cents: number) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0
  }).format(cents / 100);
}

export function slotStatusLabel(status: AvailabilitySlot["status"]) {
  return {
    available: "Disponible",
    reserved: "Réservé",
    unavailable: "Indisponible"
  }[status];
}

export function appointmentStatusLabel(status: Appointment["status"]) {
  return {
    reserved: "Réservé",
    confirmed: "Confirmé",
    completed: "Terminé",
    cancelled: "Annulé"
  }[status];
}

export function paymentStatusLabel(status: Appointment["paymentStatus"]) {
  return {
    unpaid: "Non payé",
    pending: "En attente",
    paid: "Payé",
    failed: "Échoué",
    refunded: "Remboursé"
  }[status];
}
