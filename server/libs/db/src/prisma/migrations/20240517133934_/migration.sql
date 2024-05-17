/*
  Warnings:

  - You are about to drop the column `ipId` on the `Subdomain` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Subdomain" DROP CONSTRAINT "Subdomain_domainId_fkey";

-- DropForeignKey
ALTER TABLE "Subdomain" DROP CONSTRAINT "Subdomain_ipId_fkey";

-- DropIndex
DROP INDEX "Subdomain_ipId_key";

-- AlterTable
ALTER TABLE "Subdomain" DROP COLUMN "ipId",
ALTER COLUMN "domainId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Subdomain" ADD CONSTRAINT "Subdomain_domainId_fkey" FOREIGN KEY ("domainId") REFERENCES "Domain"("id") ON DELETE SET NULL ON UPDATE CASCADE;
