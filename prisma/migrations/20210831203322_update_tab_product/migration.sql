/*
  Warnings:

  - Added the required column `productLine_id` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "productLine_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Product" ADD FOREIGN KEY ("productLine_id") REFERENCES "ProductLine"("id") ON DELETE CASCADE ON UPDATE CASCADE;
