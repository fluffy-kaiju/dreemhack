/*
  Warnings:

  - You are about to drop the column `jobId` on the `Domain` table. All the data in the column will be lost.
  - You are about to drop the column `jobId` on the `Subdomain` table. All the data in the column will be lost.
  - You are about to drop the column `jobId` on the `Url` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Domain" DROP CONSTRAINT "Domain_jobId_fkey";

-- DropForeignKey
ALTER TABLE "Subdomain" DROP CONSTRAINT "Subdomain_jobId_fkey";

-- DropForeignKey
ALTER TABLE "Url" DROP CONSTRAINT "Url_jobId_fkey";

-- DropIndex
DROP INDEX "Domain_jobId_key";

-- AlterTable
ALTER TABLE "Domain" DROP COLUMN "jobId";

-- AlterTable
ALTER TABLE "Subdomain" DROP COLUMN "jobId";

-- AlterTable
ALTER TABLE "Url" DROP COLUMN "jobId";

-- CreateTable
CREATE TABLE "_JobToSubdomain" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_JobToUrl" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_DomainToJob" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_JobToSubdomain_AB_unique" ON "_JobToSubdomain"("A", "B");

-- CreateIndex
CREATE INDEX "_JobToSubdomain_B_index" ON "_JobToSubdomain"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_JobToUrl_AB_unique" ON "_JobToUrl"("A", "B");

-- CreateIndex
CREATE INDEX "_JobToUrl_B_index" ON "_JobToUrl"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DomainToJob_AB_unique" ON "_DomainToJob"("A", "B");

-- CreateIndex
CREATE INDEX "_DomainToJob_B_index" ON "_DomainToJob"("B");

-- AddForeignKey
ALTER TABLE "_JobToSubdomain" ADD CONSTRAINT "_JobToSubdomain_A_fkey" FOREIGN KEY ("A") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JobToSubdomain" ADD CONSTRAINT "_JobToSubdomain_B_fkey" FOREIGN KEY ("B") REFERENCES "Subdomain"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JobToUrl" ADD CONSTRAINT "_JobToUrl_A_fkey" FOREIGN KEY ("A") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JobToUrl" ADD CONSTRAINT "_JobToUrl_B_fkey" FOREIGN KEY ("B") REFERENCES "Url"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DomainToJob" ADD CONSTRAINT "_DomainToJob_A_fkey" FOREIGN KEY ("A") REFERENCES "Domain"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DomainToJob" ADD CONSTRAINT "_DomainToJob_B_fkey" FOREIGN KEY ("B") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;
