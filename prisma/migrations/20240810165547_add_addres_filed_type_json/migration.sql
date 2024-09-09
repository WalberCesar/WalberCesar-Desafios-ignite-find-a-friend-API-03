/*
  Warnings:

  - Changed the type of `addres` on the `orgs` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "orgs" DROP COLUMN "addres",
ADD COLUMN     "addres" JSONB NOT NULL;
