/*
  Warnings:

  - Added the required column `subdomainId` to the `Port` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Port" ADD COLUMN     "subdomainId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Port" ADD CONSTRAINT "Port_subdomainId_fkey" FOREIGN KEY ("subdomainId") REFERENCES "Subdomain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
