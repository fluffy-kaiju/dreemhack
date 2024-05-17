/*
  Warnings:

  - Added the required column `userId` to the `Scope` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Scope" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Scope" ADD CONSTRAINT "Scope_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
