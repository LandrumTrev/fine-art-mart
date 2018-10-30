-- ====================================================
-- Fine Art Mart Node.js and MySQL CLI store inventory app
-- ©2018 Richard Trevillian
-- University of Richmond (Virginia)
-- Full Stack Developer Bootcamp (July 2018)
-- ====================================================

-- ====================================================
-- SQL SCHEMA
-- ====================================================

DROP DATABASE IF EXISTS fineartmart_db;
CREATE DATABASE fineartmart_db;
USE fineartmart_db;

CREATE TABLE departments (
    dept_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    dept_name VARCHAR(100) NOT NULL,
    overhead_costs DECIMAL(10,2)
);

CREATE TABLE products (
    item_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    department VARCHAR(100) NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    artist_name VARCHAR(100),
    retail_price DECIMAL(10,2),
    product_sales DECIMAL(10,2),
    stock_quantity INT
);

-- ====================================================
-- SQL SEEDS
-- ====================================================

INSERT INTO departments (dept_name, overhead_costs)
VALUES ("prints", 1721.21), 
("sculptures", 2329.83);

INSERT INTO products (department, product_name, artist_name, retail_price, product_sales, stock_quantity)
VALUES ("prints", "Monalisa", "Leonardo da Vinci", 99.99, 899.91, 9), 
("prints", "School of Athens", "Raphael", 32.99, 131.96, 10), 
("prints", "Night Watch", "Rembrandt", 80.99, 647.92, 15), 
("sculptures", "Capitoline Wolf", "Roman", 53.99, 377.93, 11),
("prints", "Girl with a Pearl Earring", "Johannes Vermeer", 52.99, 211.96, 6), 
("prints", "American Gothic", "Grant Wood", 92.99, 836.91, 17), 
("sculptures", "Bust of Nefertiti", "Thutmose", 99.99, 2599.74, 7),
("sculptures", "Cloud Gate", "Anish Kapoor", 19.99, 239.88, 11),
("prints", "A Sunday Afternoon on the Island of La Grande Jatte", "Georges Suerat", 80.99, 485.94, 15), 
("prints", "The Birth of Venus", "Sandro Botticelli", 39.99, 319.92, 16);