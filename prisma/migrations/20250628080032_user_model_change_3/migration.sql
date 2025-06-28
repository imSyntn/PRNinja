-- AlterTable
ALTER TABLE "User" ALTER COLUMN "accountId" DROP DEFAULT;
DROP SEQUENCE "user_accountid_seq";
