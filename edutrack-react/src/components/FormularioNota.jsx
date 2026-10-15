import { useState } from 'react'

function FormularioNota({ onAgregarNota }) {
    const [nombre, setNombre] = useState('')
    const [nota, setNota] = useState('')

    const manejarEnvio = (e) => {
        e.preventDefault()


        if (!nombre.trim() || nota === '') {
            alert('Por favor completa todos los campos.')
        return
    }   

        const valorNota = parseFloat(nota)
        if(valorNota < 0 || valorNota > 5) {
            alert('La calificacion debe estar entre 0.0 y 5.0')
            return
        }

        onAgregarNota({
            nombre: nombre,
            nota: valorNota
        })

        setNombre('')
        setNota('')
    }

    return (
        <div className="tarjeta tarjeta-formulario">
            <h2>Registrar Nueva Calificacion</h2>
            <form onSubmit={manejarEnvio}>
                <div className="campo">
                    <label htmlFor="nombre">Nombre de la Actividad</label>
                    <input
                      id="nombre"
                      type="text"
                      placeholder="Evaluacion Final"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      />
                </div>

                <div className="campo">
                <label htmlFor="nota">Nota (0.0 a 5.0)</label>
                <input 
                 id="nota"
                 type="number"
                 step="0.1"
                 min="0"
                 max="5"
                 placeholder="4.8"
                 value={nota}
                 onChange={(e) => setNota(e.target.value)}
                 />
                 </div>

                 <button type="submit" className="btn-guardar">
                    Guardar Calificacion 
                 </button>
            </form>
        </div>
    )
}

export default FormularioNota
 
