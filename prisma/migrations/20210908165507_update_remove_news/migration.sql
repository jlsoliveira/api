/*
  Warnings:

  - You are about to drop the `News` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "News" DROP CONSTRAINT "News_media_id_fkey";

-- DropForeignKey
ALTER TABLE "News" DROP CONSTRAINT "News_userCreatedId_fkey";

-- DropForeignKey
ALTER TABLE "News" DROP CONSTRAINT "News_userUpdatedId_fkey";

-- DropTable
DROP TABLE "News";
