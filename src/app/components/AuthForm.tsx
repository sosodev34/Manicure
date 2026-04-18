"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { writeAuth } from "@/lib/storage";

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "");

    if (!email.includes("@")) {
      setError("Entrez une adresse email valide.");
      setLoading(false);
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 600));
    writeAuth(email);
    router.push("/dashboard");
  }

  return (
    <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl items-center gap-12 px-5 py-14 sm:px-8 lg:grid-cols-2">
      <div className="studio-reveal">
        <p className="text-xs lowercase text-muted-foreground">
          {mode === "signup" ? "Créer un compte" : "Bon retour"}
        </p>
        <h1 className="mt-5 max-w-lg text-5xl font-light lowercase leading-tight">
          {mode === "signup" ? "Un espace plus calme pour suivre vos rendez-vous." : "Votre prochain rendez-vous est à portée de main."}
        </h1>
        <p className="mt-6 max-w-md text-sm leading-7 text-muted-foreground">
          Enregistrez vos informations, consultez le statut de paiement et gérez vos réservations à venir.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="studio-reveal-slow rounded-lg border border-border bg-card p-6 sm:p-8">
        <div className="space-y-5">
          {mode === "signup" && (
            <Field name="name" label="Nom complet" autoComplete="name" placeholder="Emma Laurent" />
          )}
          <Field name="email" label="Email" type="email" autoComplete="email" placeholder="emma@example.com" />
          <Field name="password" label="Mot de passe" type="password" autoComplete={mode === "signup" ? "new-password" : "current-password"} placeholder="8 caractères minimum" />
        </div>
        {error && <p className="mt-4 text-sm text-destructive">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="studio-cta mt-7 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm text-primary-foreground disabled:opacity-50"
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {mode === "signup" ? "Créer mon compte" : "Me connecter"}
        </button>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          {mode === "signup" ? "Vous avez déjà un compte ?" : "Nouvelle chez NŌMADE ?"}{" "}
          <Link href={mode === "signup" ? "/login" : "/signup"} className="text-foreground underline-offset-4 hover:underline">
            {mode === "signup" ? "Connexion" : "Créer un compte"}
          </Link>
        </p>
      </form>
    </div>
  );
}

function Field({
  name,
  label,
  type = "text",
  autoComplete,
  placeholder
}: {
  name: string;
  label: string;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
}) {
  return (
    <label className="block text-sm">
      <span>{label}</span>
      <input
        name={name}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        required
        className="mt-2 w-full rounded-lg border border-border bg-input-background px-4 py-3 outline-none transition duration-300 placeholder:text-muted-foreground/70 focus:border-primary/70 focus:shadow-[0_12px_40px_rgba(111,143,114,0.14)]"
      />
    </label>
  );
}
