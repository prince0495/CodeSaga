/*
  Warnings:

  - You are about to drop the column `dislikes` on the `Problem` table. All the data in the column will be lost.
  - You are about to drop the column `likes` on the `Problem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Problem" DROP COLUMN "dislikes",
DROP COLUMN "likes";

-- CreateTable
CREATE TABLE "Like" (
    "userId" TEXT NOT NULL,
    "problemURL" TEXT NOT NULL,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("userId","problemURL")
);

-- CreateTable
CREATE TABLE "Dislike" (
    "userId" TEXT NOT NULL,
    "problemURL" TEXT NOT NULL,

    CONSTRAINT "Dislike_pkey" PRIMARY KEY ("userId","problemURL")
);

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_problemURL_fkey" FOREIGN KEY ("problemURL") REFERENCES "Problem"("problemURL") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dislike" ADD CONSTRAINT "Dislike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dislike" ADD CONSTRAINT "Dislike_problemURL_fkey" FOREIGN KEY ("problemURL") REFERENCES "Problem"("problemURL") ON DELETE CASCADE ON UPDATE CASCADE;
