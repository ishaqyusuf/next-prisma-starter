/*
  Warnings:

  - You are about to drop the `academicterms` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `academicyears` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `classes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `fees` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `parents` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `students` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `studentterms` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `transactions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `wallets` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `academicterms` DROP FOREIGN KEY `AcademicTerms_academicYearId_fkey`;

-- DropForeignKey
ALTER TABLE `fees` DROP FOREIGN KEY `Fees_studentTermId_fkey`;

-- DropForeignKey
ALTER TABLE `students` DROP FOREIGN KEY `Students_parentId_fkey`;

-- DropForeignKey
ALTER TABLE `studentterms` DROP FOREIGN KEY `StudentTerms_classId_fkey`;

-- DropForeignKey
ALTER TABLE `studentterms` DROP FOREIGN KEY `StudentTerms_studentId_fkey`;

-- DropForeignKey
ALTER TABLE `studentterms` DROP FOREIGN KEY `StudentTerms_termId_fkey`;

-- DropForeignKey
ALTER TABLE `transactions` DROP FOREIGN KEY `Transactions_usersId_fkey`;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `meta` JSON NULL,
    MODIFY `role` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `academicterms`;

-- DropTable
DROP TABLE `academicyears`;

-- DropTable
DROP TABLE `classes`;

-- DropTable
DROP TABLE `fees`;

-- DropTable
DROP TABLE `parents`;

-- DropTable
DROP TABLE `students`;

-- DropTable
DROP TABLE `studentterms`;

-- DropTable
DROP TABLE `transactions`;

-- DropTable
DROP TABLE `wallets`;
