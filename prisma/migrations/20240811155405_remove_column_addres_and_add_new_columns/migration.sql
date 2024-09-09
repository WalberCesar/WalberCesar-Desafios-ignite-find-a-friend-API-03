/*
  Warnings:

  - You are about to drop the column `addres` on the `orgs` table. All the data in the column will be lost.
  - Added the required column `State` to the `orgs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cep` to the `orgs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `orgs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number` to the `orgs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street` to the `orgs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orgs" DROP COLUMN "addres",
ADD COLUMN     "State" TEXT NOT NULL,
ADD COLUMN     "cep" TEXT NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "number" TEXT NOT NULL,
ADD COLUMN     "street" TEXT NOT NULL;
