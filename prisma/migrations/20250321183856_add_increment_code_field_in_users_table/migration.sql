/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Major` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Major` table without a default value. This is not possible if the table is not empty.
  - Added the required column `checkIn` to the `RegisteredWorkshopSlotOnVisitor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Major" ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "RegisteredWorkshopSlotOnVisitor" ADD COLUMN     "checkIn" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "incrementCode" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Major_name_key" ON "Major"("name");
