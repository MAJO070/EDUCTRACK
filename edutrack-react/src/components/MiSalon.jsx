import { useState } from 'react'

function MiSalon() {
  const [busqueda, setBusqueda] = useState('')

  // Información del salón escolar
  const infoSalon = {
    grado: 'Grado 10°A',
    jornada: 'Jornada Mañana',
    salon: 'Aula 201 (Piso 2)',
    directora: 'Prof. María José Grijalba',
    representante: 'Carlos Mendoza',
    totalEstudiantes: 8
  }

  // Lista de compañeros del salón con su número en la lista escolar
  const companeros = [
    { numero: 1, nombre: 'Andrés Felipe Gómez', correo: 'andres.gomez@edutrack.edu', rol: 'Estudiante', iniciales: 'AG' },
    { numero: 2, nombre: 'Carlos Mendoza', correo: 'carlos.mendoza@edutrack.edu', rol: 'Representante de Grupo ⭐', iniciales: 'CM' },
    { numero: 3, nombre: 'Daniela Rivas Morales', correo: 'daniela.rivas@edutrack.edu', rol: 'Estudiante', iniciales: 'DR' },
    { numero: 4, nombre: 'Laura Sofía Sánchez', correo: 'laura.sanchez@edutrack.edu', rol: 'Vigía Ambiental 🌿', iniciales: 'LS' },
    { numero: 5, nombre: 'Mateo Alejandro Torres', correo: 'mateo.torres@edutrack.edu', rol: 'Estudiante', iniciales: 'MT' },
    { numero: 6, nombre: 'Paula Andrea Castro', correo: 'paula.castro@edutrack.edu', rol: 'Líder de Deportes ⚽', iniciales: 'PC' },
    { numero: 7, nombre: 'Santiago Vargas Peña', correo: 'santiago.vargas@edutrack.edu', rol: 'Estudiante', iniciales: 'SV' },
    { numero: 8, nombre: 'Valentina Ríos Duque', correo: 'valentina.rios@edutrack.edu', rol: 'Líder Académica 📚', iniciales: 'VR' }
  ]

  // Filtro de búsqueda por nombre o correo
  const companerosFiltrados = companeros.filter(c => 
    c.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    c.correo.toLowerCase().includes(busqueda.toLowerCase())
  )

  return (
    <div className="seccion-salon-escolar">
      {/* 1. Tarjeta Informativa del Salón */}
      <div className="tarjeta-info-salon">
        <div className="bloque-grado-info">
          <span className="badge-salon-mini">Año Lectivo 2026</span>
          <h2>🏫 {infoSalon.grado} • {infoSalon.jornada}</h2>
          <p className="ubicacion-aula">📍 {infoSalon.salon}</p>
        </div>

        <div className="datos-directiva-salon">
          <div>
            <span className="label-directiva">Directora de Grupo:</span>
            <p className="valor-directiva">👩‍🏫 {infoSalon.directora}</p>
          </div>
          <div>
            <span className="label-directiva">Representante de Salón:</span>
            <p className="valor-directiva">⭐ {infoSalon.representante}</p>
          </div>
        </div>
      </div>

      {/* 2. Barra de Búsqueda y Conteo */}
      <div className="barra-busqueda-salon">
        <div>
          <h3>Lista de Compañeros de Clase ({companerosFiltrados.length})</h3>
          <p className="subtitulo-lista-alumnos">Compañeros matriculados oficialmente en el grado</p>
        </div>

        <input 
          type="text"
          placeholder="🔍 Buscar por nombre o correo..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="input-buscar-companero"
        />
      </div>

      {/* 3. Cuadrícula de Compañeros con Número de Lista */}
      <div className="grid-companeros-salon">
        {companerosFiltrados.map(alumno => (
          <div key={alumno.numero} className="tarjeta-companero">
            <span className="numero-lista">#{alumno.numero}</span>
            <div className="avatar-companero">{alumno.iniciales}</div>
            <div className="info-texto-companero">
              <h4 className="nombre-companero">{alumno.nombre}</h4>
              <p className="correo-companero">{alumno.correo}</p>
              <span className="badge-rol-escolar">{alumno.rol}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MiSalon
