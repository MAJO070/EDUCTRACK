import bcrypt from 'bcryptjs'
import { pool } from './db.js'

async function crearUsuariosIniciales() {
    try {

        const passwordProfe = await bcrypt.hash('Profe123*', 10)
        const passwordAlumno = await bcrypt.hash('Alumno123*', 10)

        await pool.query(`
            INSERT INTO usuarios (nombre, correo, password_hash, rol)
            VALUES ($1, $2, $3, $4)
            ON CONFLICT (correo) DO NOTHING
              `, ['Prof.Maria Jose', 'profesor@edutrack.edu', passwordProfe, 'DOCENTE'])

              await pool.query(`
                INSERT INTO usuarios (nombre, correo, password_hash, rol)
                VALUES ($1, $2, $3, $4)
                ON CONFLICT (correo) DO NOTHING
               `, ['Carlos Mendoza', 'estudiante@edutrack.edu', passwordAlumno, 'ESTUDIANTE'])

               console.log('✅ ¡Usuarios iniciales creados con contraseñas encriptadas en Neon!')
               process.exit(0) 
             } catch (error) {
                console.error('Error creando usuarios:', error)
             process.exit(1)
            }
        }

        crearUsuariosIniciales()