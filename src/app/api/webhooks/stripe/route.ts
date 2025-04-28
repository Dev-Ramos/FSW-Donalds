import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import Stripe from "stripe";

import { db } from "@/lib/prisma";
// stripe cli -> stripe listen --forward-to localhost:3000/api/webhooks/stripe

export async function POST(request: Request) {
  // Verify if the request is coming from Stripe
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("Missing Stripe secret key");
  }
  // Create a new instance of Stripe
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-02-24.acacia",
  });
  // Get the Stripe signature from the request headers
  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.error();
  }
  // VErify the Webhook key is available
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET_KEY;
  if (!webhookSecret) {
    throw new Error("Missing Stripe webhook secret key");
  }

  const text = await request.text();
  const event = stripe.webhooks.constructEvent(text, signature, webhookSecret);

  console.log("Received event:", event.type);
  // Handle the event when the payment is completed or failed
  if (event.type === 'checkout.session.completed') {
    const orderId = event.data.object.metadata?.orderId as string;
    if (!orderId) {
      NextResponse.json({
        received: true,
      });
    }
    
    const order = await db.order.update({
      where: {
        id: parseInt(orderId),
      },
      data: {
        paymentStatus: "PAYMENT_CONFIRMED",
      },
      include: {
        restaurant: {
          select: {
            slug: true,
          },
        },
      },
    });
    revalidatePath(
      `/${order.restaurant.slug}/menu?consumptionMethod=${order.consumptionMethod}`,
    );
  } else if (event.type === 'charge.failed') {
    const orderId = event.data.object.metadata.orderId;
    if (!orderId) {
      NextResponse.json({
        received: true,
      });
    }
    const order = await db.order.update({
      where: {
        id: parseInt(orderId),
      },
      data: {
        paymentStatus: "PAYMENT_FAILED",
      },
      include: {
        restaurant: {
          select: {
            slug: true,
          },
        },
      },
    });
    revalidatePath(
      `/${order.restaurant.slug}/menu?consumptionMethod=${order.consumptionMethod}`,
    );
  }
  
  return NextResponse.json({
    received: true,
  });
  }

