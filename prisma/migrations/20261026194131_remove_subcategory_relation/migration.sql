/*
  Warnings:

  - You are about to drop the column `subcategory_id` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `Subcategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SubcategoryMigrationMap` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_subcategory_id_fkey";

-- DropForeignKey
ALTER TABLE "Subcategory" DROP CONSTRAINT "Subcategory_category_id_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "subcategory_id";

-- DropTable
DROP TABLE "Subcategory";

-- DropTable
DROP TABLE "SubcategoryMigrationMap";
