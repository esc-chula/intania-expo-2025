-- DropForeignKey
ALTER TABLE "RegisteredWorkshopSlotOnVisitor" DROP CONSTRAINT "RegisteredWorkshopSlotOnVisitor_userId_fkey";

-- DropForeignKey
ALTER TABLE "RegisteredWorkshopSlotOnVisitor" DROP CONSTRAINT "RegisteredWorkshopSlotOnVisitor_workshopId_fkey";

-- DropForeignKey
ALTER TABLE "RegisteredWorkshopSlotOnVisitor" DROP CONSTRAINT "RegisteredWorkshopSlotOnVisitor_workshopSlotId_fkey";

-- DropForeignKey
ALTER TABLE "Token" DROP CONSTRAINT "Token_userId_fkey";

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegisteredWorkshopSlotOnVisitor" ADD CONSTRAINT "RegisteredWorkshopSlotOnVisitor_workshopSlotId_fkey" FOREIGN KEY ("workshopSlotId") REFERENCES "WorkshopSlot"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegisteredWorkshopSlotOnVisitor" ADD CONSTRAINT "RegisteredWorkshopSlotOnVisitor_workshopId_fkey" FOREIGN KEY ("workshopId") REFERENCES "Workshop"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegisteredWorkshopSlotOnVisitor" ADD CONSTRAINT "RegisteredWorkshopSlotOnVisitor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
