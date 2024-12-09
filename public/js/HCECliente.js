/*
#nombreMedicamento
*/
// ------------------- libreria txt enriquesido --------------- 

console.log(matriculaMedicoLog)
medicoLogueado = matriculaMedicoLog;
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
    if (!fechaISO) {
        return 'sin registros';
    }
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
            numero:t.numero_turno,
            fecha: formatearFecha(t.fecha),
            motivo: t.motivo_consulta,
            estadoTurno: t.estado,
            idEspecialidad: t.id_especialidad,
            nombreEspecialidad: t.nombre_especialidad,
            paciente: paciente,
            nombreMedico: t.nombre_medico,
            apellidoMedico: t.apellido_medico,
            matriculaMedico: t.matricula_medico,
            editable: t.es_ultima_atencion,
            diagnostico: t.diagnostico ? t.diagnostico.split('|') : ['Sin diagnóstico'],
            estadoDiagnostico: t.estado_diagnostico ? t.estado_diagnostico.split('|') : ['Sin estado de diagnóstico'],
            evolucion: t.evolucion || 'Sin evolución registrada',
            nombreAlergia: t.nombre_alergia ? t.nombre_alergia.split('|') : ['Sin alergias registradas'],
            importanciaAlergia: t.importancia_alergia ? t.importancia_alergia.split('|') : ['No especificada'],
            alergiaDesde: t.fecha_desde_alergia ? t.fecha_desde_alergia.split('|') : [''],
            alergiaHasta: t.fecha_hasta_alergia ? t.fecha_hasta_alergia.split('|') : [''],
            habito: t.habito ? t.habito.split('|') : ['Sin hábitos registrados'],
            habitoDesde: t.fecha_desde_habito ? t.fecha_desde_habito.split('|') : [''],
            habitoHasta: t.fecha_hasta_habito ? t.fecha_hasta_habito.split('|') : [''],
            idReceta: t.id_receta ? t.id_receta.split('|') : ['Sin recetas'],
            txtReceta: t.txt_receta ? t.txt_receta.split('|') : ['Sin contenido de receta'],
            nombreMedicamento: t.nombre_medicamento ? t.nombre_medicamento.split('|') : ['Sin medicamentos'],
            idMedicamento: t.id_medicamento ? t.id_medicamento.split('|') : ['Sin identificadores de medicamento'],
            antecedente: t.antecedente ? t.antecedente.split('|') : ['Sin antecedentes registrados'],
            antecedenteDesde: t.fecha_desde_antecedente ? t.fecha_desde_antecedente.split('|') : [''],
            antecedenteHasta: t.fecha_hasta_antecedente ? t.fecha_hasta_antecedente.split('|') : ['']
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
//console.log(turnos)
let body = document.getElementById('table-body');


