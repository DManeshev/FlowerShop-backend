/*
  Warnings:

  - You are about to drop the column `deliveryMethod` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `houseNumber` on the `Order` table. All the data in the column will be lost.
  - Added the required column `house_number` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "deliveryMethod",
DROP COLUMN "houseNumber",
ADD COLUMN     "delivery_method" "EnumDeliveryMethod" NOT NULL DEFAULT 'delivery',
ADD COLUMN     "house_number" TEXT NOT NULL;
