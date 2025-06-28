/*
  Warnings:

  - You are about to drop the column `title` on the `PR_Review` table. All the data in the column will be lost.
  - Added the required column `link` to the `PR_Review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PR_Review" DROP COLUMN "title",
ADD COLUMN     "link" TEXT NOT NULL;
