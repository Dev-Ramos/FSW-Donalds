"use server";

import { ConsumptionMethod } from "@prisma/client";
import { headers } from "next/headers";
import Stripe from "stripe";

import { removeCpfPunctuation } from "@/helpers/cpf";
import { db } from "@/lib/prisma";

import { CartProduct } from "../context/cart";

interface CreateStripeCheckoutInput {
  products: CartProduct[];
  orderId: number;
  slug: string;
  consumptionMethod: ConsumptionMethod;
  cpf: string;
}

export const createStripeCheckout = async ({
  products,
  orderId,
  slug,
  consumptionMethod,
  cpf,
}: CreateStripeCheckoutInput) => {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("Missing Stripe secret key");
    }
    const origin = (await headers()).get("origin") as string;
    const productsWithPrices = await db.product.findMany({
      where: {
        id: {
          in: products.map((product) => product.id),
        },
      },
    });
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2025-02-24.acacia",
    });

    const searchParams = new URLSearchParams(); 
    searchParams.set("consumptionMethod", consumptionMethod);
    searchParams.set("cpf", removeCpfPunctuation(cpf));
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "boleto"],
      mode: "payment",
      success_url: `${origin}/${slug}/orders?${searchParams.toString()}`,
      cancel_url: `${origin}/${slug}/menu?${consumptionMethod}`,
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
          unit_amount: parseInt(
            String(
              productsWithPrices.find((p) => p.id === product.id)!.price * 100,
            ),
          ),
        },
        quantity: product.quantity,
      })),
    });
    return { sessionId: session.id };
  } catch (error) {
    console.error(error);
  }
};
