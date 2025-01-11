-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(36) NULL,
    `email` VARCHAR(255) NOT NULL,
    `login` VARCHAR(255) NOT NULL,
    `password` VARCHAR(60) NOT NULL,
    `resetToken` VARCHAR(32) NULL,
    `accessToken` VARCHAR(255) NULL,
    `serverId` VARCHAR(255) NULL,
    `skinHash` VARCHAR(255) NULL,
    `capeHash` VARCHAR(255) NULL,
    `isAlex` BOOLEAN NULL,

    UNIQUE INDEX `User_uuid_key`(`uuid`),
    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_login_key`(`login`),
    UNIQUE INDEX `User_resetToken_key`(`resetToken`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
