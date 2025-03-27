/*
  Warnings:

  - A unique constraint covering the columns `[userId,workshopId]` on the table `RegisteredWorkshopSlotOnVisitor` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `workshopId` to the `RegisteredWorkshopSlotOnVisitor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RegisteredWorkshopSlotOnVisitor" ADD COLUMN     "workshopId" UUID NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "RegisteredWorkshopSlotOnVisitor_userId_workshopId_key" ON "RegisteredWorkshopSlotOnVisitor"("userId", "workshopId");

-- AddForeignKey
ALTER TABLE "RegisteredWorkshopSlotOnVisitor" ADD CONSTRAINT "RegisteredWorkshopSlotOnVisitor_workshopId_fkey" FOREIGN KEY ("workshopId") REFERENCES "Workshop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
