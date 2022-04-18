/*
  Warnings:

  - Added the required column `friendlyUrl` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "friendlyUrl" VARCHAR(256) NOT NULL;
