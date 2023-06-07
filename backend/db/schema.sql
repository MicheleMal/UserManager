CREATE TABLE IF NOT EXISTS users(
    id int AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    surname VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    fiscal_code VARCHAR(16) UNIQUE,
    tel_number VARCHAR(20) UNIQUE,
    address VARCHAR(255),
    postal_code VARCHAR(5)
);