let listaNotas = [4.0, 3.5, 4.5];

const cuerpoTabla = document.getElementById("cuerpo-tabla");
const formulario = document.getElementById("formulario-nota");
const inputActividad = document.getElementById("input-actividad");
const inputCalificacion = document.getElementById("input-calificacion");
const textoPromedio = document.getElementById("texto-promedio");

function actualizarPromedioEnPantalla() {
    let suma = 0;

    for (const nota of listaNotas) {
        suma = suma + nota;
        }

        let promedio = suma / listaNotas.length;

        let estado = "Reprobado";
        if (promedio >= 3.0) {
            textoPromedio.style.color = "#16a34a";
            estado = "Aprobado";
             } 
             else 
                textoPromedio.style.color = "#dc2626";

             textoPromedio.textContent = `Promedio Final: ${promedio.toFixed(1)} - Estado: ${estado}`;
             } 


formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();


const nombreActividad = inputActividad.value;
const notaActividad = Number(inputCalificacion.value);

if (notaActividad < 0.0 || notaActividad > 5.0 ) {
        alert("Error: la nota debe estar entre 0.0 y 5.0");
        return;
        } 

listaNotas.push(notaActividad);

const nuevaFila = document.createElement("tr");
nuevaFila.innerHTML = `
<td>${nombreActividad}</td>
<td>${notaActividad.toFixed(1)}</td>
`;

cuerpoTabla.appendChild(nuevaFila);

actualizarPromedioEnPantalla();

formulario.reset();


});


