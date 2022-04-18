/*
  Warnings:

  - You are about to drop the column `subject_id` on the `Contact` table. All the data in the column will be lost.
  - You are about to drop the `Subject` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Contact" DROP CONSTRAINT "Contact_subject_id_fkey";

-- DropForeignKey
ALTER TABLE "Subject" DROP CONSTRAINT "Subject_userCreatedId_fkey";

-- DropForeignKey
ALTER TABLE "Subject" DROP CONSTRAINT "Subject_userUpdatedId_fkey";

-- AlterTable
ALTER TABLE "Contact" DROP COLUMN "subject_id";

-- DropTable
DROP TABLE "Subject";
