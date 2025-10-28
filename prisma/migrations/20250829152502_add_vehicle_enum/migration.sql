/*
  Warnings:

  - Made the column `veh_listing_type` on table `vehicle` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `vehicle` MODIFY `veh_listing_type` ENUM('New', 'Used') NOT NULL;
