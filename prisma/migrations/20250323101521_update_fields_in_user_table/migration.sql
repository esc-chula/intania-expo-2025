/*
  Warnings:

  - You are about to drop the column `interestedField` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `referralSource` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `visitDate` on the `User` table. All the data in the column will be lost.
  - The `interestedActivities` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "interestedField",
DROP COLUMN "referralSource",
DROP COLUMN "visitDate",
ADD COLUMN     "interestedFields" TEXT[],
ADD COLUMN     "referralSources" TEXT[],
ADD COLUMN     "visitDates" TEXT[],
DROP COLUMN "interestedActivities",
ADD COLUMN     "interestedActivities" TEXT[];
