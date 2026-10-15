import { useState, useEffect } from 'react'
import './App.css'
import Encabezado from './components/Encabezado'
import TablaNotas  from './components/TablaNotas' 
import Resumen from './components/Resumen'
import FormularioNota from './components/FormularioNota'


function App() {
  
  const [talleres, setTalleres] = useState(() => {
    const guardados = localStorage.getItem('eductrack_talleres')
    if (guardados) {
      return JSON.parse(guardados)
    }
  
  return [
    { nombre: 'Taller 1: Variables y Funciones', nota: 4.5 },
    { nombre: 'Taller 2: Estructuras de control', nota: 3.8},
    { nombre: 'Taller 3: Arreglos y Objetos', nota: 5.0},
  ]
})

useEffect(() => {
  localStorage.setItem('eductrack_talleres', JSON.stringify(talleres))
  }, [talleres])
  

  const agregarNota = (nuevaNota) => {
    setTalleres([...talleres,nuevaNota])
    }

    const eliminarNota = (indiceAborrar) => {
      const nuevasNotas = talleres.filter((_,index) => index !== indiceAborrar)
      setTalleres(nuevasNotas)
    }
  
  return (
    <div className='contenedor'>
      <Encabezado profesor="Maria Jose" materia="Logica y algoritmos" />

      <FormularioNota onAgregarNota={agregarNota} />

      <main className="panel-principal">
        <Resumen notas={talleres} />
        <TablaNotas notas={talleres} onEliminarNota={eliminarNota} />
      </main>
    </div>
  )
}

export default App 