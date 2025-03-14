/*
  Warnings:

  - You are about to drop the column `retaurantId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `avararImageUrl` on the `Restaurant` table. All the data in the column will be lost.
  - Added the required column `restaurantId` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `avatarImageUrl` to the `Restaurant` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_retaurantId_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "retaurantId",
ADD COLUMN     "restaurantId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Restaurant" DROP COLUMN "avararImageUrl",
ADD COLUMN     "avatarImageUrl" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
