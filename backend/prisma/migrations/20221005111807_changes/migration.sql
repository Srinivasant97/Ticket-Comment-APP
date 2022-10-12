-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_createdBy_fkey";

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("email") ON DELETE CASCADE ON UPDATE CASCADE;
