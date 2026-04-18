"use client";

import type { Appointment } from "./types";

const appointmentsKey = "nature-studio-appointments";
const authKey = "nature-studio-auth";

export function readAppointments(fallback: Appointment[]) {
  if (typeof window === "undefined") {
    return fallback;
  }

  const stored = window.localStorage.getItem(appointmentsKey);
  return stored ? (JSON.parse(stored) as Appointment[]) : fallback;
}

export function writeAppointments(appointments: Appointment[]) {
  window.localStorage.setItem(appointmentsKey, JSON.stringify(appointments));
}

export function readAuth() {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage.getItem(authKey);
}

export function writeAuth(email: string) {
  window.localStorage.setItem(authKey, email);
}

export function clearAuth() {
  window.localStorage.removeItem(authKey);
}
