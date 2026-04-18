import { NextResponse } from "next/server";
import { services } from "@/lib/data";
import { createStripeClient } from "@/lib/stripe";

export async function POST(request: Request) {
  const body = (await request.json()) as { serviceId?: string; appointmentId?: string };
  const service = services.find((item) => item.id === body.serviceId);

  if (!service) {
    return NextResponse.json({ error: "Soin inconnu" }, { status: 400 });
  }

  const stripe = createStripeClient();
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  if (!stripe) {
    return NextResponse.json({
      mode: "demo",
      checkoutUrl: `/confirmation?appointment=${body.appointmentId ?? "demo"}`,
      message: "Ajoutez STRIPE_SECRET_KEY pour créer de vraies sessions Stripe Checkout."
    });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "usd",
          product_data: {
            name: service.name,
            description: service.description
          },
          unit_amount: service.priceCents
        }
      }
    ],
    metadata: {
      appointmentId: body.appointmentId ?? ""
    },
    success_url: `${appUrl}/confirmation?appointment=${body.appointmentId ?? ""}&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${appUrl}/booking?service=${service.id}&payment=cancelled`
  });

  return NextResponse.json({ checkoutUrl: session.url });
}
