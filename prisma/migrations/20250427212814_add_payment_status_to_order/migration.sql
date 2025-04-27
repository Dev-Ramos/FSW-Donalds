/*
  Warnings:

  - Added the required column `paymentStatus` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "OrderPaymentStatus" AS ENUM ('PAYMENT_CONFIRMED', 'PAYMENT_FAILED', 'NO_PAYMENT');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "paymentStatus" "OrderPaymentStatus" NOT NULL;
