import { useState } from 'react'

function Horario() {
  const [gradoSeleccionado, setGradoSeleccionado] = useState('10A')
  const [diaSeleccionado, setDiaSeleccionado] = useState('Lunes')

  const grados = [
    { id: '6A', nombre: 'Grado 6°A - Básica Secundaria' },
    { id: '8B', nombre: 'Grado 8°B - Básica Secundaria' },
    { id: '10A', nombre: 'Grado 10°A - Media Técnica' },
    { id: '11B', nombre: 'Grado 11°B - Promoción 2026' }
  ]

  const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes']

  // Horarios escolares organizados por grado y día
  const cronograma = {
    '10A': {
      'Lunes': [
        { hora: '06:30 - 07:30 AM', materia: 'Matemáticas', docente: 'Prof. Martínez', salon: 'Salón 201', tipo: 'clase', color: '#3b82f6' },
        { hora: '07:30 - 08:30 AM', materia: 'Español y Literatura', docente: 'Prof. Gómez', salon: 'Salón 104', tipo: 'clase', color: '#ec4899' },
        { hora: '08:30 - 09:30 AM', materia: 'Ciencias Naturales', docente: 'Prof. Rivas', salon: 'Laboratorio de Química', tipo: 'clase', color: '#10b981' },
        { hora: '09:30 - 10:00 AM', materia: '🥪 RECREO / DESCANSO', docente: 'Patio Central', salon: 'Zona de Cafetería', tipo: 'recreo', color: '#f59e0b' },
        { hora: '10:00 - 11:30 AM', materia: 'Tecnología e Informática', docente: 'Prof. María José', salon: 'Sala de Cómputo 1', tipo: 'clase', color: '#06b6d4' },
        { hora: '11:30 - 01:00 PM', materia: 'Educación Física', docente: 'Prof. Torres', salon: 'Canchas Deportivas', tipo: 'clase', color: '#84cc16' }
      ],
      'Martes': [
        { hora: '06:30 - 08:00 AM', materia: 'Física Clásica', docente: 'Prof. Rivas', salon: 'Salón 201', tipo: 'clase', color: '#6366f1' },
        { hora: '08:00 - 09:30 AM', materia: 'Inglés Avanzado', docente: 'Prof. Smith', salon: 'Laboratorio de Idiomas', tipo: 'clase', color: '#8b5cf6' },
        { hora: '09:30 - 10:00 AM', materia: '🥪 RECREO / DESCANSO', docente: 'Patio Central', salon: 'Zona de Cafetería', tipo: 'recreo', color: '#f59e0b' },
        { hora: '10:00 - 11:30 AM', materia: 'Filosofía y Ética', docente: 'Prof. Salazar', salon: 'Salón 102', tipo: 'clase', color: '#f43f5e' },
        { hora: '11:30 - 01:00 PM', materia: 'Química Orgánica', docente: 'Prof. Rivas', salon: 'Laboratorio de Química', tipo: 'clase', color: '#10b981' }
      ],
      'Miércoles': [
        { hora: '06:30 - 08:30 AM', materia: 'Tecnología e Informática', docente: 'Prof. María José', salon: 'Sala de Cómputo 1', tipo: 'clase', color: '#06b6d4' },
        { hora: '08:30 - 09:30 AM', materia: 'Matemáticas (Trigonometría)', docente: 'Prof. Martínez', salon: 'Salón 201', tipo: 'clase', color: '#3b82f6' },
        { hora: '09:30 - 10:00 AM', materia: '🥪 RECREO / DESCANSO', docente: 'Patio Central', salon: 'Zona de Cafetería', tipo: 'recreo', color: '#f59e0b' },
        { hora: '10:00 - 11:30 AM', materia: 'Ciencias Sociales e Historia', docente: 'Prof. Gómez', salon: 'Salón 105', tipo: 'clase', color: '#d97706' },
        { hora: '11:30 - 01:00 PM', materia: 'Artes y Dibujo Técnico', docente: 'Prof. Vargas', salon: 'Taller de Arte', tipo: 'clase', color: '#a855f7' }
      ],
      'Jueves': [
        { hora: '06:30 - 08:00 AM', materia: 'Inglés', docente: 'Prof. Smith', salon: 'Salón 205', tipo: 'clase', color: '#8b5cf6' },
        { hora: '08:00 - 09:30 AM', materia: 'Español (Comprensión Lectora)', docente: 'Prof. Gómez', salon: 'Salón 104', tipo: 'clase', color: '#ec4899' },
        { hora: '09:30 - 10:00 AM', materia: '🥪 RECREO / DESCANSO', docente: 'Patio Central', salon: 'Zona de Cafetería', tipo: 'recreo', color: '#f59e0b' },
        { hora: '10:00 - 12:00 PM', materia: 'Matemáticas y Cálculo', docente: 'Prof. Martínez', salon: 'Salón 201', tipo: 'clase', color: '#3b82f6' },
        { hora: '12:00 - 01:00 PM', materia: 'Dirección de Grupo y Convivencia', docente: 'Prof. María José', salon: 'Salón 201', tipo: 'clase', color: '#0ea5e9' }
      ],
      'Viernes': [
        { hora: '06:30 - 08:30 AM', materia: 'Laboratorio de Ciencias Integradas', docente: 'Prof. Rivas', salon: 'Laboratorio', tipo: 'clase', color: '#10b981' },
        { hora: '08:30 - 09:30 AM', materia: 'Emprendimiento y Proyecto', docente: 'Prof. Castro', salon: 'Salón 201', tipo: 'clase', color: '#eab308' },
        { hora: '09:30 - 10:00 AM', materia: '🥪 RECREO / DESCANSO', docente: 'Patio Central', salon: 'Zona de Cafetería', tipo: 'recreo', color: '#f59e0b' },
        { hora: '10:00 - 11:30 AM', materia: 'Educación Física y Deportes', docente: 'Prof. Torres', salon: 'Coliseo', tipo: 'clase', color: '#84cc16' },
        { hora: '11:30 - 01:00 PM', materia: 'Taller de Tecnología Web', docente: 'Prof. María José', salon: 'Sala de Cómputo 1', tipo: 'clase', color: '#06b6d4' }
      ]
    }
  }

  // Obtenemos las clases para el grado y día seleccionados (o clases por defecto)
  const clasesDelDia = cronograma[gradoSeleccionado]?.[diaSeleccionado] || cronograma['10A']['Lunes']

  return (
    <div className="seccion-horario-escolar">
      {/* Barra de Controles: Selector de Grados */}
      <div className="encabezado-horario">
        <div>
          <h2>⏰ Horario de Clases Escolar</h2>
          <p className="subtitulo-horario">Jornada Mañana (06:30 AM - 01:00 PM)</p>
        </div>

        <div className="selector-grado-wrapper">
          <label htmlFor="select-grado"><strong>Grado / Salón: </strong></label>
          <select 
            id="select-grado"
            value={gradoSeleccionado} 
            onChange={(e) => setGradoSeleccionado(e.target.value)}
            className="select-grado-custom"
          >
            {grados.map(g => (
              <option key={g.id} value={g.id}>{g.nombre}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Botones de Días de la Semana */}
      <div className="barra-dias-semana">
        {dias.map(dia => (
          <button
            key={dia}
            type="button"
            className={`btn-dia-semana ${diaSeleccionado === dia ? 'activo' : ''}`}
            onClick={() => setDiaSeleccionado(dia)}
          >
            {dia}
          </button>
        ))}
      </div>

      {/* Lista de Clases del Día */}
      <div className="lista-bloques-clase">
        {clasesDelDia.map((bloque, index) => (
          <div 
            key={index} 
            className={`tarjeta-bloque-clase ${bloque.tipo === 'recreo' ? 'bloque-recreo' : ''}`}
          >
            <div className="columna-hora">
              <span className="hora-texto">{bloque.hora}</span>
            </div>

            <div className="columna-info-clase">
              <div className="indicador-color" style={{ backgroundColor: bloque.color }}></div>
              <div>
                <h4 className="nombre-materia-horario">{bloque.materia}</h4>
                <p className="docente-salon">
                  👤 {bloque.docente} • 📍 <strong>{bloque.salon}</strong>
                </p>
              </div>
            </div>

            <div className="columna-badge">
              <span 
                className="badge-tipo-clase"
                style={{ 
                  backgroundColor: `${bloque.color}20`, 
                  color: bloque.color,
                  borderColor: `${bloque.color}40`
                }}
              >
                {bloque.tipo === 'recreo' ? '🥪 Pausa Activa' : 'En Aula'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Horario
