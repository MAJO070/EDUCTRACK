CREATE TABLE grados (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    salon VARCHAR(50) NOT NULL,
    jornada VARCHAR(30) DEFAULT 'Mañana'
);

CREATE TABLE estudiantes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    rol VARCHAR(50) DEFAULT 'Estudiante',
    grado_id INT REFERENCES grados(id) ON DELETE CASCADE
);

CREATE TABLE materias (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    profesor VARCHAR(100) NOT NULL
);

CREATE TABLE calificaciones (
    id SERIAL PRIMARY KEY, 
    estudiante_id INT REFERENCES estudiantes(id) ON DELETE CASCADE,
    materia_id INT REFERENCES materias(id) ON DELETE CASCADE,
    actividad VARCHAR(100) NOT NULL,
    nota NUMERIC(3, 1) NOT NULL CHECK (nota >= 1.0 AND nota <= 5.0),
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO grados (nombre, salon, jornada) VALUES
('Grado 10°A', 'Aula 201', 'Mañana'),
('Grado 11°A', 'Aula 204', 'Mañana');

INSERT INTO materias (nombre, profesor) VALUES
('Matematicas', 'Prof.Martinez'),
('Español', 'Prof.Maria Jose');

INSERT INTO estudiantes (nombre, correo, rol, grado_id) VALUES
('Carlos Mendoza', 'carlos-mendoza@edutrack.edu', 'Representante de Salon', 1);

INSERT INTO calificaciones (estudiante_id, materia_id, actividad, nota) VALUES
(1, 1, 'Taller 1: Ecuaciones y TRigonometria', 4.8);

