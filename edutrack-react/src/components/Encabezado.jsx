function Encabezado({ profesor, materia }) {
    return (
        <header>
            <h1>Eductrack - Sistema de Calificaciones</h1>
            <p>Profesor(a): <strong>{profesor}</strong> | Materia: <strong>{materia}</strong></p>
        </header>
    )
}

export default Encabezado 