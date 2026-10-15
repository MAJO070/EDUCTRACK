function TablaNotas({ notas, onEliminarNota }) {
    return (
        <div className="tarjeta">
            <h2>Listado de Notas</h2>
            <table className="tabla-notas">
                <thead>
                    <tr>
                        <th>Taller / Actividad</th>
                        <th>Calificacion</th>
                    </tr>
                </thead>
                <tbody>
                    {notas.map((item, index) => (
                        <tr key={index}>
                            <td>{item.nombre}</td>
                            <td>{item.nota}</td>
                            <td>
                                <button
                                type="button"
                                className="btn-eliminar"
                                onClick={() => onEliminarNota(index)} 
                                >
                                   ✕
                                    </button>   
                            </td>
                        </tr>
                    ))}  
                </tbody>
            </table>
        </div>
    )
}

export default TablaNotas 