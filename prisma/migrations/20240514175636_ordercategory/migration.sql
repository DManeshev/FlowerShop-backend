/*
  Warnings:

  - Added the required column `order` to the `Subcategory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Subcategory" ADD COLUMN     "order" INTEGER NOT NULL;
