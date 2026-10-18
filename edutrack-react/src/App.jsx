import { useState, useEffect } from 'react'
import './App.css'
import Encabezado from './components/Encabezado'
import TablaNotas from './components/TablaNotas'
import Resumen from './components/Resumen'
import FormularioNota from './components/FormularioNota'
import Actividades from './components/Actividades'
import Login from './components/login'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import InicioEstudiante from './components/InicioEstudiante'
import Horario from './components/Horario'
import MiSalon from './components/MiSalon'

const BACKEND_URL = 'https://edutrack-api-f6w2.onrender.com'

function App() {
  // Estados para datos del Backend
  const [cursos, setCursos] = useState([])
  const [estudiantes, setEstudiantes] = useState([])
  const [cursoSeleccionado, setCursoSeleccionado] = useState(1)
  const [estudianteActivo, setEstudianteActivo] = useState(null)
  const [actividades, setActividades] = useState([])
  const [moduloActivo, setModuloActivo] = useState('inicio')
  const [modoOscuro, setModoOscuro] = useState(true)

  // Estado del usuario autenticado (null = no ha iniciado sesión)
  const [usuario, setUsuario] = useState(null)

  // Estado de las notas (con persistencia en localStorage)
  const [talleres, setTalleres] = useState([]) 

  // Cargar datos iniciales desde el servidor Backend en la nube (Render)
  useEffect(() => {
    // 1. Cursos
    fetch(`${BACKEND_URL}/api/cursos`)
      .then(res => res.json())
      .then(data => setCursos(data))
      .catch(err => console.error('Error cargando cursos:', err))

    // 2. Estudiantes
    fetch(`${BACKEND_URL}/api/estudiantes`)
      .then(res => res.json())
      .then(data => {
        setEstudiantes(data)
        if (data.length > 0) setEstudianteActivo(data[0])
      })
      .catch(err => console.error('Error cargando estudiantes:', err))

    // 3. Actividades
    fetch(`${BACKEND_URL}/api/actividades`)
      .then(res => res.json())
      .then(data => setActividades(data))
      .catch(err => console.error('Error cargando actividades:', err))

    // 4. Calificaciones
    fetch(`${BACKEND_URL}/api/calificaciones`)
      .then(res => res.json())
      .then(data => setTalleres(data))
      .catch(err => console.error('Error cargando calificaciones:', err))

  }, [])

  // Sincronizar notas con localStorage
  useEffect(() => {
    localStorage.setItem('eductrack_talleres', JSON.stringify(talleres))
  }, [talleres])

  // Lógica de inicio de sesión con Backend PostgreSQL y Bcrypt en Render
  const iniciarSesion = async (correo, password) => {
    try {
      const respuesta = await fetch(`${BACKEND_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo, password })
      })

      const datos = await respuesta.json()

      if (!respuesta.ok) {
        alert(datos.error || 'Credenciales incorrectas')
        return
      }

      // Guardar sesión del usuario autenticado
      setUsuario(datos.usuario)
      if (datos.token) {
        localStorage.setItem('edutrack_token', datos.token)
      }
    } catch (error) {
      console.error('Error al conectar con el servidor:', error)
      alert('No se pudo conectar con el servidor en la nube. Revisa tu conexión.')
    }
  }

  const cerrarSesion = () => {
    setUsuario(null)
  }

  // Funciones para notas
  const agregarNota = (nuevaNota) => {
    fetch(`${BACKEND_URL}/api/calificaciones`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(nuevaNota) 
    })
    .then(res => res.json())
    .then(notaGuardada => {
      setTalleres([...talleres, notaGuardada])
    })
    .catch(err => console.error('Error al guardar nota en el servidor', err))
  }

  const eliminarNota = (idOIndice) => {
    const notaAEliminar = talleres[idOIndice] || talleres.find(t => t.id === idOIndice)
    const id = notaAEliminar?.id || idOIndice

    fetch(`${BACKEND_URL}/api/calificaciones/${id}`, {
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(() => {
      setTalleres(talleres.filter(t => t.id !== id && t !== notaAEliminar))
    })
  }

  // Filtrar aprendices según el curso seleccionado
  const estudiantesFiltrados = estudiantes.filter(e => e.cursoId === Number(cursoSeleccionado))

  return (
    <div className={`contenedor-app ${modoOscuro ? 'modo-oscuro' : 'modo-claro'}`}>
      {!usuario ? (
        // Pantalla de Login si no hay sesión
        <Login onIniciarSesion={iniciarSesion} />
      ) : (
        // Layout de Dashboard completo (Sidebar + Navbar + Módulos)
        <div className="layout-dashboard">
          {/* Barra Lateral izquierda */}
          <Sidebar moduloActivo={moduloActivo} setModuloActivo={setModuloActivo} />

          {/* Área de Contenido a la derecha */}
          <div className="area-principal">
            {/* Barra superior con correo, avatar y botón salir */}
            <Navbar
             usuario={usuario}
             onCerrarSesion={cerrarSesion}
             modoOscuro={modoOscuro}
             setModoOscuro={setModoOscuro}
             />
            <div className="contenido-modulo">
              {/* VISTA 1: Inicio (Banner azul de bienvenida y accesos rápidos) */}
              {moduloActivo === 'inicio' && (
                <InicioEstudiante usuario={usuario} setModuloActivo={setModuloActivo} />
              )}

              {/* VISTA 2: Boletín de Notas */}
              {moduloActivo === 'boletin' && (
                <div className="seccion-calificaciones">
                  {(usuario.rol === 'DOCENTE' || usuario.rol === 'PROFESOR') && (
                    <FormularioNota onAgregarNota={agregarNota} />
                  )}
                  <main className="panel-principal">
                    <Resumen notas={talleres} />
                    <TablaNotas notas={talleres} onEliminarNota={eliminarNota} />
                  </main>
                </div>
              )}

              {/* VISTA 3: Mi Salón y Compañeros (Colegio Grado 10°A) */}
              {moduloActivo === 'salon' && (
                <MiSalon />
              )}

              {/* VISTA 4: Evidencias y Actividades */}
              {moduloActivo === 'evidencias' && (
                <Actividades lista={actividades} />
              )}

              {/* VISTA 5: Horario Escolar */}
              {moduloActivo === 'horario' && (
                <Horario />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )

}
export default App