-- ====================================================
-- Fine Art Mart Node.js and MySQL CLI store inventory app
-- ©2018 Richard Trevillian
-- University of Richmond (Virginia)
-- Full Stack Developer Bootcamp (July 2018)
-- ====================================================
-- SQL Schema and Seeds
-- ====================================================

DROP DATABASE IF EXISTS fineartmart_db;
CREATE DATABASE fineartmart_db;

USE fineartmart_db;


CREATE TABLE departments (
    dept_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    dept_name VARCHAR(100) NOT NULL,
    over_head_costs DECIMAL(10,2)
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

INSERT INTO products (department, product_name, artist_name, retail_price, stock_quantity)
VALUES ("prints", "Monalisa", "Leonardo da Vinci", 99.99, 9), 
("prints", "School of Athens", "Raphael", 32.99, 10), 
("sculptures", "Mlle Pogany", "Constantin Brancusi", 57.99, 15),
("prints", "Night Watch", "Rembrandt", 80.99, 15), 
("sculptures", "The Kelpies", "Andy Scott", 30.99, 14),
("sculptures", "Capitoline Wolf", "roman (unknown)", 53.99, 11),
("prints", "Girl with a Pearl Earring", "Johannes Vermeer", 52.99, 14), 
("prints", "Starry Night", "Vincent Van Gogh", 50.99, 36), 
("sculptures", "Winged Victory of Samothrace", "greek (unknown)", 89.99, 6),
("sculptures", "Venus of Willendorf", "30,000 BC", 29.99, 18),
("prints", "Olympia", "Edouard Manet", 50.99, 12), 
("sculptures", "The Dying Gaul", "greco-roman (unknown)", 35.99, 12),
("prints", "The Kiss", "Gustav Klimt", 75.99, 34), 
("prints", "American Gothic", "Grant Wood", 92.99, 17), 
("sculptures", "Bust of Nefertiti", "Thutmose", 99.99, 7),
("sculptures", "The Thinker", "Auguste Rodin", 12.99, 33),
("sculptures", "Cloud Gate", "Anish Kapoor", 19.99, 23),
("prints", "A Sunday Afternoon on the Island of La Grande Jatte", "Georges Suerat", 80.99, 15), 
("prints", "The Birth of Venus", "Sandro Botticelli", 39.99, 62),
("sculptures", "Balloon Dog (Magenta)", "Jeff Koons", 12.99, 87);