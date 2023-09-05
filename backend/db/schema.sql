CREATE DATABASE IF NOT EXISTS UserManager;

USE UserManager;

CREATE TABLE IF NOT EXISTS users(
    id_user int AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    surname VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    tel_number VARCHAR(20) UNIQUE,
    role ENUM("owner", "admin", "user") NOT NULL,
    token VARCHAR(255) NULL UNIQUE,
    otp VARCHAR(6) NULL UNIQUE,
    isVerified BOOLEAN DEFAULT false
);