import express from 'express'
import cors from 'cors'
import { pool } from './db.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const app = express()
const PUERTO = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

// 1. Grados Escolares (Colegio / Secundaria)
const cursos = [
    { id: 1, nombre: 'Grado 10°A', salon: 'Aula 201', jornada: 'Jornada Mañana' },
    { id: 2, nombre: 'Grado 11°B', salon: 'Aula 204', jornada: 'Jornada Mañana' }
]

// 2. Estudiantes del salón escolar
const estudiantes = [
    { id: 101, cursoId: 1, nombre: 'Carlos Mendoza', correo: 'carlos.mendoza@edutrack.edu', rol: 'Representante de Salón' },
    { id: 102, cursoId: 1, nombre: 'Laura Sánchez', correo: 'laura.sanchez@edutrack.edu', rol: 'Vigía Ambiental' },
    { id: 103, cursoId: 1, nombre: 'Andrés Gómez', correo: 'andres.gomez@edutrack.edu', rol: 'Estudiante' },
    { id: 201, cursoId: 2, nombre: 'Valentina Ríos', correo: 'valentina.rios@edutrack.edu', rol: 'Líder Académica' }
]

// 3. Tareas y evidencias escolares
const actividades = [
  {
    id: 1,
    cursoId: 1,
    materia: '📐 Matemáticas',
    titulo: 'Taller 1: Ecuaciones Trigonométricas y Razones',
    fechaLimite: '2026-10-22',
    estado: 'Calificado',
    comentario: 'Excelente resolución paso a paso. Nota: 5.0.'
  },
  {
    id: 2,
    cursoId: 1,
    materia: '📖 Español y Literatura',
    titulo: 'Ensayo Literario: Análisis de Cien Años de Soledad',
    fechaLimite: '2026-10-26',
    estado: 'Entregado',
    comentario: 'Recibido a tiempo. La profesora María José está revisando tu ensayo.'
  },
  {
    id: 3,
    cursoId: 1,
    materia: '🔬 Ciencias Naturales',
    titulo: 'Informe de Laboratorio: Fotosíntesis en Células Vegetales',
    fechaLimite: '2026-11-03',
    estado: 'Pendiente',
    comentario: 'Recuerda adjuntar las fotos de las muestras vistas al microscopio en PDF o imagen.'
  }
]

app.get('/', (req, res) => {
    res.send('Servidor Eductrack funcionando correctamente 🚀')
})

app.get('/api/cursos', (req, res) => {
    res.json(cursos)
})

app.get('/api/estudiantes', (req, res) => {
    res.json(estudiantes)
})

app.get('/api/actividades', (req, res) => {
    res.json(actividades)
})

// 3. GET: Obtener todas las calificaciones
app.get('/api/calificaciones', async (req, res) => {
    try {
        const resultado = await pool.query('SELECT * FROM calificaciones ORDER BY id ASC')
        const notas = resultado.rows.map(n => ({
            id: n.id,
            nombre: n.actividad,
            actividad: n.actividad,
            nota: parseFloat(n.nota)
        }))
        res.json(notas)
    } catch (error) {
        console.error('Error al obtener calificaciones:', error)
        res.status(500).json({ error: 'Error del servidor al obtener notas' })
    }
})

app.post('/api/calificaciones', async (req, res) => {
    try {
        const { nota } = req.body
        const actividad = req.body.actividad || req.body.nombre

        if (!actividad || !nota) {
            return res.status(400).json({ error: 'La actividad y la nota son obligatorias' })
        }

        const notaNumero = parseFloat(nota)
        if (notaNumero < 1.0 || notaNumero > 5.0) {
            return res.status(400).json({ error: 'La nota debe estar entre 1.0 y 5.0' })
        }

        const consulta = `
         INSERT INTO calificaciones (estudiante_id, materia_id, actividad, nota)
         VALUES ($1, $2, $3, $4)
         RETURNING *
         `

         const resultado = await pool.query(consulta, [1, 1, actividad, notaNumero])
         const nueva = resultado.rows[0]

         res.status(201).json({
            id: nueva.id,
            nombre: nueva.actividad,
            actividad: nueva.actividad,
            nota: parseFloat(nueva.nota)
         })
    } catch (error) {
        console.error('Error al guardar calificacion:', error)
        res.status(500).json({ error: 'Error del servidor al guardar nota '})
    }
})

