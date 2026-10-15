function Resumen({ notas }) {

    const suma = notas.reduce((acumulado, item) => acumulado + item.nota, 0)
    
    const promedio = notas.length > 0 ? (suma / notas.length).toFixed(2) : 0

    const aprobado = promedio >= 3.0

    return (
        <div className="tarjeta tarjeta-resumen">
            <h2>Resumen del estudiante</h2>
            <p>Total de Actividades: <strong>{notas.length}</strong></p>
            <p className="promedio-texto">
                Promedio: <strong>{promedio}</strong>
            </p>
            <p className={`estado ${aprobado ? 'aprobado' : 'reprobado'}`}>
                Estado: {aprobado ? 'APROBADO 🎉' : 'EN RIESGO ⚠️'}
            </p>
        </div>
    )
}

export default Resumen 