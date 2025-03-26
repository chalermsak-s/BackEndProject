-- AlterTable
ALTER TABLE `feedback` ADD COLUMN `parent_feedback_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `feedback` ADD CONSTRAINT `feedback_parent_feedback_id_fkey` FOREIGN KEY (`parent_feedback_id`) REFERENCES `feedback`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
