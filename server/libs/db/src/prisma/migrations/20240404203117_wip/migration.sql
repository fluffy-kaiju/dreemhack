/*
  Warnings:

  - You are about to drop the `_IPToSubdomain` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[ipId]` on the table `Subdomain` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `scopeId` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `domainId` to the `Subdomain` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ipId` to the `Subdomain` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_IPToSubdomain" DROP CONSTRAINT "_IPToSubdomain_A_fkey";

-- DropForeignKey
ALTER TABLE "_IPToSubdomain" DROP CONSTRAINT "_IPToSubdomain_B_fkey";

-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "scopeId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Subdomain" ADD COLUMN     "domainId" TEXT NOT NULL,
ADD COLUMN     "ipId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_IPToSubdomain";

-- CreateTable
CREATE TABLE "scope" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "scope_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Domain" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,

    CONSTRAINT "Domain_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Domain_jobId_key" ON "Domain"("jobId");

-- CreateIndex
CREATE UNIQUE INDEX "Subdomain_ipId_key" ON "Subdomain"("ipId");

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_scopeId_fkey" FOREIGN KEY ("scopeId") REFERENCES "scope"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Domain" ADD CONSTRAINT "Domain_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subdomain" ADD CONSTRAINT "Subdomain_ipId_fkey" FOREIGN KEY ("ipId") REFERENCES "IP"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subdomain" ADD CONSTRAINT "Subdomain_domainId_fkey" FOREIGN KEY ("domainId") REFERENCES "Domain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
