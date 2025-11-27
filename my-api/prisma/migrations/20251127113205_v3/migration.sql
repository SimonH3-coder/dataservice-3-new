/*
  Warnings:

  - You are about to drop the column `catotegory` on the `cars` table. All the data in the column will be lost.
  - Added the required column `category` to the `cars` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cars` DROP COLUMN `catotegory`,
    ADD COLUMN `category` VARCHAR(191) NOT NULL;
