/*
  Warnings:

  - Added the required column `unitWeight` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "unitWeight" VARCHAR(256) NOT NULL;
