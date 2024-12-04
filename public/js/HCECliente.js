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



function separador() {

    try {
        detalleDiagnostico = turnoS.diagnostico.split('|')
        estadoDiagnostico = turnoS.estado_diagnostico.split('|')
    } catch (error) {

        document.getElementById('estadoDiagnostico').innerHTML = 'Detalle: No hay datos'

        document.getElementById('detalleDiagnostico').innerHTML = 'Estado: No hay datos'
    }

    try {
        nombreMedicamento = turnoS.nombre_medicamento.split('|')
    } catch (error) {
        document.getElementById('nombreMedicamento').innerHTML = 'No hay medicamentos asociados'
    }

    try {
        detalleAntecedente = turnoS.antecedente.split('|')
        desdeAntecedente = turnoS.fecha_desde_antecedente.split('|')
        hastaAntecedente = turnoS.fecha_hasta_antecedente.split('|')

    } catch (error) {
        document.getElementById('detalleAntecedente').innerHTML = 'Detalle: No hay datos'
        document.getElementById('desdeAntecedente').innerHTML = 'Desde: No hay datos'
        document.getElementById('hastaAntecedente').innerHTML = 'Hasta: No hay datos';

    }


    try {
        detalleHabito = turnoS.habito.split('|')
        desdeHabito = turnoS.fecha_desde_habito.split('|')
        hastaHabito = turnoS.fecha_hasta_habito.split('|')
    } catch (error) {
        document.getElementById('detalleHabito').innerHTML = 'Detalle: No hay datos';
        document.getElementById('desdeHabito').innerHTML = 'Desde: No hay datos';
        document.getElementById('hastaHabito').innerHTML = 'Hasta: No hay datos';

    }

    try {
        nombreAlergia = turnoS.nombre_alergia.split('|')
        importanciaAlergia = turnoS.importancia_alergia.split('|')
        desdeAlergia = turnoS.fecha_desde_alergia.split('|')
        hastaAlergia = turnoS.fecha_hasta_alergia.split('|')


    } catch (error) {

        document.getElementById('nombreAlergia').innerHTML = 'Nombre: No hay datos';
        document.getElementById('importanciaAlergia').innerHTML = 'Importancia: No hay datos';
        document.getElementById('desdeAlergia').innerHTML = 'Desde: No hay datos';
        document.getElementById('hastaAlergia').innerHTML = 'Hasta: No hay datos';
    }









}


try {
    separador()
} catch (error) {
}
console.log(turnos)
let body = document.getElementById('table-body');
function pintarTabla(){
    let tabla = `<tr title="Modificar" class="editable">
    <td>
        <p>${turnos.fecha}</p>
    </td>
    <td>
        <p>${turnos.motivo_consulta}</p>
    </td>
    <td>
        <p>${turnos.apellido_medico}</p>
        <p>Odontologo</p>
    </td>
    <td>
        <ol>
            <li>El paciente tiene dolores de cabeza al estar más de 2 horas en la computadora</li>
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


