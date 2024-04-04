/*
  Warnings:

  - Added the required column `type` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EJobType" AS ENUM ('NMAP_SCAN_PORTS', 'NMAP_SCAN_NETWORK', 'SUBDOMAIN_SCAN');

-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "rawResult" TEXT,
ADD COLUMN     "type" "EJobType" NOT NULL;

-- CreateTable
CREATE TABLE "Subdomain" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,

    CONSTRAINT "Subdomain_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IP" (
    "id" TEXT NOT NULL,
    "ipv4" TEXT,
    "ipv6" TEXT,
    "jobId" TEXT NOT NULL,

    CONSTRAINT "IP_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Port" (
    "id" TEXT NOT NULL,
    "port" INTEGER NOT NULL,
    "ipId" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,

    CONSTRAINT "Port_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_IPToSubdomain" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_IPToSubdomain_AB_unique" ON "_IPToSubdomain"("A", "B");

-- CreateIndex
CREATE INDEX "_IPToSubdomain_B_index" ON "_IPToSubdomain"("B");

-- AddForeignKey
ALTER TABLE "Subdomain" ADD CONSTRAINT "Subdomain_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IP" ADD CONSTRAINT "IP_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Port" ADD CONSTRAINT "Port_ipId_fkey" FOREIGN KEY ("ipId") REFERENCES "IP"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Port" ADD CONSTRAINT "Port_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IPToSubdomain" ADD CONSTRAINT "_IPToSubdomain_A_fkey" FOREIGN KEY ("A") REFERENCES "IP"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IPToSubdomain" ADD CONSTRAINT "_IPToSubdomain_B_fkey" FOREIGN KEY ("B") REFERENCES "Subdomain"("id") ON DELETE CASCADE ON UPDATE CASCADE;
