-- ====================================================
-- Fine Art Mart Node.js and MySQL CLI store inventory app
-- ©2018 Richard Trevillian
-- University of Richmond (Virginia)
-- Full Stack Developer Bootcamp (July 2018)
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
VALUES ("prints", "Monalisa", "Leonardo da Vinci", 99.99, 50), 
("prints", "School of Athens", "Raphael", 32.50, 10), 
("prints", "Night Watch", "Rembrandt", 80.00, 15), 
("prints", "Beheading of Saint John the Baptist", "Caravaggio", 19.99, 6), 
("prints", "Girl with a Pearl Earring", "Johannes Vermeer", 52.50, 150), 
("prints", "Guernica", "Pablo Picasso", 50.00, 82), 
("prints", "The Last Supper", "Leonardo da Vinci", 89.99, 16), 
("prints", "The Creation of Adam", "Michelangelo", 26.50, 52), 
("prints", "Landscape with the Fall of Icarus", "Pieter Bruegel", 17.99, 43), 
("prints", "Starry Night", "Vincent Van Gogh", 150.00, 94), 
("prints", "Water Lilies", "Claude Monet", 52.99, 12), 
("prints", "The Scream", "Edvard Munch", 30.50, 23), 
("prints", "The Arnolfini Marriage", "Jan van Eyck", 45.00, 81), 
("prints", "Las Meninas", "Diego Valazquez", 82.99, 46), 
("prints", "The Third of May", "Francisco Goya", 23.00, 8), 
("prints", "Olympia", "Edouard Manet", 50.00, 12), 
("prints", "La Moulin de la Galette", "Renoir", 42.99, 36), 
("prints", "The Kiss", "Gustav Klimt", 75.50, 76), 
("prints", "Composition 8", "Kandinsky", 15.00, 15), 
("prints", "Cafe Terrace at Night", "Vincent Van Gogh", 42.99, 28), 
("prints", "Portrait de L’Artiste Sans Barbe", "Vincent Van Gogh", 62.99, 48), 
("prints", "Portrait of Dora Maar", "Pablo Picasso", 30.00, 14), 
("prints", "The Persistence of Memory", "Salvador Dali", 47.99, 36), 
("prints", "Whistler’s Mother", "James McNeill Whistler", 60.00, 62), 
("prints", "The Flower Carrier", "Diego Rivera", 12.99, 19), 
("prints", "American Gothic", "Grant Wood", 92.00, 87), 
("prints", "The Dance", "Henri Matisse", 51.00, 46), 
("prints", "A Sunday Afternoon on the Island of La Grande Jatte", "Georges Suerat", 80.00, 68), 
("prints", "Massacre of the Innocents", "Peter Paul Rubens", 46.99, 22), 
("prints", "Royal Red and Blue", "Mark Rothko", 23.99, 35), 
("prints", "The Son of Man", "Rene Magrittees", 35.50, 15), 
("prints", "No.5, 1948", "Jackson Pollock", 9.99, 19), 
("prints", "Portrait of Madame Recamier", "Jacques-Louis David", 99.99, 15), 
("prints", "Dogs Playing Poker", "C.M. Coolidge", 25.99, 84), 
("prints", "The Birth of Venus", "Sandro Botticelli", 39.99, 62);
