"use server";

import { ConsumptionMethod } from "@prisma/client";

// import { redirect } from "next/navigation";
import { removeCpfPunctuation } from "@/helpers/cpf";
import { db } from "@/lib/prisma";

interface CreateOrderInput {
  costumerName: string;
  costumerCpf: string;
  products: Array<{
    id: string;
    quantity: number;
  }>;
  consumptionMethod: ConsumptionMethod;
  slug: string;
}

export const createOrder = async (input: CreateOrderInput) => {
  const productsWithPrices = await db.product.findMany({
    where: {
      id: {
        in: input.products.map((product) => product.id),
      },
    },
  });
  const restaurant = await db.restaurant.findUnique({
    where: {
      slug: input.slug,
    },
  });
  if (!restaurant) {
    throw new Error("Restaurant is not found!");
  }
  const productsWithPricesAndQuantity = input.products.map((product) => ({
    productId: product.id,
    quantity: product.quantity,
    price: productsWithPrices.find((p) => p.id === product.id)!.price,
  }));

  const order = await db.order.create({
    data: {
      status: "PENDING",
      costumerName: input.costumerName,
      costumerCpf: removeCpfPunctuation(input.costumerCpf),
      orderProducts: {
        createMany: {
          data: productsWithPricesAndQuantity,
        },
      },
      total: productsWithPricesAndQuantity.reduce(
        (acc, product) => acc + product.price * product.quantity,
        0,
      ),
      consumptionMethod: input.consumptionMethod,
      restaurantId: restaurant.id,
    },
  });
  // redirect(`/${input.slug}/orders?cpf=${removeCpfPunctuation(input.costumerCpf)}`)
  return order
};
