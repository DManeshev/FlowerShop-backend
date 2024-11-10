/*
  Warnings:

  - You are about to drop the column `delivery` on the `Order` table. All the data in the column will be lost.
  - Added the required column `apartment` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `house_number` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EnumDeliveryMethod" AS ENUM ('pickup', 'delivery');

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "delivery",
ADD COLUMN     "apartment" TEXT NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "deliveryMethod" "EnumDeliveryMethod" NOT NULL DEFAULT 'delivery',
ADD COLUMN     "house_number" TEXT NOT NULL,
ADD COLUMN     "street" TEXT NOT NULL;
