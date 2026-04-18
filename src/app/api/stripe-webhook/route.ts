import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { createStripeClient } from "@/lib/stripe";

export async function POST(request: Request) {
  const stripe = createStripeClient();
  const signature = (await headers()).get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const payload = await request.text();

  if (!stripe || !signature || !webhookSecret) {
    return NextResponse.json({
      received: true,
      mode: "demo",
      message: "Ajoutez les variables Stripe du webhook pour vérifier et enregistrer les paiements."
    });
  }

  const event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const appointmentId = session.metadata?.appointmentId;

    // Persist payment status here with Supabase or Prisma:
    // update payments set status = 'paid' and appointments.status = 'confirmed'
    // where appointment_id = appointmentId.
    return NextResponse.json({ received: true, appointmentId });
  }

  return NextResponse.json({ received: true });
}
