/*
  Warnings:

  - You are about to drop the column `password` on the `t_Employee` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `t_Employee` table. All the data in the column will be lost.
  - Added the required column `image` to the `t_Employee` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "t_Employee_username_key";

-- AlterTable
ALTER TABLE "t_Employee" DROP COLUMN "password",
DROP COLUMN "username",
ADD COLUMN     "image" TEXT NOT NULL;
