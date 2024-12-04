/*
#nombreMedicamento
*/
// ------------------- libreria txt enriquesido --------------- 


// ------------------------------------------------------------ 

let indiceDiagnostico = 0
let estadoDiagnostico = []
let detalleDiagnostico = []

let nombreMedicamento = []

let indiceAntecedente = 0
let detalleAntecedente = []
let desdeAntecedente = []
let hastaAntecedente = []

let indiceHabito = 0
let detalleHabito = []
let desdeHabito = []
let hastaHabito = []

let indiceAlergia = 0
let nombreAlergia = []
let importanciaAlergia = []
let desdeAlergia = []
let hastaAlergia = []

function formatearFecha(fechaISO) {
    const fecha = new Date(fechaISO);
    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript son 0-11
    const anio = fecha.getFullYear();
    return `${dia}/${mes}/${anio}`;
}


function separador(turnos) {
    let turnoFormateado = [];

    if (!turnos || turnos.length === 0) {
        return turnoFormateado;
    }

    let paciente = {
        nombre: turnos[0].nombre_paciente,
        apellido: turnos[0].apellido_paciente,
        dni: turnos[0].dni_paciente
    };

    for (const t of turnos) {
        let turnoA = {
            fecha: formatearFecha(t.fecha),
            motivo: t.motivo_consulta,
            idEspecialidad: t.id_especialidad,
            nombreEspecialidad: t.nombre_especialidad,
            paciente: paciente,
            nombreMedico: t.nombre_medico,
            apellidoMedico: t.apellido_medico,
            matriculaMedico: t.matricula_medico,
            editable: t.es_ultima_atencion,
            diagnostico: t.diagnostico ? t.diagnostico.split('|') : [],
            estadoDiagnostico: t.estado_diagnostico ? t.estado_diagnostico.split('|') : [],
            evolucion: t.evolucion,
            nombreAlergia: t.nombre_alergia ? t.nombre_alergia.split('|') : [],
            importanciaAlergia: t.importancia_alergia ? t.importancia_alergia.split('|') : [],
            alergiaDesde: t.fecha_desde_alergia ? t.fecha_desde_alergia.split('|') : [],
            alergiaHasta: t.fecha_hasta_alergia ? t.fecha_hasta_alergia.split('|') : [],
            habito: t.habito ? t.habito.split('|') : [],
            habitoDesde: t.fecha_desde_habito ? t.fecha_desde_habito.split('|') : [],
            habitoHasta: t.fecha_hasta_habito ? t.fecha_hasta_habito.split('|') : [],
            idReceta: t.id_receta ? t.id_receta.split('|') : [],
            txtReceta: t.txt_receta ? t.txt_receta.split('|') : [],
            nombreMedicamento: t.nombre_medicamento ? t.nombre_medicamento.split('|') : [],
            idMedicamento: t.id_medicamento ? t.id_medicamento.split('|') : []
        };

        turnoFormateado.push(turnoA);
    }

    return turnoFormateado;
}
console.log('tuqi')
console.log(separador(turnos))



try {
    separador()
} catch (error) {
}
console.log(turnos)
let body = document.getElementById('table-body');
function pintarTabla() {
    let tabla = ""
    for (const element of turnos) {
        tabla += `<tr title="Modificar" class="editable">
    <td>
        <p>${element.fecha}</p>
    </td>
    <td>
        <p>${element.motivo_consulta}</p>
    </td>
    <td>
        <p>${element.apellido_medico}</p>
        <p>Odontologo</p>
    </td>
    <td>
        <ol>
            <li>${element.diagnostico}</li>
        </ol>
    </td>
    <td>
        <p>El paciente está evolucionando <strong>correctamente</strong>, continuar tratamiento</p>
    </td>
    <td>
        <ol>
            <li>Polen</li>
        </ol>
        <p><u>Importancia:</u> Leve</p>
        <div class="d-flex gap-2">
            <p>desde: 11/11/2022</p>
            <p>hasta: 11/11/2022</p>
        </div>
    </td>
    <td>
        <ol>
            <li>
                <p><u><strong>Ibuprofeno</strong></u></p>
                <p>1 cada 12 horas durante 20 días</p>
            </li>
        </ol>
    </td>
    <td>
        <ol>
            <li>n/a</li>
        </ol>
    </td>
    <td>
        <ol>
            <li>n/a</li>
        </ol>
    </td>
</tr>
`;
    }
    document.getElementById('table-body').innerHTML += tabla;

}
pintarTabla();


/*
if (flagElse && turnoS.estado == 'Atendido') {
    const quill = new Quill('#editor', {
        theme: 'snow'
    });
    quill.clipboard.dangerouslyPasteHTML(evolucionEriquesida);
    quill.disable()


    cDiagnostico()
    cAntecedente()
    cHabito()
    cAlergia()
    cMedicamento()
    cargardatos()
    flechasInicio()

} else if (turnoS.estado == 'Atendido') {
    cDiagnostico()
    cargardatos()
} else {
    cargardatos()
}
*/


