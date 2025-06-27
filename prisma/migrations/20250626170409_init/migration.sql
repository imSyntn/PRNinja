-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "pic" TEXT NOT NULL DEFAULT 'https://res.cloudinary.com/dqn1hcl8c/image/upload/v1750957242/profile_bmnjki.gif',
    "plan" TEXT NOT NULL DEFAULT 'Free',
    "installationId" INTEGER NOT NULL,
    "accountLogin" TEXT NOT NULL,
    "accountId" INTEGER NOT NULL,
    "reviewPreference" TEXT NOT NULL DEFAULT 'auto',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PR_Review" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "repo" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "suggestions" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PR_Review_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_accountId_key" ON "User"("accountId");

-- AddForeignKey
ALTER TABLE "PR_Review" ADD CONSTRAINT "PR_Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