function pintarTabla() {
    document.getElementById('nombre-paciente').innerHTML = `Historial clínico del paciente: ${turnos[0].nombre_paciente} ${turnos[0].apellido_paciente}`;

    let tabla = "";
    let primerTr = true; // Bandera para identificar el primer <tr>
    for (const element of separador(turnos)) {

        //--------------------------------- diagnosticos -------------------------------
        const diagnosticosHTML = element.diagnostico.map((diagnostico, index) => `
        <li>
            <p>${diagnostico}</p>
            <p>Estado: ${element.estadoDiagnostico[index] || 'Sin estado registrado'}</p>
            <hr>
        </li>
        
        `).join('');



        // ------------------------------ medicamento ----------------------------
        const medicamentosHTML = element.nombreMedicamento.map((medicamento, index) => `
        <li>
            <p><u><strong>${medicamento}</strong></u></p>
            <p>${element.txtReceta[index] || 'Sin receta registrada'}</p>
        </li>
        <hr>
        `).join('');

        // ---------------------------- alergias ---------------------------------

        const alergiasHTML = element.nombreAlergia.map((alergia, index) => `
            <li>
                ${alergia || 'Sin alergia registrada'}
                <p>Importancia: ${element.importanciaAlergia[index] || 'No especificada'}</p>
                <div class="d-flex gap-2">
                    <p>Desde: ${formatearFecha(element.alergiaDesde[index]) || 'N/A'}</p>
                    <p>Hasta: ${formatearFecha(element.alergiaHasta[index]) || 'Vigente'}</p>
                </div>
            </li>
            <hr>
        `).join('');

        // -------------------------------- habitos --------------------------------

        const habitosHTML = element.habito.map((habito, index) => `
            <li>
                ${habito || 'Sin hábitos registrados'}
                <div class="d-flex gap-2">
                    <p>Desde: ${formatearFecha(element.habitoDesde[index]) || 'N/A'}</p>
                    <p>Hasta: ${formatearFecha(element.habitoHasta[index]) || 'Vigente'}</p>
                </div>
            </li>
            <hr>
        `).join('');

        // ----------------------------- antecedentes --------------------------------

        const antecedentesHTML = element.antecedente.map((antecedente, index) => `
            <li>
                ${antecedente}
                <div class="d-flex gap-2">
                    <p>Desde: ${formatearFecha(element.antecedenteDesde[index]) || 'N/A'}</p>
                    <p>Hasta: ${formatearFecha(element.antecedenteHasta[index]) || 'Vigente'}</p>
                </div>
            </li>
            <hr>
        `).join('');


        // ---------------------- tabla completa -------------------------------------

        let trContent;
        console.log('----------------');
        console.log('Matricula medico server: ' + element.matriculaMedico);
        console.log('Matricula medico logueado: ' + medicoLogueado);
        console.log('----------------');
        if (element.estadoTurno == "Atendido") {
            if(element.matriculaMedico == medicoLogueado){

                //------------------ pintar tabla ---------------------
                trContent = `
                <tr>
                <td>
                <p class="color-primario-txt fw-semibold">${element.fecha}</p>
                </td>
                <td>
                <p class="color-primario-txt fw-semibold">${element.motivo}</p>
                </td>
                <td>
                <p class="color-primario-txt fw-semibold">${element.apellidoMedico} ${element.nombreMedico}</p>
                <p class="color-primario-txt fw-semibold">${element.nombreEspecialidad}</p>
                </td>
                <td>
                <ol class="color-primario-txt fw-semibold">${diagnosticosHTML}</ol></td>
                <td>
                <p class="color-primario-txt">${element.evolucion}</p>
                </td>
                <td>
                <ol class="color-primario-txt fw-semibold">${alergiasHTML}</ol>
                </td>
                <td>
                <ol class="color-primario-txt fw-semibold">${medicamentosHTML}</ol>
                </td>
                <td>
                <ol class="color-primario-txt fw-semibold">${habitosHTML}</ol>
                </td>
                <td>
                <ol class="color-primario-txt fw-semibold">${antecedentesHTML}</ol>
                </td>
                </tr>
                `;

                // ---------------------------------- editable ----------------------

                if (primerTr) {
                    tabla += `
                    <tr title="Modificar" class="editable">
                        
                            <td><a href="/turnos/editarHCE${element.numero}" class="p-5"><p>${element.fecha}</p></a></td>
                            <td><a href="/turnos/editarHCE${element.numero}" class="p-5"><p>${element.motivo}</p></a></td>
                            <td>
                                <a href="/turnos/editarHCE${element.numero}" class="p-5 fw-semibold">
                                    <p>${element.apellidoMedico} ${element.nombreMedico}</p>    
                                    <p>${element.nombreEspecialidad}</p>
                                </a>
                            </td>
                            <td>
                                <a href="/turnos/editarHCE${element.numero}" class="p-5 fw-semibold">
                                    <ol>${diagnosticosHTML}</ol>
                                </a>
                            </td>
                            <td>
                                <a href="/turnos/editarHCE${element.numero}" class="p-5 evolink text-dark">
                                    <p>${element.evolucion}</p>
                                </a>
                            </td>
                            <td>
                                <a href="/turnos/editarHCE${element.numero}" class="p-5 fw-semibold">
                                    <ol>${alergiasHTML}</ol>
                                    </a>
                                </td>
                            <td>
                                <a href="/turnos/editarHCE${element.numero}" class="p-5 fw-semibold">
                                    <ol>${medicamentosHTML}</ol>
                                    </a>
                            </td>
                            <td>
                                <a href="/turnos/editarHCE${element.numero}" class="p-5 fw-semibold">
                                    <ol>${habitosHTML}</ol>
                                </a>
                            </td>
                            <td>
                                <a href="/turnos/editarHCE${element.numero}" class="p-5 fw-semibold">
                                    <ol>${antecedentesHTML}</ol>
                                </a>
                            </td>
                        
                    </tr> `;
                    primerTr = false; 
                } else {
                    tabla += `<tr title="Modificar">${trContent} </tr>`;
                    document.getElementById('table-body').innerHTML = tabla;
                }
                
            } else {
                // aca si lo atendio otro medico
                primerTr = false;
                trContent = `
                <tr class="text-center">
                <td>
                <p class="color-primario-txt fw-semibold">${element.fecha}</p>
                </td>
                <td>
                <p class="color-primario-txt fw-semibold">${element.motivo}</p>
                </td>
                <td>
                <p class="color-primario-txt fw-semibold">${element.apellidoMedico} ${element.nombreMedico}</p>
                <p class="color-primario-txt fw-semibold">${element.nombreEspecialidad}</p>
                </td>
                <td>
                <ol class="color-primario-txt fw-semibold">${diagnosticosHTML}</ol></td>
                <td>
                <span style="cursor: help;" title="No puedes ver el contenido"  id="privado-icono" class="material-symbols-outlined">
                    visibility_lock
                    </span>
                
                    
                </td>
                <td>
                <span style="cursor: help;" title="No puedes ver el contenido" id="privado-icono" class="material-symbols-outlined">
                    visibility_lock
                    </span>
                    
                
                </td>
                <td>
                <span style="cursor: help;" title="No puedes ver el contenido" id="privado-icono" class="material-symbols-outlined">
                    visibility_lock
                    </span>
                
                
                </td>
                <td>
                <span style="cursor: help;" title="No puedes ver el contenido" id="privado-icono" class="material-symbols-outlined">
                    visibility_lock
                    </span>
                
                
                </td>
                <td>
                <span style="cursor: help;" title="No puedes ver el contenido" id="privado-icono" class="material-symbols-outlined">
                    visibility_lock
                    </span>
                
                
                </td>
                </tr>
                `;
                tabla += `<tr title="Modificar">${trContent} </tr>`;
                document.getElementById('table-body').innerHTML = tabla;
            }
            
        }

    }

    document.getElementById('table-body').innerHTML = tabla;
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


