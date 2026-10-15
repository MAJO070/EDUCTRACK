
function calcularPromedio(nota1, nota2, nota3) {
let promedio = (nota1 + nota2 + nota3) / 3;
return promedio;
} 

const id = "3235667"
const estudiante = "Juana Palacios"

const talleres = [4.0, 3.5, 4.5];
let notaDefinitiva = calcularPromedio(talleres[0], talleres[1], talleres[2]);
let asistenciaHoy = true;

const materia = {
  codigo:"ADSO-123",
  nombre: "Programacion",
  horas: 3,
  activa: true 
};

console.log("=================================");
console.log("      BOLETIN DE EDUCTRACK       ");
console.log("=================================");
console.log("ID:", id);
console.log("Nombre:", estudiante);

console.log("--- Notas de Talleres ---");
for (const nota of talleres) {
  console.log("- Taller:", nota);
  }

console.log("promedio:", notaDefinitiva);

 if (notaDefinitiva >= 3.0 && asistenciaHoy === true) {
  console.log("Aprobado");
 } else {
    console.log("Reprobado");
  }  
   
console.log("puntualidad:", asistenciaHoy);
console.log("Materia:", materia.nombre)
console.log("Codigo:", materia.codigo);
console.log("horas:", materia.horas);
console.log("activo:", materia.activa);
console.log("=================================");
