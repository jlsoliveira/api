/*
  Warnings:

  - You are about to drop the `Client` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Client" DROP CONSTRAINT "Client_media_id_fkey";

-- DropForeignKey
ALTER TABLE "Client" DROP CONSTRAINT "Client_userCreatedId_fkey";

-- DropForeignKey
ALTER TABLE "Client" DROP CONSTRAINT "Client_userUpdatedId_fkey";

-- DropTable
DROP TABLE "Client";
