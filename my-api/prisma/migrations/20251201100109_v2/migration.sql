/*
  Warnings:

  - You are about to drop the column `brand` on the `cars` table. All the data in the column will be lost.
  - You are about to drop the column `yaer` on the `cars` table. All the data in the column will be lost.
  - Added the required column `brandId` to the `cars` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `cars` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cars` DROP COLUMN `brand`,
    DROP COLUMN `yaer`,
    ADD COLUMN `brandId` INTEGER NOT NULL,
    ADD COLUMN `year` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `brands` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `logoUrl` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `cars` ADD CONSTRAINT `cars_brandId_fkey` FOREIGN KEY (`brandId`) REFERENCES `brands`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
