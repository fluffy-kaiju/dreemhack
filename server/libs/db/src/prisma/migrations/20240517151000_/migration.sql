/*
  Warnings:

  - You are about to drop the column `scopeId` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the `scope` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Job" DROP CONSTRAINT "Job_scopeId_fkey";

-- AlterTable
ALTER TABLE "Job" DROP COLUMN "scopeId";

-- DropTable
DROP TABLE "scope";

-- CreateTable
CREATE TABLE "Scope" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Scope_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_JobToScope" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_JobToScope_AB_unique" ON "_JobToScope"("A", "B");

-- CreateIndex
CREATE INDEX "_JobToScope_B_index" ON "_JobToScope"("B");

-- AddForeignKey
ALTER TABLE "_JobToScope" ADD CONSTRAINT "_JobToScope_A_fkey" FOREIGN KEY ("A") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JobToScope" ADD CONSTRAINT "_JobToScope_B_fkey" FOREIGN KEY ("B") REFERENCES "Scope"("id") ON DELETE CASCADE ON UPDATE CASCADE;
