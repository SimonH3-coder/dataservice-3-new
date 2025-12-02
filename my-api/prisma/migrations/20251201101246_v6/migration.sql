/*
  Warnings:

  - You are about to drop the column `brandId` on the `cars` table. All the data in the column will be lost.
  - Added the required column `category` to the `brands` table without a default value. This is not possible if the table is not empty.
  - Added the required column `brand` to the `cars` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `cars` DROP FOREIGN KEY `cars_brandId_fkey`;

-- DropIndex
DROP INDEX `cars_brandId_fkey` ON `cars`;

-- AlterTable
ALTER TABLE `brands` ADD COLUMN `category` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `cars` DROP COLUMN `brandId`,
    ADD COLUMN `brand` INTEGER NOT NULL,
    MODIFY `year` VARCHAR(191) NOT NULL;
