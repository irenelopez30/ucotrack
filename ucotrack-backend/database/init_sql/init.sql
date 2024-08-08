-- Crear una base de datos llamada "UcoTrack"
CREATE DATABASE IF NOT EXISTS UcoTrack;

-- Usar la base de datos creada
USE UcoTrack;

-- Crear tabla para los usuarios
CREATE TABLE IF NOT EXISTS Usuarios (
    id VARCHAR(255) PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    correo VARCHAR(255) NOT NULL,
    contraseña VARCHAR(255) NOT NULL
);

-- Crear tabla para los trabajos de fin de grado (TFG)
CREATE TABLE IF NOT EXISTS TFG (
    id VARCHAR(255) PRIMARY KEY,
    id_profesor VARCHAR(255) NOT NULL,
    titulo VARCHAR(255) NOT NULL,
    año_academico VARCHAR(10) NOT NULL,
    descripcion TEXT,
    nombre_alumno VARCHAR(255) NOT NULL,
    correo_alumno VARCHAR(255),
    telefono_alumno VARCHAR(20),
    estado VARCHAR(20) NOT NULL,
    FOREIGN KEY (id_profesor) REFERENCES Usuarios(id)
);

-- Crear tabla para seguimientos de TFG
CREATE TABLE IF NOT EXISTS Seguimientos (
    id VARCHAR(255) PRIMARY KEY,
    id_tfg VARCHAR(255) NOT NULL,
    fecha DATE NOT NULL,
    informacion TEXT,
    FOREIGN KEY (id_tfg) REFERENCES TFG(id) ON DELETE CASCADE
);
