# 🎓 EduTrack API - Servicios Web y Gestión Académica

**Evidencia de Desempeño:** `GA7-220501096-AA5-EV03_ITC_ Diseño y desarrollo de servicios web - proyecto`  
**Programa:** Análisis y Desarrollo de Software (ADSO) - SENA  
**Integrantes del Proyecto:**
- María José Grijalba Torres
- José Antonio Quintero Herrera

---

## 📌 1. Descripción General del Proyecto
EduTrack es una API RESTful desarrollada para la gestión, seguimiento académico y calificaciones de instituciones educativas de secundaria/bachillerato (Colegio). Proporciona servicios web seguros para autenticación de usuarios con contraseñas encriptadas, registro de notas escolares con validación y consulta de asignaturas y salones.

---

## 🚀 2. Stack Tecnológico
- **Entorno de Ejecución:** Node.js (v22.x)
- **Framework Web:** Express.js
- **Base de Datos:** PostgreSQL en la Nube (AWS Neon Cloud)
- **Seguridad y Criptografía:** Bcryptjs (Hashing con Salt) y JSON Web Tokens (JWT)
- **Cliente HTTP / Integración:** CORS y pg (node-postgres Connection Pool)
- **Control de Versiones:** Git & GitHub

---

## 📂 3. Estructura del Proyecto

```text
edutrack-backend/
├── db.js             # Conexión al grupo de conexiones (Pool) de PostgreSQL
├── index.js          # Servidor Express, definición de rutas y lógica de controladores
├── seed.js           # Script de inicialización de usuarios con contraseñas encriptadas
├── schema.sql        # Modelo relacional SQL (Tablas grados, estudiantes, materias, usuarios, calificaciones)
├── .env              # Variables de entorno seguras (DATABASE_URL, JWT_SECRET)
└── package.json      # Dependencias y scripts de ejecución
```

---

## 📑 4. Documentación de Endpoints (API REST)

### 🔐 Módulo de Autenticación (`/api/auth`)

| Método | Endpoint | Descripción | Parámetros de Entrada (Body JSON) | Respuesta Exitosa |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Registrar nuevo usuario en BD | `{ "nombre", "correo", "password", "rol" }` | `201 Created` + Datos de usuario |
| `POST` | `/api/auth/login` | Iniciar sesión y validar Hash | `{ "correo", "password" }` | `200 OK` + Token JWT + Datos |

---

### 📊 Módulo de Calificaciones (`/api/calificaciones`) - CRUD Completo

| Método | Endpoint | Descripción | Parámetros | Código HTTP |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/calificaciones` | Consultar todas las notas de PostgreSQL | Ninguno | `200 OK` |
| `POST` | `/api/calificaciones` | Crear calificación (Valida escala 1.0 - 5.0) | `{ "actividad", "nota" }` | `201 Created` |
| `PUT` | `/api/calificaciones/:id` | Actualizar una calificación existente | URL `:id`, `{ "actividad", "nota" }` | `200 OK` |
| `DELETE` | `/api/calificaciones/:id` | Eliminar calificación de la base de datos | URL `:id` | `200 OK` |

---

### 🏫 Módulo Académico Escolar

| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| `GET` | `/api/cursos` | Lista de Grados Escolares (10°A, 11°B) |
| `GET` | `/api/estudiantes` | Lista de Estudiantes y roles |
| `GET` | `/api/actividades` | Lista de Tareas y Evidencias escolares |

---

## ⚙️ 5. Instrucciones de Instalación y Ejecución

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/MAJO070/EDUCTRACK.git
   ```

2. **Instalar dependencias:**
   ```bash
   cd edutrack-backend
   npm install
   ```

3. **Configurar el archivo `.env`:**
   Crear un archivo `.env` en la raíz de `edutrack-backend` con la cadena de conexión a PostgreSQL:
   ```env
   DATABASE_URL=tu_cadena_de_conexion_neon_postgres
   PORT=3000
   JWT_SECRET=clave_secreta_edutrack_2026
   ```

4. **Inicializar usuarios de prueba:**
   ```bash
   node seed.js
   ```

5. **Iniciar el servidor en modo desarrollo:**
   ```bash
   npm run dev
   ```
   *El servidor quedará escuchando en `http://localhost:3000`*
