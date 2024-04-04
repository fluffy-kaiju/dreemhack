/*
  Warnings:

  - A unique constraint covering the columns `[ipId]` on the table `Subdomain` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Subdomain_ipId_key" ON "Subdomain"("ipId");
