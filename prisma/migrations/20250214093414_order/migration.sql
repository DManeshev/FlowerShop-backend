/*
  Warnings:

  - You are about to drop the column `house_number` on the `Order` table. All the data in the column will be lost.
  - Added the required column `houseNumber` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "house_number",
ADD COLUMN     "houseNumber" TEXT NOT NULL;
