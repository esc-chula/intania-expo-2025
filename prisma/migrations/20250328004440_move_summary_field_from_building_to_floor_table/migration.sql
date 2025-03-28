/*
  Warnings:

  - You are about to drop the column `summary` on the `Building` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Building" DROP COLUMN "summary";

-- AlterTable
ALTER TABLE "Floor" ADD COLUMN     "summary" TEXT;

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_sixDigitCode_idx" ON "User"("sixDigitCode");
