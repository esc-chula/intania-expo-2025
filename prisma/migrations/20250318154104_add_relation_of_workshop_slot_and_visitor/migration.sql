-- CreateTable
CREATE TABLE "RegisteredWorkshopSlotOnVisitor" (
    "workshopSlotId" UUID NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "RegisteredWorkshopSlotOnVisitor_pkey" PRIMARY KEY ("userId","workshopSlotId")
);

-- AddForeignKey
ALTER TABLE "RegisteredWorkshopSlotOnVisitor" ADD CONSTRAINT "RegisteredWorkshopSlotOnVisitor_workshopSlotId_fkey" FOREIGN KEY ("workshopSlotId") REFERENCES "WorkshopSlot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegisteredWorkshopSlotOnVisitor" ADD CONSTRAINT "RegisteredWorkshopSlotOnVisitor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
