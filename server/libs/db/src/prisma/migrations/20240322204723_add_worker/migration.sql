/*
  Warnings:

  - You are about to drop the column `lol` on the `Job` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "EWorkerStatus" AS ENUM ('ONLINE', 'OFFLINE', 'WORKING');

-- AlterTable
ALTER TABLE "Job" DROP COLUMN "lol";

-- CreateTable
CREATE TABLE "Worker" (
    "id" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "Worker_pkey" PRIMARY KEY ("id")
);
