function InicioEstudiante({ usuario, setModuloActivo }) {
    
    const materias = [
        { id: 1, nombre: 'Matematicas', docente: 'Prof. Martinez', color: '#3b82f6', icono: '📐'},
        { id: 2, nombre: 'Español y Literatura', docente: 'Prof. Gomez', color: '#ec4899', icono: '📖'},
        { id: 3, nombre: 'Ciencias Naturales', docente: 'Prof. Rivas', color: '#10b981', icono: '🔬'},
        { id: 4, nombre: 'Ingles', docente: 'Prof. smith', color: '#8b5cf6', icono: '🌍'},
        { id: 5, nombre: 'Tecnologia e Informatica', docente: 'Prof. Palacios', color: '#06b6d4', icono: '💻'},
        
    ]

    return (
        <div className="dasboard-escolar">
            <div className="saludo-escolar">
                <h2>!Hola de nuevo, {usuario?.nombre}! <span className="mano-saluda">👋</span></h2>
                <p className="subtitulo-escolar">Año Lectivo 2026 • <strong>Grado 10° A</strong> • Jornada Mañana</p>
            </div>
            <span className="badge-periodo">1° Periodo Academico</span>
        
      
      <div className="grid-metricas-escolares">
        <div className="tarjeta-metrica">
            <div className="icono-metrica">📊</div>
            <div>
                <span className="label-metrica">Promedio General</span>
                <p className="valor-metrica">4.5 <span className="estado-ok">Aprobando</span></p>
            </div>
        </div>

        <div className="tarjeta-metrica">
            <div className="icono-metrica">⏰</div>
            <div>
                <span className="label-metrica">Proxima Clase Hoy</span>
                <p className="valor-metrica">7:00 AM <span className="estado-alerta">Matematicas (Salon 201)</span></p>
            </div>
        </div>
      </div>

      <div className="seccion-materias">
        <div className="barra-titulo-materias">
            <h3>Mis Asignaturas</h3>
            <p>Haz clic en una materia para ver sus tareas y notas</p>
        </div>

        <div className="grid-materias">
            {materias.map(materia => (
                <div
                 key={materia.id}
                 className="tarjeta-materia"
                 onClick={() => setModuloActivo('boletin')}
                 >
                    <div className="icono-materia" style={{ backgroundColor: `${materia.color}20`, color: materia.color }}>
                        {materia.icono}
                        </div>
                        <h4>{materia.nombre}</h4>
                        <p className="docente-materia">{materia.docente}</p>
                        <span className="ver.materia-link">Ver boletin y tareas  ➔</span>
                        </div>
            ))}
      </div>
      </div>
    
</div>
    )
}

export default InicioEstudiante