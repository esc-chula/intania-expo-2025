/*
  Warnings:

  - The `category` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Category" AS ENUM ('STUDENT', 'INTANIA', 'COLLEGE_STUDENT', 'TEACHER', 'OTHER');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "category",
ADD COLUMN     "category" "Category";

-- CreateTable
CREATE TABLE "CheckedInExpoOnVisitor" (
    "userId" UUID NOT NULL,
    "checkIn" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "CheckedInExpoOnVisitor_userId_checkIn_key" ON "CheckedInExpoOnVisitor"("userId", "checkIn");

-- AddForeignKey
ALTER TABLE "CheckedInExpoOnVisitor" ADD CONSTRAINT "CheckedInExpoOnVisitor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
