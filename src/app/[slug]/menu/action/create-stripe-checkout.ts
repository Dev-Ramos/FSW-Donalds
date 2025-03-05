"use server";

import { headers } from "next/headers";
import Stripe from "stripe";

import { CartProduct } from "../context/cart";

interface CreateStripeCheckoutInput {
  products: CartProduct[];
  orderId: number
}

export const createStripeCheckout = async ({
  products,
  orderId,
}: CreateStripeCheckoutInput) => {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("Missing Stripe secret key");
    }
    const reqHeaders = await headers();
    const origin = reqHeaders.get("origin") ?? " ";
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2025-02-24.acacia",
    });
  
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "boleto"],
      mode: "payment",
      success_url: origin,
      cancel_url: origin,
      metadata: {
        orderId,
      },
      line_items: products.map((product) => ({
        price_data: {
          currency: "brl",
          product_data: {
            name: product.name,
            images: [product.imageUrl],
          },
          unit_amount: parseInt(String(product.price * 100)),
        },
        quantity: product.quantity,
      })),
    });
    return { sessionId: session.id };
  } catch (error) {
    console.error(error);
  }
};
