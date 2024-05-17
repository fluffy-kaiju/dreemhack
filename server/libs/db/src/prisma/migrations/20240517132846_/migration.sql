-- CreateEnum
CREATE TYPE "EJobStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'FAILED');

-- CreateEnum
CREATE TYPE "EJobType" AS ENUM ('NMAP_SCAN_PORTS', 'NMAP_SCAN_NETWORK', 'SUBDOMAIN_SCAN');

-- CreateEnum
CREATE TYPE "EWorkerStatus" AS ENUM ('ONLINE', 'OFFLINE', 'WORKING');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "scope" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "scope_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Job" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "EJobStatus" NOT NULL,
    "type" "EJobType" NOT NULL,
    "rawResult" TEXT,
    "userId" TEXT NOT NULL,
    "scopeId" TEXT NOT NULL,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Domain" (
    "id" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,

    CONSTRAINT "Domain_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subdomain" (
    "id" TEXT NOT NULL,
    "subdomain" TEXT NOT NULL,
    "ipId" TEXT NOT NULL,
    "domainId" TEXT NOT NULL,
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
CREATE TABLE "Url" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "port" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "banner" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,

    CONSTRAINT "Url_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Worker" (
    "id" TEXT NOT NULL,
    "status" "EWorkerStatus" NOT NULL,

    CONSTRAINT "Worker_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Domain_jobId_key" ON "Domain"("jobId");

-- CreateIndex
CREATE UNIQUE INDEX "Subdomain_ipId_key" ON "Subdomain"("ipId");

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_scopeId_fkey" FOREIGN KEY ("scopeId") REFERENCES "scope"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Domain" ADD CONSTRAINT "Domain_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subdomain" ADD CONSTRAINT "Subdomain_ipId_fkey" FOREIGN KEY ("ipId") REFERENCES "IP"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subdomain" ADD CONSTRAINT "Subdomain_domainId_fkey" FOREIGN KEY ("domainId") REFERENCES "Domain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subdomain" ADD CONSTRAINT "Subdomain_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IP" ADD CONSTRAINT "IP_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Url" ADD CONSTRAINT "Url_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
