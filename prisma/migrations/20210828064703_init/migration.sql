/*
  Warnings:

  - You are about to drop the column `description` on the `Banner` table. All the data in the column will be lost.
  - You are about to alter the column `title` on the `Banner` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(256)`.
  - You are about to alter the column `link` on the `Banner` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(2000)`.
  - You are about to alter the column `title` on the `Client` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(256)`.
  - You are about to alter the column `fullname` on the `Contact` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(256)`.
  - You are about to alter the column `email` on the `Contact` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(256)`.
  - You are about to alter the column `cellphone` on the `Contact` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `message` on the `Contact` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(4000)`.
  - You are about to alter the column `path` on the `Media` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(5000)`.
  - You are about to alter the column `filename` on the `Media` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(250)`.
  - You are about to alter the column `mimetype` on the `Media` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `title` on the `News` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(256)`.
  - You are about to alter the column `description` on the `News` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(2000)`.
  - You are about to drop the column `content` on the `Product` table. All the data in the column will be lost.
  - You are about to alter the column `title` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(256)`.
  - You are about to alter the column `description` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(2000)`.
  - You are about to drop the column `identifier` on the `Proposal` table. All the data in the column will be lost.
  - You are about to alter the column `fullname` on the `Proposal` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(256)`.
  - You are about to alter the column `email` on the `Proposal` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(256)`.
  - You are about to alter the column `cellphone` on the `Proposal` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `message` on the `Proposal` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(4000)`.
  - You are about to alter the column `title` on the `Subject` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(256)`.
  - You are about to alter the column `username` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(120)`.
  - You are about to alter the column `password` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(256)`.
  - You are about to drop the `Area` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WorkWithUs` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `extension` to the `Media` table without a default value. This is not possible if the table is not empty.
  - Added the required column `filename_original` to the `Media` table without a default value. This is not possible if the table is not empty.
  - Made the column `publishDate` on table `News` required. This step will fail if there are existing NULL values in that column.
  - Made the column `expireDate` on table `News` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `ingredient` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nutritional` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `preparation` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Area" DROP CONSTRAINT "Area_userCreatedId_fkey";

-- DropForeignKey
ALTER TABLE "Area" DROP CONSTRAINT "Area_userUpdatedId_fkey";

-- DropForeignKey
ALTER TABLE "WorkWithUs" DROP CONSTRAINT "WorkWithUs_area_id_fkey";

-- DropForeignKey
ALTER TABLE "WorkWithUs" DROP CONSTRAINT "WorkWithUs_media_id_fkey";

-- AlterTable
ALTER TABLE "Banner" DROP COLUMN "description",
ALTER COLUMN "title" SET DATA TYPE VARCHAR(256),
ALTER COLUMN "link" SET DATA TYPE VARCHAR(2000),
ALTER COLUMN "available" SET DEFAULT true,
ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Client" ALTER COLUMN "title" SET DATA TYPE VARCHAR(256),
ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Contact" ALTER COLUMN "fullname" SET DATA TYPE VARCHAR(256),
ALTER COLUMN "email" SET DATA TYPE VARCHAR(256),
ALTER COLUMN "cellphone" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "message" SET DATA TYPE VARCHAR(4000),
ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Media" ADD COLUMN     "extension" VARCHAR(50) NOT NULL,
ADD COLUMN     "filename_original" VARCHAR(250) NOT NULL,
ALTER COLUMN "path" SET DATA TYPE VARCHAR(5000),
ALTER COLUMN "filename" SET DATA TYPE VARCHAR(250),
ALTER COLUMN "mimetype" SET DATA TYPE VARCHAR(50);

-- AlterTable
ALTER TABLE "News" ALTER COLUMN "title" SET DATA TYPE VARCHAR(256),
ALTER COLUMN "description" SET DATA TYPE VARCHAR(2000),
ALTER COLUMN "publishDate" SET NOT NULL,
ALTER COLUMN "expireDate" SET NOT NULL,
ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "content",
ADD COLUMN     "ingredient" TEXT NOT NULL,
ADD COLUMN     "nutritional" TEXT NOT NULL,
ADD COLUMN     "preparation" TEXT NOT NULL,
ALTER COLUMN "title" SET DATA TYPE VARCHAR(256),
ALTER COLUMN "description" SET DATA TYPE VARCHAR(2000),
ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Proposal" DROP COLUMN "identifier",
ALTER COLUMN "fullname" SET DATA TYPE VARCHAR(256),
ALTER COLUMN "email" SET DATA TYPE VARCHAR(256),
ALTER COLUMN "cellphone" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "message" SET DATA TYPE VARCHAR(4000),
ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Subject" ALTER COLUMN "title" SET DATA TYPE VARCHAR(256),
ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "username" SET DATA TYPE VARCHAR(120),
ALTER COLUMN "password" SET DATA TYPE VARCHAR(256),
ALTER COLUMN "updatedAt" DROP NOT NULL,
ALTER COLUMN "role" DROP NOT NULL;

-- DropTable
DROP TABLE "Area";

-- DropTable
DROP TABLE "WorkWithUs";

-- CreateIndex
CREATE UNIQUE INDEX "User.username_unique" ON "User"("username");
