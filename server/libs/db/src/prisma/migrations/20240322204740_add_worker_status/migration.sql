/*
  Warnings:

  - Added the required column `status` to the `Worker` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Worker" ADD COLUMN     "status" "EWorkerStatus" NOT NULL;
