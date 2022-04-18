/*
  Warnings:

  - You are about to drop the column `link` on the `ProductLine` table. All the data in the column will be lost.
  - Added the required column `description` to the `ProductLine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `friendlyUrl` to the `ProductLine` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProductLine" DROP COLUMN "link",
ADD COLUMN     "description" VARCHAR(2000) NOT NULL,
ADD COLUMN     "friendlyUrl" VARCHAR(256) NOT NULL;
