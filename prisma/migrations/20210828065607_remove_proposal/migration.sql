/*
  Warnings:

  - You are about to drop the `Proposal` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Proposal" DROP CONSTRAINT "Proposal_product_id_fkey";

-- DropTable
DROP TABLE "Proposal";
