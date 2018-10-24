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
)

INSERT INTO products (department, product_name, artist_name, retail_price, stock_quantity)
VALUES ("prints", "Monalisa", "Leonardo da Vinci", 99.99, 50), 
("prints", "School of Athens", "Raphael", 99.99, 50), 
("prints", "Night Watch", "Rembrandt", 99.99, 50), 
("prints", "Beheading of Saint John the Baptist", "Caravaggio", 99.99, 50), 
("prints", "Girl with a Pearl Earring", "Johannes Vermeer", 99.99, 50), 
("prints", "Guernica", "Pablo Picasso", 99.99, 50), 
("prints", "The Last Supper", "Leonardo da Vinci", 99.99, 50), 
("prints", "The Creation of Adam", "Michelangelo", 99.99, 50), 
("prints", "Landscape with the Fall of Icarus", "Pieter Bruegel", 99.99, 50), 
("prints", "Starry Night", "Vincent Van Gogh", 99.99, 50), 
("prints", "Water Lilies", "Claude Monet", 99.99, 50), 
("prints", "The Scream", "Edvard Munch", 99.99, 50), 
("prints", "The Arnolfini Marriage", "Jan van Eyck", 99.99, 50), 
("prints", "Las Meninas", "Diego Valazquez", 99.99, 50), 
("prints", "The Third of May", "Francisco Goya", 99.99, 50), 
("prints", "Olympia", "Edouard Manet", 99.99, 50), 
("prints", "La Moulin de la Galette", "Renoir", 99.99, 50), 
("prints", "The Kiss", "Gustav Klimt", 99.99, 50), 
("prints", "Composition 8", "Kandinsky", 99.99, 50), 
("prints", "Cafe Terrace at Night", "Vincent Van Gogh", 99.99, 50), 
("prints", "Portrait de L’Artiste Sans Barbe", "Vincent Van Gogh", 99.99, 50), 
("prints", "Portrait of Dora Maar", "Pablo Picasso", 99.99, 50), 
("prints", "The Persistence of Memory", "Salvador Dali", 99.99, 50), 
("prints", "Whistler’s Mother", "James McNeill Whistler", 99.99, 50), 
("prints", "The Flower Carrier", "Diego Rivera", 99.99, 50), 
("prints", "American Gothic", "Grant Wood", 99.99, 50), 
("prints", "The Dance", "Henri Matisse", 99.99, 50), 
("prints", "A Sunday Afternoon on the Island of La Grande Jatte", "Georges Suerat", 99.99, 50), 
("prints", "Massacre of the Innocents", "Peter Paul Rubens", 99.99, 50), 
("prints", "Royal Red and Blue", "Mark Rothko", 99.99, 50), 
("prints", "The Son of Man", "Rene Magrittees", 99.99, 50), 
("prints", "No.5, 1948", "Jackson Pollock", 99.99, 50), 
("prints", "Portrait of Madame Recamier", "Jacques-Louis David", 99.99, 50), 
("prints", "Dogs Playing Poker", "C.M. Coolidge", 99.99, 50), 
("prints", "The Birth of Venus", "Sandro Botticelli", 99.99, 50);
