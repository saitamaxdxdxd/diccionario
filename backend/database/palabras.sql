CREATE DATABASE diccionario;

CREATE TABLE palabras(
    _id VARCHAR(24) PRIMARY KEY, 
    definicion VARCHAR(5000) NOT NULL, 
    etimologia VARCHAR(5000) NOT NULL,
    palabra VARCHAR(50) NOT NULL
);