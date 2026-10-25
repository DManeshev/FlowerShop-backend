/*
  Warnings:

  - You are about to drop the column `icon` on the `Subcategory` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Subcategory` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Subcategory" DROP COLUMN "icon",
DROP COLUMN "image";

-- AlterTable
ALTER TABLE "_FlowerToProduct" ADD CONSTRAINT "_FlowerToProduct_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_FlowerToProduct_AB_unique";
