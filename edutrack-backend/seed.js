import bcrypt from 'bcryptjs'
import { pool } from './db.js'

async function crearUsuariosIniciales() {
    try {

        const passwordProfe = await bcrypt.hash('Profe123*', 10)
        const passwordAlumno = await bcrypt.hash('Alumno123*', 10)

    // 2. Insertar Docente (María José)
    await pool.query(`
      INSERT INTO usuarios (id, nombre, correo, password_hash, rol)
      VALUES (1, 'María José Grijalba', 'maria.grijalba@edutrack.edu', $1, 'DOCENTE')
      ON CONFLICT (id) DO UPDATE SET 
        nombre = EXCLUDED.nombre, 
        correo = EXCLUDED.correo, 
        password_hash = EXCLUDED.password_hash,
        rol = EXCLUDED.rol
    `, [passwordProfe])

    // 3. Insertar Estudiante (José Antonio)
    await pool.query(`
      INSERT INTO usuarios (id, nombre, correo, password_hash, rol)
      VALUES (2, 'José Antonio Quintero', 'jose.quintero@edutrack.edu', $1, 'ESTUDIANTE')
      ON CONFLICT (id) DO UPDATE SET 
        nombre = EXCLUDED.nombre, 
        correo = EXCLUDED.correo, 
        password_hash = EXCLUDED.password_hash,
        rol = EXCLUDED.rol
    `, [passwordAlumno])

               console.log('✅ ¡Usuarios iniciales creados con contraseñas encriptadas en Neon!')
               process.exit(0) 
             } catch (error) {
                console.error('Error creando usuarios:', error)
             process.exit(1)
            }
        }

        crearUsuariosIniciales()