const mat01 = "ADSO-890"

let materiaHoras = 5
let materiaActiva = true

console.log("Codigo:", mat01);
console.log("MATERIA:", materiaHoras);
console.log("¿Estas activo en el curso?:", materiaActiva);



const id = 3235667
const estudiante = "Juana Palacios"

let nota = 4.5
let asistenciaHoy = true

const matematicas = "ADSO-123"

let horasMateria = 3
let estudianteActivo = true

console.log("ID:", id);
console.log("Nombre:", estudiante);
console.log("promedio:", nota);
console.log("puntualidad:", asistenciaHoy);

console.log("Codigo:", matematicas);
console.log("horas:", horasMateria);
console.log("activo:", estudianteActivo);


let taller1 = 4.0
let taller2 = 3.5
let taller3 = 4.5
let notaDefinitiva = (taller1 + taller2 + taller3) / 3

console.log("Nota Final:", notaDefinitiva);




let promedioPrueba = 2.8

 if (promedioPrueba >= 3.0) {
  console.log("Aprobado");
 } else {
    console.log("Reprobado");
  }  
   

  let promedioBeca = 4.7
  let asistenciaBeca = true

  
  if(promedioBeca >= 4.5 && asistenciaBeca === true ) {
    console.log("¡Felicidades! Tienes Beca de Excelencia");
    } else {
     console.log("No aplicas a la beca");
     }


function calcularPromedio(nota1, nota2, nota3) {
  let promedioBeca = (nota1 + nota2 + nota3) / 3
return promedioBeca;
} 
let promedioJuana = calcularPromedio(4.0, 3.5, 4.0);
console.log("Promedio Final:", promedioJuana)

const materia = {
  codigo: "ADSO-123",
  nombre: "Programacion",
  horas: 3,
  activa: true
};
  console.log("materia del curso:", materia.nombre);
  console.log("Registro de Horas:", materia.horas);




const notasTalleres = [4.0, 3.5, 4.5];
console.log("Nota 1:", notasTalleres[0]);
console.log("Nota 2:", notasTalleres[1]);
console.log("Nota 3:", notasTalleres[2]);

console.log("Nota final:", notasTalleres.length);


const nombres = ["Juan, camilo, cristian"];
console.log("alummo 1:", nombres[0]);
console.log("alumno 2:", nombres[1]);
console.log("alumno")

console.log("alumnos en total:", nombres.length);

const notas = [4.0, 3.5, 4.5];
for (const nota of notas) {
  console.log("Nota del taller:", nota);
  }