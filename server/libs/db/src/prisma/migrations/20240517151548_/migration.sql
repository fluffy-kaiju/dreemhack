/*
  Warnings:

  - Made the column `domainId` on table `Subdomain` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Subdomain" DROP CONSTRAINT "Subdomain_domainId_fkey";

-- AlterTable
ALTER TABLE "Subdomain" ALTER COLUMN "domainId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Subdomain" ADD CONSTRAINT "Subdomain_domainId_fkey" FOREIGN KEY ("domainId") REFERENCES "Domain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
