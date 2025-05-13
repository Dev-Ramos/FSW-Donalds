"use client";
import { OrderPaymentStatus, OrderStatus, Prisma } from "@prisma/client";
import {
  BadgeDollarSignIcon,
  ChevronLeftIcon,
  ScrollTextIcon,
} from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { priceFormatter } from "@/helpers/currency";

interface OrderListProps {
  orders: Prisma.OrderGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
          avatarImageUrl: true;
        };
      };
      orderProducts: {
        include: {
          product: true;
        };
      };
    };
  }>[];
}

const getOrderStatusLabel = (status: OrderStatus) => {
  if (status === "FINISHED") return "Finalizado";
  if (status === "IN_PREPARATION") return "Em Preparo";
  if (status === "PENDING") return "Pendente";
  return "";
};

const getOrderPaymentStatusLabel = (paymentStatus: OrderPaymentStatus) => {
  if (paymentStatus === "NO_PAYMENT") return "Sem Pagamento";
  if (paymentStatus === "PAYMENT_CONFIRMED") return "Pagamento Confirmado";
  if (paymentStatus === "PAYMENT_FAILED") return "Pagamento Falhou";
};

const OrderList = ({ orders }: OrderListProps) => {
  return (
    <div className="space-y-6 p-6">
      <Button
        variant="secondary"
        size="icon"
        className="rounded-full"
        onClick={() =>
          redirect(
            `/fsw-donalds/menu?consumptionMethod=${orders[0].consumptionMethod}`,
          )
        }
      >
        <ChevronLeftIcon />
      </Button>
      <div className="flex items-center gap-3">
        <ScrollTextIcon />
        <h2 className="text-lg font-semibold">Meus Pedidos</h2>
      </div>
      <div>
        {orders.map((order) => (
          <Card key={order.id}>
            <CardContent className="flex flex-col space-y-4 p-5">
              <div
                className={`w-fit self-end rounded-full px-2 py-1 text-xs font-semibold text-white ${
                  ([OrderStatus.FINISHED] as OrderStatus[]).includes(
                    order.status,
                  )
                    ? "bg-green-500"
                    : "bg-gray-400"
                }`}
              >
                {getOrderStatusLabel(order.status)}
              </div>

              <div className="flex items-center gap-2">
                <div className="relative h-5 w-5">
                  <Image
                    src={order.restaurant.avatarImageUrl}
                    alt={order.restaurant.name}
                    fill
                    className="rounded-sm object-contain"
                  />
                </div>
                <p className="text-sm font-semibold">{order.restaurant.name}</p>
              </div>

              <Separator />
              {order.orderProducts.map((orderProduct) => (
                <div className="flex items-center gap-2" key={orderProduct.id}>
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white">
                    {orderProduct.quantity}
                  </div>
                  <p className="text-sm">{orderProduct.product.name}</p>
                </div>
              ))}

              <Separator />
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">
                  {priceFormatter(order.total)}
                </p>
                <p
                  className={`flex w-fit items-center gap-x-2 rounded-full px-2 py-1 text-xs font-semibold text-white ${
                    (order.paymentStatus === 'PAYMENT_FAILED' || order.paymentStatus === 'NO_PAYMENT')
                      ? "bg-red-600"
                      : "bg-green-400 text-green-600"
                  } ${order.paymentStatus === "PAYMENT_CONFIRMED" ? "bg-green-200 text-green-600" : "bg-gray-200 text-gray-500"}`}
                >
                  <BadgeDollarSignIcon size={22} className={`${order.paymentStatus === 'PAYMENT_CONFIRMED' ? 'text-green-600' : 'text-white'}`} />
                  {getOrderPaymentStatusLabel(order.paymentStatus)}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default OrderList;
