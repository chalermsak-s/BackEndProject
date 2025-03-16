-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(65) NOT NULL,
    `password` VARCHAR(45) NOT NULL,
    `role` ENUM('ADMIN', 'STUDENT', 'ADVISOR') NOT NULL,

    UNIQUE INDEX `user_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `admin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `admin_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `admin_log` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `adminId` INTEGER NOT NULL,
    `action` VARCHAR(255) NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `student` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `student_id_card` VARCHAR(15) NOT NULL,
    `first_name` VARCHAR(45) NOT NULL,
    `last_name` VARCHAR(45) NOT NULL,
    `picture` VARCHAR(45) NOT NULL,
    `Department_id` INTEGER NOT NULL,
    `Degree_id` INTEGER NOT NULL,

    UNIQUE INDEX `student_userId_key`(`userId`),
    UNIQUE INDEX `student_student_id_card_key`(`student_id_card`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `advisor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `first_name` VARCHAR(45) NOT NULL,
    `last_name` VARCHAR(45) NOT NULL,
    `picture` VARCHAR(45) NOT NULL,
    `Academic_position_id` INTEGER NOT NULL,
    `Department_id` INTEGER NOT NULL,

    UNIQUE INDEX `advisor_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `academic_position` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `academic_position_name` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `department` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `initials` VARCHAR(255) NOT NULL,
    `department_name` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `department_initials_key`(`initials`),
    UNIQUE INDEX `department_department_name_key`(`department_name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `degree` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `degree_name` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `appointment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `topic` VARCHAR(70) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `requested_date` DATETIME(3) NOT NULL,
    `appointment_request_date_time` DATETIME(3) NOT NULL,
    `student_confirmation` TINYINT NOT NULL,
    `Student_id` INTEGER NOT NULL,
    `Advisor_id` INTEGER NOT NULL,
    `Status_appointment_id` INTEGER NOT NULL,
    `Admin_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `status_appointment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `status` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `announcement` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `topic` VARCHAR(70) NOT NULL,
    `description` VARCHAR(225) NOT NULL,
    `file` VARCHAR(45) NULL,
    `posted_date` DATETIME(3) NOT NULL,
    `Advisor_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `feedback` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `feedback` VARCHAR(255) NULL,
    `timestamp` DATETIME(3) NULL,
    `Student_id` INTEGER NOT NULL,
    `Advisor_id` INTEGER NOT NULL,
    `Admin_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `admin` ADD CONSTRAINT `admin_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `admin_log` ADD CONSTRAINT `admin_log_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `admin`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `student` ADD CONSTRAINT `student_Department_id_fkey` FOREIGN KEY (`Department_id`) REFERENCES `department`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `student` ADD CONSTRAINT `student_Degree_id_fkey` FOREIGN KEY (`Degree_id`) REFERENCES `degree`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `student` ADD CONSTRAINT `student_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `advisor` ADD CONSTRAINT `advisor_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `advisor` ADD CONSTRAINT `advisor_Academic_position_id_fkey` FOREIGN KEY (`Academic_position_id`) REFERENCES `academic_position`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `advisor` ADD CONSTRAINT `advisor_Department_id_fkey` FOREIGN KEY (`Department_id`) REFERENCES `department`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `appointment` ADD CONSTRAINT `appointment_Student_id_fkey` FOREIGN KEY (`Student_id`) REFERENCES `student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `appointment` ADD CONSTRAINT `appointment_Advisor_id_fkey` FOREIGN KEY (`Advisor_id`) REFERENCES `advisor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `appointment` ADD CONSTRAINT `appointment_Status_appointment_id_fkey` FOREIGN KEY (`Status_appointment_id`) REFERENCES `status_appointment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `appointment` ADD CONSTRAINT `appointment_Admin_id_fkey` FOREIGN KEY (`Admin_id`) REFERENCES `admin`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `announcement` ADD CONSTRAINT `announcement_Advisor_id_fkey` FOREIGN KEY (`Advisor_id`) REFERENCES `advisor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `feedback` ADD CONSTRAINT `feedback_Student_id_fkey` FOREIGN KEY (`Student_id`) REFERENCES `student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `feedback` ADD CONSTRAINT `feedback_Advisor_id_fkey` FOREIGN KEY (`Advisor_id`) REFERENCES `advisor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `feedback` ADD CONSTRAINT `feedback_Admin_id_fkey` FOREIGN KEY (`Admin_id`) REFERENCES `admin`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
