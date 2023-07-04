-- DropForeignKey
ALTER TABLE `items` DROP FOREIGN KEY `Items_location_id_fkey`;

-- AddForeignKey
ALTER TABLE `items` ADD CONSTRAINT `items_location_id_fkey` FOREIGN KEY (`location_id`) REFERENCES `locations`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
