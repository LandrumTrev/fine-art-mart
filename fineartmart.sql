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

CREATE TABLE products (
    item_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    department VARCHAR(100) NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    artist_name VARCHAR(100),
    retail_price DECIMAL(10,2),
    stock_quantity INT
);

INSERT INTO products (department, product_name, artist_name, retail_price, stock_quantity)
VALUES ("prints", "Monalisa", "Leonardo da Vinci", 99.99, 9), 
("prints", "School of Athens", "Raphael", 32.99, 10), 
("prints", "Night Watch", "Rembrandt", 80.99, 15), 
("prints", "Beheading of Saint John the Baptist", "Caravaggio", 19.99, 6), 
("prints", "Girl with a Pearl Earring", "Johannes Vermeer", 52.99, 14), 
("prints", "Guernica", "Pablo Picasso", 50.99, 4), 
("prints", "The Last Supper", "Leonardo da Vinci", 89.99, 16), 
("prints", "The Creation of Adam", "Michelangelo", 26.99, 23), 
("prints", "Landscape with the Fall of Icarus", "Pieter Bruegel", 17.99, 32), 
("prints", "Starry Night", "Vincent Van Gogh", 50.99, 36), 
("prints", "Water Lilies", "Claude Monet", 52.99, 12), 
("prints", "The Scream", "Edvard Munch", 30.99, 23), 
("prints", "The Arnolfini Marriage", "Jan van Eyck", 45.99, 3), 
("prints", "Las Meninas", "Diego Valazquez", 82.99, 13), 
("prints", "The Third of May", "Francisco Goya", 23.99, 8), 
("prints", "Olympia", "Edouard Manet", 50.99, 12), 
("prints", "La Moulin de la Galette", "Pierre-Auguste Renoir", 42.99, 22), 
("prints", "The Kiss", "Gustav Klimt", 75.99, 34), 
("prints", "Composition 8", "Wassily Kandinsky", 15.99, 15), 
("prints", "Cafe Terrace at Night", "Vincent Van Gogh", 42.99, 28), 
("prints", "Portrait de L’Artiste Sans Barbe", "Vincent Van Gogh", 62.99, 34), 
("prints", "Portrait of Dora Maar", "Pablo Picasso", 30.99, 14), 
("prints", "The Persistence of Memory", "Salvador Dali", 47.99, 6), 
("prints", "Whistler’s Mother", "James McNeill Whistler", 60.99, 28), 
("prints", "The Flower Carrier", "Diego Rivera", 12.99, 19), 
("prints", "American Gothic", "Grant Wood", 92.99, 17), 
("prints", "The Dance", "Henri Matisse", 51.99, 46), 
("prints", "A Sunday Afternoon on the Island of La Grande Jatte", "Georges Suerat", 80.99, 15), 
("prints", "Massacre of the Innocents", "Peter Paul Rubens", 46.99, 15), 
("prints", "Royal Red and Blue", "Mark Rothko", 23.99, 18), 
("prints", "The Son of Man", "Rene Magrittees", 35.99, 11), 
("prints", "No.5, 1948", "Jackson Pollock", 19.99, 10), 
("prints", "Portrait of Madame Recamier", "Jacques-Louis David", 99.99, 14), 
("prints", "The Birth of Venus", "Sandro Botticelli", 39.99, 62);