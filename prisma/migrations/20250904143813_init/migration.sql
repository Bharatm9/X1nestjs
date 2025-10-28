/*
  Warnings:

  - You are about to drop the `vehicle` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `vehicle`;

-- CreateTable
CREATE TABLE `rooftop` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NULL,
    `street` VARCHAR(255) NULL,
    `city` VARCHAR(255) NULL,
    `state` VARCHAR(255) NULL,
    `zip` VARCHAR(50) NULL,
    `phone` VARCHAR(50) NULL,
    `email` VARCHAR(255) NULL,
    `site` VARCHAR(255) NULL,
    `created_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_date` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vehicles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `rooftop_id` INTEGER NULL,
    `guid` VARCHAR(50) NULL,
    `stock` VARCHAR(20) NULL,
    `vin` VARCHAR(30) NULL,
    `active` BOOLEAN NULL DEFAULT false,
    `veh_listing_type` ENUM('New', 'Used') NULL,
    `certified` BOOLEAN NULL DEFAULT false,
    `year` INTEGER NULL DEFAULT 0,
    `make` VARCHAR(50) NULL,
    `model` VARCHAR(50) NULL,
    `trim` VARCHAR(50) NULL,
    `body_type` VARCHAR(50) NULL,
    `ext_color` VARCHAR(50) NULL,
    `int_color` VARCHAR(50) NULL,
    `miles` VARCHAR(20) NULL,
    `status` VARCHAR(50) NULL,
    `engine` VARCHAR(100) NULL,
    `created_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_date` DATETIME(3) NOT NULL,
    `deleted_date` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `videos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `vehicle_id` INTEGER NOT NULL,
    `clip_duration` INTEGER NULL,
    `clip_url` VARCHAR(1024) NULL,
    `thumb_url` VARCHAR(1024) NULL,
    `title` VARCHAR(255) NULL,
    `short_desc` TEXT NULL,
    `desc` TEXT NULL,
    `created_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_date` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `360spin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `vehicle_id` INTEGER NOT NULL,
    `player_url` VARCHAR(1024) NULL,
    `type` ENUM('CAPTURED', 'STITCHED') NOT NULL,
    `exterior_view` BOOLEAN NULL DEFAULT false,
    `interior_view` BOOLEAN NULL DEFAULT false,
    `created_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_date` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `images` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `vehicle_id` INTEGER NOT NULL,
    `image_group_id` INTEGER NULL,
    `image_url` VARCHAR(1024) NOT NULL,
    `image_width` INTEGER NULL,
    `image_height` INTEGER NULL,
    `created_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_date` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `vehicles` ADD CONSTRAINT `vehicles_rooftop_id_fkey` FOREIGN KEY (`rooftop_id`) REFERENCES `rooftop`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `videos` ADD CONSTRAINT `videos_vehicle_id_fkey` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `360spin` ADD CONSTRAINT `360spin_vehicle_id_fkey` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `images` ADD CONSTRAINT `images_vehicle_id_fkey` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