app.delete('/api/calificaciones/:id', async (req, res) => {
    try {
        const { id } = req.params

        const resultado = await pool.query('DELETE FROM calificaciones WHERE id = $1 RETURNING *', [id])

        if (resultado.rowCount === 0) {
            return res.status(404).json({ error: 'Calificacion no encontrada '})
        }

        res.json({ mensaje: 'Calificacion eliminada correctamente de la base de datos', idEliminado: Number(id) })
    } catch (error) {
        console.error('Error al eliminar calificacion:', error)
        res.status(500).json({ error: 'Error del servidor al eliminar nota' })
    }
})

// 4. PUT: Actualizar una calificación (Completar CRUD para el SENA)
app.put('/api/calificaciones/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { nota, actividad } = req.body

        if (!actividad || !nota) {
            return res.status(400).json({ error: 'La actividad y la nota son obligatorias' })
        }

        const notaNumero = parseFloat(nota)
        if (notaNumero < 1.0 || notaNumero > 5.0) {
            return res.status(400).json({ error: 'La nota debe estar entre 1.0 y 5.0' })
        }

        const consulta = `
            UPDATE calificaciones 
            SET actividad = $1, nota = $2
            WHERE id = $3
            RETURNING *
        `
        const resultado = await pool.query(consulta, [actividad, notaNumero, id])

        if (resultado.rowCount === 0) {
            return res.status(404).json({ error: 'Calificación no encontrada para actualizar' })
        }

        const actualizada = resultado.rows[0]
        res.json({
            id: actualizada.id,
            nombre: actualizada.actividad,
            actividad: actualizada.actividad,
            nota: parseFloat(actualizada.nota),
            mensaje: 'Calificación actualizada con éxito'
        })
    } catch (error) {
        console.error('Error al actualizar calificacion:', error)
        res.status(500).json({ error: 'Error del servidor al actualizar nota' })
    }
})

// 5. AUTH: Registro de Usuario (Cerrado por seguridad - Solo equipo autorizado)
app.post('/api/auth/register', async (req, res) => {
    return res.status(403).json({ 
        error: 'El registro público está cerrado. Solo María José Grijalba y José Antonio Quintero tienen cuentas autorizadas en el sistema.' 
    })
})

// 6. AUTH: Inicio de Sesión (Login) con Verificación de Hash y Acceso Exclusivo
app.post('/api/auth/login', async (req, res) => {
    try {
        const { correo, password } = req.body

        if (!correo || !password) {
            return res.status(400).json({ error: 'Debes ingresar correo y contraseña' })
        }

        const correoNormalizado = correo.toLowerCase().trim()
        const USUARIOS_AUTORIZADOS = [
            'maria.grijalba@edutrack.edu',
            'jose.quintero@edutrack.edu'
        ]

        if (!USUARIOS_AUTORIZADOS.includes(correoNormalizado)) {
            return res.status(403).json({ 
                error: 'Acceso restringido: Solo el equipo oficial del proyecto (María José Grijalba y José Antonio Quintero) tiene autorización para ingresar.' 
            })
        }

        const resultado = await pool.query('SELECT * FROM usuarios WHERE correo = $1', [correoNormalizado])

        if (resultado.rows.length === 0) {
            return res.status(401).json({ error: 'Credenciales incorrectas' })
        }

        const usuario = resultado.rows[0]
        const passwordValida = await bcrypt.compare(password, usuario.password_hash)

        if (!passwordValida) {
            return res.status(401).json({ error: 'Credenciales incorrectas' })
        }

        const token = jwt.sign(
            { id: usuario.id, correo: usuario.correo, rol: usuario.rol },
            process.env.JWT_SECRET || 'clave_secreta_edutrack_2026',
            { expiresIn: '24h' }
        )

        res.json({
            mensaje: '¡Inicio de sesión exitoso! 🎉',
            token,
            usuario: {
                id: usuario.id,
                nombre: usuario.nombre,
                correo: usuario.correo,
                rol: usuario.rol
            }
        })
    } catch (error) {
        console.error('Error en el login:', error)
        res.status(500).json({ error: 'Error del servidor en el inicio de sesión' })
    }
})


app.listen(PUERTO, () => {
    console.log(`Servidor Eductrack escuchando en https://localhost:${PUERTO}`) 
})                                                                                      