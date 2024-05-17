/*
  Warnings:

  - You are about to drop the column `jobId` on the `IP` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "IP" DROP CONSTRAINT "IP_jobId_fkey";

-- AlterTable
ALTER TABLE "IP" DROP COLUMN "jobId";

-- CreateTable
CREATE TABLE "_IPToJob" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_IPToJob_AB_unique" ON "_IPToJob"("A", "B");

-- CreateIndex
CREATE INDEX "_IPToJob_B_index" ON "_IPToJob"("B");

-- AddForeignKey
ALTER TABLE "_IPToJob" ADD CONSTRAINT "_IPToJob_A_fkey" FOREIGN KEY ("A") REFERENCES "IP"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IPToJob" ADD CONSTRAINT "_IPToJob_B_fkey" FOREIGN KEY ("B") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;
