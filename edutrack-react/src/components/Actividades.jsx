import { useState } from 'react'

function Actividades({ lista }) {
  // Guardamos las entregas que el estudiante va haciendo
  const [entregas, setEntregas] = useState({})
  const [archivosSeleccionados, setArchivosSeleccionados] = useState({})

  // Cuando el estudiante selecciona un archivo (PDF, Imagen o Video)
  const manejarArchivo = (actividadId, e) => {
    const archivo = e.target.files[0]
    if (archivo) {
      setArchivosSeleccionados({
        ...archivosSeleccionados,
        [actividadId]: archivo
      })
    }
  }

  // Cuando el estudiante hace clic en "Entregar Tarea"
  const enviarTarea = (actividadId) => {
    const archivo = archivosSeleccionados[actividadId]
    if (!archivo) {
      alert('Por favor selecciona un archivo (PDF, Imagen o Video) antes de entregar.')
      return
    }

    setEntregas({
      ...entregas,
      [actividadId]: {
        entregado: true,
        nombreArchivo: archivo.name,
        tamano: (archivo.size / (1024 * 1024)).toFixed(2) + ' MB',
        tipo: archivo.type.includes('video') ? '🎥 Video' : archivo.type.includes('image') ? '🖼️ Imagen' : '📄 Documento PDF',
        fecha: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    })
  }

  return (
    <div className="seccion-evidencias-escolar">
      <div className="encabezado-evidencias">
        <h2>📂 Tareas Escolares y Evidencias</h2>
        <p>Adjunta tus trabajos en PDF, imágenes o videos de exposiciones</p>
      </div>

      <div className="lista-actividades">
        {lista.map(act => {
          const entregaActual = entregas[act.id]
          const archivoActual = archivosSeleccionados[act.id]

          return (
            <div key={act.id} className="tarjeta-actividad-entrega">
              <div className="encabezado-actividad">
                <div>
                  <span className="materia-tag">{act.materia || 'Materia Escolar'}</span>
                  <h3 className="titulo-actividad">{act.titulo}</h3>
                </div>
                <span className={`badge-estado ${entregaActual ? 'entregado' : act.estado.toLowerCase()}`}>
                  {entregaActual ? 'Entregado ✅' : act.estado}
                </span>
              </div>

              <p className="fecha-limite">📅 <strong>Fecha Límite:</strong> {act.fechaLimite}</p>
              
              {/* Retroalimentación del docente */}
              <div className="caja-comentario">
                <strong>💬 Nota del Profesor:</strong>
                <p className="texto-comentario">"{act.comentario}"</p>
              </div>

              {/* Zona de Entrega de Archivos */}
              <div className="zona-subida-archivo">
                {entregaActual ? (
                  <div className="confirmacion-entrega">
                    <p className="texto-confirmado">🎉 <strong>¡Trabajo enviado con éxito!</strong></p>
                    <p className="detalle-archivo">
                      {entregaActual.tipo}: <strong>{entregaActual.nombreArchivo}</strong> ({entregaActual.tamano})
                    </p>
                    <small>Enviado el: {entregaActual.fecha}</small>
                  </div>
                ) : (
                  <div className="formulario-subida">
                    <label className="label-adjuntar">
                      📎 <strong>Adjuntar evidencia (PDF, Video MP4 o Imagen):</strong>
                    </label>

                    <div className="fila-inputs-archivo">
                      <input 
                        type="file" 
                        accept=".pdf, .docx, .png, .jpg, .jpeg, .mp4, .mov"
                        onChange={(e) => manejarArchivo(act.id, e)}
                        className="input-file-custom"
                      />

                      <button 
                        type="button" 
                        onClick={() => enviarTarea(act.id)}
                        className="btn-enviar-evidencia"
                        disabled={!archivoActual}
                      >
                        Subir Entrega ➔
                      </button>
                    </div>

                    {archivoActual && (
                      <p className="archivo-listo">
                        Listo para enviar: <strong>{archivoActual.name}</strong>
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Actividades