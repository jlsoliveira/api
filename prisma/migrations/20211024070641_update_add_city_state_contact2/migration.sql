/*
  Warnings:

  - Added the required column `city` to the `Contact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Contact` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Contact" ADD COLUMN     "city" VARCHAR(256) NOT NULL,
ADD COLUMN     "state" VARCHAR(256) NOT NULL;
