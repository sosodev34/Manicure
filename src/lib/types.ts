export type ServiceCategory = "hands" | "gel" | "care" | "signature";

export type Service = {
  id: string;
  name: string;
  description: string;
  durationMinutes: number;
  priceCents: number;
  category: ServiceCategory;
  image: string;
};

export type SlotStatus = "available" | "reserved" | "unavailable";

export type AvailabilitySlot = {
  id: string;
  date: string;
  time: string;
  status: SlotStatus;
};

export type PaymentStatus = "unpaid" | "pending" | "paid" | "failed" | "refunded";

export type AppointmentStatus = "reserved" | "confirmed" | "completed" | "cancelled";

export type Appointment = {
  id: string;
  serviceId: string;
  serviceName: string;
  servicePriceCents: number;
  date: string;
  time: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  status: AppointmentStatus;
  paymentStatus: PaymentStatus;
  paymentIntentId?: string;
  createdAt: string;
};

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  favoriteServiceId?: string;
};

export type BookingDraft = {
  serviceId: string;
  date: string;
  time: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  promoCode?: string;
};
