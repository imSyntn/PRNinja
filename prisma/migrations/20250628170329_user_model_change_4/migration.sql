/*
  Warnings:

  - Added the required column `filesChanged` to the `PR_Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `PR_Review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PR_Review" ADD COLUMN     "filesChanged" INTEGER NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;
