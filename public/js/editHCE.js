// ------------------- libreria txt enriquesido --------------- 
const quill = new Quill('#editor', {
    theme: 'snow'
});
//quill.clipboard.dangerouslyPasteHTML();

// ------------------------------------------------------------ 

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
let turnoFormateado
function separador(turnos) {
    turnoFormateado = [];

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
            numero: t.numero_turno,
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
            diagnostico: t.diagnostico ? t.diagnostico.split('|') : [''],
            estadoDiagnostico: t.estado_diagnostico ? t.estado_diagnostico.split('|') : [''],
            evolucion: t.evolucion || '',
            nombreAlergia: t.nombre_alergia ? t.nombre_alergia.split('|') : [''],
            importanciaAlergia: t.importancia_alergia ? t.importancia_alergia.split('|') : [''],
            alergiaDesde: t.fecha_desde_alergia ? t.fecha_desde_alergia.split('|') : [null],
            alergiaHasta: t.fecha_hasta_alergia ? t.fecha_hasta_alergia.split('|') : [null],
            habito: t.habito ? t.habito.split('|') : [''],
            habitoDesde: t.fecha_desde_habito ? t.fecha_desde_habito.split('|') : [null],
            habitoHasta: t.fecha_hasta_habito ? t.fecha_hasta_habito.split('|') : [null],
            idReceta: t.id_receta ? t.id_receta.split('|') : [''],
            txtReceta: t.txt_receta ? t.txt_receta.split('|') : [''],
            nombreMedicamento: t.nombre_medicamento ? t.nombre_medicamento.split('|') : [''],
            idMedicamento: t.id_medicamento ? t.id_medicamento.split('|') : [''],
            antecedente: t.antecedente ? t.antecedente.split('|') : [''],
            antecedenteDesde: t.fecha_desde_antecedente ? t.fecha_desde_antecedente.split('|') : [null],
            antecedenteHasta: t.fecha_hasta_antecedente ? t.fecha_hasta_antecedente.split('|') : [null],

            idDiagnosticoDB: t.id_diagnostico ? t.id_diagnostico.split('|') : [''],
            idRecetaDB: t.id_receta ? t.id_receta.split('|') : [''],
            idAlergiaDB: t.id_alergia ? t.id_alergia.split('|') : [''],
            idHabitoDB: t.id_habito ? t.id_habito.split('|') : [''],
            idAntecedenteDB: t.id_antecedente ? t.id_antecedente.split('|') : ['']
        };

        turnoFormateado.push(turnoA);
    }

    return turnoFormateado;
}
console.log(separador(turnos))

// la fecha del turno ya viene formateada del sv
document.getElementById('fecha').innerHTML = 'turno del: ' + turnoFormateado[0].fecha;

// ----------------- select medicamentos ----------------

function llenarSelectMedicamento() {
    let todosMedicamentos
    for (const element of medicamentos) {
        todosMedicamentos = `
        <option value="${element.id_medicamento}">${element.nombre_medicamento}</option>
    `;
        document.getElementById('selectMedicamento').innerHTML += todosMedicamentos;
    }

}


function toggleContent(id) {
    const contenido = document.getElementById(id);
    const flecha = contenido.previousElementSibling.querySelector('.flecha-abrir');

    if (contenido.style.display === 'none' || contenido.style.display === '') {
        contenido.style.display = 'block';
        contenido.classList.add('animacion-entrada');
        contenido.classList.remove('animacion-salida');
        flecha.classList.add('rotar-180');
        flecha.classList.remove('bounce-reverse'); // Remover animación inversa
    } else {
        contenido.classList.remove('animacion-entrada');
        contenido.classList.add('animacion-salida');
        flecha.classList.remove('rotar-180');
        flecha.classList.add('bounce-reverse'); // Añadir animación inversa

        // Espera a que termine la animación antes de ocultar el contenido
        contenido.addEventListener('animationend', function handleAnimationEnd() {
            contenido.style.display = 'none';
            contenido.classList.remove('animacion-salida');
            contenido.removeEventListener('animationend', handleAnimationEnd);
        });
    }
}

// ----------------- cargar lo traido ---------------------
let diagnosticoCounter = 1;
let alergiaCounter = 1;
let habitoCounter = 1;
let antecedenteCounter = 1;
let medicamentoCounter = 1;

// ----------------------- diagnostico traido--------------------


function traerDiagnostico() {
    // estos cargan en los bloques estaticos de pug
    document.querySelector('.select-diagnostico').value = turnoFormateado[0].estadoDiagnostico[0];
    document.querySelector('.txt-area-diagnostico').innerHTML = turnoFormateado[0].diagnostico[0];
    let idDiag = turnoFormateado[0].idDiagnosticoDB[0];
    console.log('hola', idDiag);
    if (turnoFormateado[0].diagnostico.length > 1) {
        for (let i = 1; i < turnoFormateado[0].diagnostico.length; i++) {
            traerOtroDiagnostico(turnoFormateado[0].diagnostico[i], turnoFormateado[0].estadoDiagnostico[i], turnoFormateado[0].idDiagnosticoDB[i])
            idDiag = turnoFormateado[0].idDiagnosticoDB[i]
            console.log(idDiag);
        }
    }
}
traerDiagnostico()

// Contador global para IDs únicos

function traerOtroDiagnostico(txt_diag, estDiag, idDiag) {
    let pre = estDiag === 'Preliminar' ? 'selected' : '';
    let conf = estDiag === 'Confirmado' ? 'selected' : '';

    let nuevoDiagnostico = document.getElementById('nuevo-diagnostico');
    let idDiagnostico = `idDiagnostico${diagnosticoCounter}`; // Generar ID único

    let pintar = `
    <div id="${idDiagnostico}" class="capturarValorDiagnostico animacion color-primario-bg d-flex flex-column align-items-start p-5 gap-4 border-bottom border-dark text-light">
        <h3>Diagnostico (obligatorio)</h3>
        <input type="hidden" class="idDiag" value="${idDiag}">
        <div class="d-flex gap-2">
            <label>Estado: </label>
            <select class="select-diagnostico">
                <option ${pre}>Preliminar</option>
                <option ${conf}>Confirmado</option>
            </select>
        </div>
        <label class="text-center">Detalles:</label>
        <textarea class="txt-area-create txt-area-diagnostico text-left">${txt_diag}</textarea>
        
        <button class="btn btn-danger" onclick="eliminarDiagnosticoConConfirmacion('${idDiagnostico}','${idDiag}')">Eliminar</button>
    </div>
    `;

    nuevoDiagnostico.innerHTML += pintar;
    diagnosticoCounter++; // Incrementar el contador
}

function eliminarDiagnosticoConConfirmacion(idDiagnostico,idDiag) {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            // aca deberiamos hacer un borrado FISICO, ya que no le pucimos estados en db
            // hay que traer los id en el pa obtener_turno_detalleTRES
            drop('d', idDiag)
            eliminarDiagnostico(idDiagnostico);
            toastr.success('Diagnóstico eliminado exitosamente');
        }
    });
}


//----------------------------- evolucion traida --------------------------

function traerEvolucion() {
    quill.clipboard.dangerouslyPasteHTML(turnoFormateado[0].evolucion);
}
traerEvolucion()

// --------------------------------- medicamentos traidos ---------------------------

function traerMedicamento() {
    // Estos cargan en los bloques estáticos de pug
    toggleContent('ampliarMedicamento');
    let idMedDB = turnoFormateado[0].idRecetaDB[0];
    console.log('id pos 0 medicamento', idMedDB);
    let nombreMedicamento = turnoFormateado[0].nombreMedicamento[0];
    let medicamento = medicamentos.find(med => med.nombre_medicamento === nombreMedicamento);
    if (medicamento) {
        document.querySelector('.select-medicamento').value = medicamento.id_medicamento;
    }

    document.querySelector('.txt-area-medicamento').innerHTML = turnoFormateado[0].txtReceta[0];

    if (turnoFormateado[0].nombreMedicamento.length > 1) {
        for (let i = 1; i < turnoFormateado[0].nombreMedicamento.length; i++) {
            idMedDB = turnoFormateado[0].idRecetaDB[i];
            console.log(`id pos ${i} medicamento`, idMedDB);
            traerOtroMedicamento(
                turnoFormateado[0].nombreMedicamento[i],
                turnoFormateado[0].txtReceta[i],
                turnoFormateado[0].idRecetaDB[i]

            );
        }
    }
}

traerMedicamento()
//llenarSelectMedicamento();

function traerOtroMedicamento(nombreMedicamento, txtReceta, idRec) {
    let nuevoMedicamento = document.getElementById('nuevo-medicamento');
    let idMedicamento = `idMedicamento${medicamentoCounter}`;
    let pintar = `
    <div id="${idMedicamento}" class="capturarValorMedicamento animacion-entrada bg-light d-flex flex-column align-items-start p-5 gap-4 border border-dark">
        <h3 class="text-center">Medicamentos</h3>
        <input type="hidden" class="idRec" value="${idRec}">
        <div class="d-flex gap-2">
            <label>Seleccione medicamento: 
            </label>
            <select id="selectMedicamento${medicamentoCounter}" class="select-medicamento">
                ${document.getElementById('selectMedicamento').innerHTML}
            </select>
        </div>
        <label>Receta: </label>
        <textarea class="txt-area-medicamento txt-area-create text-left">${txtReceta || ''}</textarea>
        <button onclick="eliminarMedicamentosConConfirmacion('${medicamentoCounter}','${idRec}')" class="btn btn-danger fw-semibold">Eliminar</button>
    </div>`;
    medicamentoCounter++;
    nuevoMedicamento.innerHTML += pintar;

    // Selecciona el medicamento correcto en el nuevo select
    let selectNuevoMedicamento = document.getElementById(`selectMedicamento${medicamentoCounter - 1}`);
    let medicamento = medicamentos.find(med => med.nombre_medicamento === nombreMedicamento);
    if (medicamento) {
        selectNuevoMedicamento.value = medicamento.id_medicamento;
    }
}

function eliminarMedicamentosConConfirmacion(idMedicamento,idRec) {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            // aca deberiamos hacer un borrado FISICO, ya que no le pucimos estados en db
            // hay que traer los id en el pa obtener_turno_detalleTRES
            drop('m', idRec)
            eliminarMedicamento(idMedicamento);
            toastr.success('Medicamento eliminado exitosamente');
        }
    });
}


// --------------------------------- alergias traidas -------------------------------

function traerAlergia() {
    // estos cargan en los bloques estaticos de pug
    toggleContent('ampliarAlergia')
    let idAlerDB = turnoFormateado[0].idAlergiaDB[0];
    console.log('id pos 0 alergia ' + idAlerDB);
    let nombreAlergia = document.querySelector('.nombre-alergia').value = turnoFormateado[0].nombreAlergia[0];
    let importanciaAlergia = document.querySelector('.select-alergia').value = turnoFormateado[0].importanciaAlergia[0];
    let desdeAlergia = document.querySelector('.desde-alergia').value = turnoFormateado[0].alergiaDesde[0] || '';
    let hastaAlergia = document.querySelector('.hasta-alergia').value = turnoFormateado[0].alergiaHasta[0] || '';

    if (turnoFormateado[0].nombreAlergia.length > 1) {
        for (let i = 1; i < turnoFormateado[0].nombreAlergia.length; i++) {
            // crashea si le mando las variables creados como parametros xd
            idAlerDB = turnoFormateado[0].idAlergiaDB[i];
            console.log(`id pos ${i} alergia ` + idAlerDB);
            traerOtraAlergia(turnoFormateado[0].nombreAlergia[i], turnoFormateado[0].importanciaAlergia[i], turnoFormateado[0].alergiaDesde[i], turnoFormateado[0].alergiaHasta[i], turnoFormateado[0].idAlergiaDB[i])
        }
    }
}
traerAlergia()

// Contador global para IDs únicos

function traerOtraAlergia(nombreAlergia, importanciaAlergia, desdeAlergia, hastaAlergia, idAler) {
    let lev = importanciaAlergia === 'leve' ? 'selected' : '';
    let nor = importanciaAlergia === 'normal' ? 'selected' : '';
    let alt = importanciaAlergia === 'alta' ? 'selected' : '';
    let nuevaAlergia = document.getElementById('nueva-alergia');
    let idAlergia = `idAlergia${alergiaCounter}`; // Generar ID único

    let pintar = `
    <div id="${idAlergia}" class="capturarValorAlergias animacion-entrada bg-light d-flex flex-column align-items-start p-5 gap-4 border border-dark">
        <h3 class="text-center">Alergias</h3>
        <input type="hidden" class="idAler" value="${idAler}">
        <label>Nombre: </label>
        <input class="nombre-alergia" type="text" value="${nombreAlergia}" />
        <label>Importancia
            <select class="select-alergia"> 
                <option ${lev}>Leve</option>
                <option ${nor}>Normal</option>
                <option ${alt}>Alta</option>
            </select>
        </label>
        <div class="d-flex gap-4">
        <label>Desde: 
            <input class="desde-alergia" type="date" name="" value="${desdeAlergia}" />
        </label>
        <label>Hasta: 
            <input class="hasta-alergia" type="date" name="" value="${hastaAlergia}"/>
        </label>
        <label> Vigente
            <input type="checkbox"/>
        </label>
        </div>
            <button onclick="eliminarAlergiaConConfirmacion('${idAlergia}','${idAler}')" class="btn btn-danger fw-semibold">Eliminar</button>
    </div>`

    nuevaAlergia.innerHTML += pintar;
    alergiaCounter++;
}

function eliminarAlergiaConConfirmacion(idAlergia,idAler) {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            // aca deberiamos hacer un borrado FISICO, ya que no le pucimos estados en db
            // hay que traer los id en el pa obtener_turno_detalleTRES
            drop('a', idAler)
            eliminarAlergia(idAlergia);
            toastr.success('Alergia eliminada exitosamente');
        }
    });
}

// ------------------------------Habitos traidos ------------------------------

function traerHabito() {
    toggleContent('ampliarHabito')
    let idHabDB = turnoFormateado[0].idHabitoDB[0];
    console.log('id pos 0 habito ' + idHabDB);
    document.querySelector('.texto-habito').innerHTML = turnoFormateado[0].habito[0];
    document.querySelector('.desde-habito').value = turnoFormateado[0].habitoDesde[0] || '';
    document.querySelector('.hasta-habito').value = turnoFormateado[0].habitoHasta[0] || '';

    if (turnoFormateado[0].habito.length > 1) {
        for (let i = 1; i < turnoFormateado[0].habito.length; i++) {
            // crashea si le mando las variables creados como parametros xd
            idHabDB = turnoFormateado[0].idHabitoDB[i];
            console.log(`id pos ${i} habito ` + idHabDB);
            traerOtroHabito(turnoFormateado[0].habito[i], turnoFormateado[0].habitoDesde[i], turnoFormateado[0].habitoHasta[i], turnoFormateado[0].idHabitoDB[i])
        }
    }
}
traerHabito()

function traerOtroHabito(habito, desdeHabito, hastaHabito, idHab) {
    let nuevoHabito = document.getElementById('nuevo-habito');
    let idHabito = `idHabito${habitoCounter}`;
    let pintar = `
    <div id="${idHabito}" class="capturarValorHabitos animacion-entrada bg-light d-flex flex-column align-items-start p-5 gap-4 border border-dark">
        <h3 class="text-center">Habitos</h3>
        <input type="hidden" class="idHab" value="${idHab}">
        <label>Detalles: </label>
        <textarea class="txt-area-create text-left texto-habito">${habito}</textarea>
        <div class="d-flex gap-4">
            <label>Desde: 
                <input type="date" class="desde-habito" name="" value="${desdeHabito}"/>
            </label>
            <label>Hasta: 
                <input type="date" class="hasta-habito" name="" value="${hastaHabito}"/>
            </label>
            <label>Vigente
                <input type="checkbox"/>
            </label>
        </div>
        <button onclick="eliminarHabitoConConfirmacion('${idHabito}','${idHab}')" class="btn btn-danger fw-semibold">Eliminar</button>
    </div>`
    habitoCounter++;
    nuevoHabito.innerHTML += pintar;
}

function eliminarHabitoConConfirmacion(idHabito,idHab) {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            // aca deberiamos hacer un borrado FISICO, ya que no le pucimos estados en db
            // hay que traer los id en el pa obtener_turno_detalleTRES
            drop('h', idHab)
            eliminarHabito(idHabito);
            toastr.success('Habito eliminado exitosamente');
        }
    });
}

// ---------------------------------- Antecedentes traidos --------------------------------

function traerAntecedente() {
    toggleContent('ampliarAntecedente')
    let idAntDB = turnoFormateado[0].idAntecedenteDB[0];
    console.log('id pos 0 antecedente ' + idAntDB);
    document.querySelector('.texto-antecedente').innerHTML = turnoFormateado[0].antecedente[0];
    document.querySelector('.desde-antecedente').value = turnoFormateado[0].antecedenteDesde[0] || '';
    document.querySelector('.hasta-antecedente').value = turnoFormateado[0].antecedenteHasta[0] || '';

    if (turnoFormateado[0].antecedente.length > 1) {
        for (let i = 1; i < turnoFormateado[0].antecedente.length; i++) {
            // crashea si le mando las variables creados como parametros xd
            idAntDB = turnoFormateado[0].idAntecedenteDB[i];
            console.log(`id pos ${i} antecedente ` + idAntDB);
            traerOtroAntecedente(turnoFormateado[0].antecedente[i], turnoFormateado[0].antecedenteDesde[i], turnoFormateado[0].antecedenteHasta[i], turnoFormateado[0].idAntecedenteDB[i])
        }
    }
}
traerAntecedente()

function traerOtroAntecedente(antecedente, desdeAntecedente, hastaAntecedente, idAnte) {
    let nuevoAnteccedente = document.getElementById('nuevo-antecedente');
    let idAntecedente = `idAntecedente${antecedenteCounter}`;
    let pintar = `
    <div id="${idAntecedente}" class="capturarValorAntecedente animacion-entrada bg-light d-flex flex-column align-items-start p-5 gap-4 border border-dark">
        <h3 class="text-center">Antecedente</h3>
        <input type="hidden" class="idAnte" value="${idAnte}">
        <label>Detalles: </label>
        <textarea class="txt-area-create text-left texto-antecedente">${antecedente}</textarea>
        <div class="d-flex gap-4">
            <label>Desde: 
                <input type="date" class="desde-antecedente" name="" value="${desdeAntecedente}"/>
            </label>
            <label>Hasta: 
                <input type="date" class="hasta-antecedente" name="" value="${hastaAntecedente}"/>
            </label>
            <label>Vigente
                <input type="checkbox"/>
            </label>
        </div>
        <button onclick="eliminarAntecedenteConConfirmacion('${idAntecedente}','${idAnte}')" class="btn btn-danger fw-semibold">Eliminar</button>
    </div>`
    antecedenteCounter++;
    nuevoAnteccedente.innerHTML += pintar;
}

function eliminarAntecedenteConConfirmacion(idAntecedente,idAnte) {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            // aca deberiamos hacer un borrado FISICO, ya que no le pucimos estados en db
            // hay que traer los id en el pa obtener_turno_detalleTRES
            drop('An', idAnte)
            eliminarAntecedente(idAntecedente);
            toastr.success('Antecedente eliminado exitosamente');
        }
    });
}

// --------------- valorees ------------------
// -------------------- diagnostico --------------------

function otroDiagnositoc() {
    let nuevoDiagnostico = document.getElementById('nuevo-diagnostico');
    let idDiagnostico = `idDiagnostico${diagnosticoCounter}`; // Generar ID único

    let pintar = `
    <div id="${idDiagnostico}" class="capturarValorDiagnostico animacion color-primario-bg d-flex flex-column align-items-start p-5 gap-4 border-bottom border-dark text-light">
        <h3>Diagnostico (obligatorio)</h3>
        <div class="d-flex gap-2">
            <label>Estado: </label>
            <select class="select-diagnostico">
                <option>Preliminar</option>
                <option>Confirmado</option>
            </select>
        </div>
        <label class="text-center">Detalles:</label>
        <textarea class="txt-area-create txt-area-diagnostico text-left"></textarea>
        <button class="btn btn-danger" onclick="eliminarDiagnostico('${idDiagnostico}')">Eliminar</button>
    </div>
    `;

    nuevoDiagnostico.innerHTML += pintar;
    diagnosticoCounter++; // Incrementar el contador
}

function eliminarDiagnostico(idDiagnostico) {
    let diagnostico = document.getElementById(idDiagnostico);
    if (diagnostico) {
        diagnostico.remove();
    }
}
function capturarValoresDiagnosticos() {
    const diagnosticosCargados = [];
    const bloques = document.querySelectorAll('.capturarValorDiagnostico');

    bloques.forEach((bloque) => {
        const estado = bloque.querySelector('.select-diagnostico').value;
        const detalles = bloque.querySelector('.txt-area-diagnostico').value;
        const idDiagElement = bloque.querySelector('.idDiag');
        const idDiag = idDiagElement ? idDiagElement.value || '' : '';
        if (estado != '' && detalles != '') {
            diagnosticosCargados.push({ estado, detalles, idDiag });
        }

    });
    return diagnosticosCargados;
}

// ---------------- evolucion ------------------------------

function evolucionTemplates() {
    fetch('/cargarTemplates')
        .then(response => {
            if (!response.ok) {
                throw new Error('la respuesta no fue 200');
            }
            return response.json();
        })
        .then(data => {

            let select = document.getElementById('selectTemplates')
            if (data) {
                for (const element of data) {
                    let option = document.createElement('option')
                    option.innerHTML = element.nombre
                    option.value = element.txt_template
                    select.appendChild(option)
                }
            }


        })
        .catch(error => {
            console.error('errror al cargar templates:', error);
        });

}

evolucionTemplates()

document.getElementById('selectTemplates').addEventListener('change', () => {
    let textoEnriquesido = document.getElementById('selectTemplates').value
    quill.clipboard.dangerouslyPasteHTML(textoEnriquesido)
})

function capturarValorEvolucion() {
    let evolucionEnriquecida = quill.root.innerHTML;
    return evolucionEnriquecida;
}


// ----------------------------- medicamentos ---------------------
function nuevoMedicamento() {
    let nuevoMedicamento = document.getElementById('nuevo-medicamento');
    let i = 1;


    let pintar = `
    <div id="idMedicamento${i}" class="capturarValorMedicamento animacion-entrada bg-light d-flex flex-column align-items-start p-5 gap-4 border border-dark">
        <h3 class="text-center">Medicamentos</h3>
        <div class="d-flex gap-2">
            <label>Seleccione medicamento: 
            </label>
            <select id="selectMedicamento${i}" class="select-medicamento">
                ${document.getElementById('selectMedicamento').innerHTML}
            </select>
        </div>
        <label>Receta: </label>
        <textarea class="txt-area-medicamento txt-area-create text-left"></textarea>
        <button onclick="eliminarMedicamento(${i})" class="btn btn-danger fw-semibold">Eliminar</button>
    </div>`;
    i++;
    nuevoMedicamento.innerHTML += pintar;
}

function eliminarMedicamento(numero) {
    let medicamento = document.getElementById(`idMedicamento${numero}`);
    if (medicamento) {
        medicamento.classList.add('animacion-salida-eliminar');
        medicamento.addEventListener('animationend', function handleAnimationEnd() {

            medicamento.remove();
            medicamento.removeEventListener('animationend', handleAnimationEnd);
        });
    }
}

function capturarValoresMedicamentos() {
    const medicamentosCargados = [];
    const bloques = document.querySelectorAll('.capturarValorMedicamento');

    bloques.forEach((bloque) => {
        const idMedicamento = bloque.querySelector('.select-medicamento').value;
        const textoMedicamento = bloque.querySelector('.txt-area-medicamento').value;
        const idReceElement = bloque.querySelector('.idRec');
        const idRece = idReceElement ? idReceElement.value || '' : '';

        if (idMedicamento != '' && textoMedicamento != '') {
            medicamentosCargados.push({ idMedicamento, textoMedicamento, idRece });
        }

    });
    return medicamentosCargados;
}

// ---------------------------------------- alergias ------------------------------

function nuevaAlergia() {
    let nuevaAlergia = document.getElementById('nueva-alergia');
    let idAlergia = `idAlergia${alergiaCounter}`;
    let pintar = `
    <div id="${idAlergia}" class="capturarValorAlergias animacion-entrada bg-light d-flex flex-column align-items-start p-5 gap-4 border border-dark">
        <h3 class="text-center">Alergias</h3>
        <label>Nombre: </label>
        <input class="nombre-alergia" type="text" />
        <label>Importancia
            <select class="select-alergia"> 
                <option>Leve</option>
                <option>Normal</option>
                <option>Alta</option>
            </select>
        </label>
        <div class="d-flex gap-4">
        <label>Desde: 
            <input class="desde-alergia" type="date" name=""/>
        </label>
        <label>Hasta: 
            <input class="hasta-alergia" type="date" name=""/>
        </label>
        <label> Vigente
            <input type="checkbox"/>
        </label>
        </div>
            <button onclick="eliminarAlergia('${idAlergia}')" class="btn btn-danger fw-semibold">Eliminar</button>
    </div>`
    alergiaCounter++;
    nuevaAlergia.innerHTML += pintar;
}

function eliminarAlergia(idAlergia) {
    let alergia = document.getElementById(idAlergia);
    if (alergia) {
        alergia.classList.add('animacion-salida-eliminar');
        alergia.addEventListener('animationend', function handleAnimationEnd() {
            
            alergia.remove();
            alergia.removeEventListener('animationend', handleAnimationEnd);
        });
    }
}

function capturarValoresAlergias() {
    const alergiasCargadas = [];
    const bloques = document.querySelectorAll('.capturarValorAlergias');

    bloques.forEach((bloque) => {
        const nombreAlergia = bloque.querySelector('.nombre-alergia').value;
        const importanciaAlergia = bloque.querySelector('.select-alergia').value;
        const idAlerElement = bloque.querySelector('.idAler');
        const idAler = idAlerElement ? idAlerElement.value || '' : '';
        let desdeAlergia = bloque.querySelector('.desde-alergia').value;
        let hastaAlergia = bloque.querySelector('.hasta-alergia').value;

        // el vigente unicamente va a poner disabled o neabled el campo de fechaHasta
        //const vigenteAlergia = bloque.querySelector('.vigente-alergia').checked;

        if (nombreAlergia != '' && importanciaAlergia != '' && desdeAlergia != '' && desdeAlergia != '') {
            alergiasCargadas.push({ nombreAlergia, importanciaAlergia, desdeAlergia, hastaAlergia, idAler });
        } else if (nombreAlergia != '' && importanciaAlergia != '' && desdeAlergia != '') {
            hastaAlergia = null
            alergiasCargadas.push({ nombreAlergia, importanciaAlergia, desdeAlergia, hastaAlergia, idAler });
        } else if (nombreAlergia != '' && importanciaAlergia != '') {
            desdeAlergia = null
            hastaAlergia = null
            alergiasCargadas.push({ nombreAlergia, importanciaAlergia, desdeAlergia, hastaAlergia, idAler });
        }


    });
    return alergiasCargadas;
}


// ----------------------------------------- hábitos -------------------------------
function nuevoHabito() {
    let nuevoHabito = document.getElementById('nuevo-habito');
    let idHabito = `idHabito${habitoCounter}`;
    let pintar = `
    <div id="${idHabito}" class="capturarValorHabitos animacion-entrada bg-light d-flex flex-column align-items-start p-5 gap-4 border border-dark">
        <h3 class="text-center">Habitos</h3>
        <label>Detalles: </label>
        <textarea class="txt-area-create text-left texto-habito"></textarea>
        <div class="d-flex gap-4">
            <label>Desde: 
                <input type="date" class="desde-habito" name=""/>
            </label>
            <label>Hasta: 
                <input type="date" class="hasta-habito" name=""/>
            </label>
            <label>Vigente
                <input type="checkbox"/>
            </label>
        </div>
        <button onclick="eliminarHabito('${idHabito}')" class="btn btn-danger fw-semibold">Eliminar</button>
    </div>`
    habitoCounter++;
    nuevoHabito.innerHTML += pintar;
}

function eliminarHabito(idHabito) {
    let habito = document.getElementById(idHabito);
    if (habito) {
        habito.classList.add('animacion-salida-eliminar');
        habito.addEventListener('animationend', function handleAnimationEnd() {
            habito.remove();
            habito.removeEventListener('animationend', handleAnimationEnd);
        });
    }
}

function cargarValoresHabitos() {
    const habitosCargados = [];
    const bloques = document.querySelectorAll('.capturarValorHabitos');

    bloques.forEach((bloque) => {
        const textoHabito = bloque.querySelector('.texto-habito').value;
        let desdeHabito = bloque.querySelector('.desde-habito').value;
        let hastaHabito = bloque.querySelector('.hasta-habito').value;
        const idHabElement = bloque.querySelector('.idHab');
        const idHab = idHabElement ? idHabElement.value || '' : '';
        // el vigente unicamente va a poner disabled o neabled el campo de fechaHasta
        //const vigenteAlergia = bloque.querySelector('.vigente-alergia').checked;

        if (textoHabito != '' && desdeHabito != '' && hastaHabito != '') {
            habitosCargados.push({ textoHabito, desdeHabito, hastaHabito, idHab });
        } else if (textoHabito != '' && desdeHabito != '') {
            hastaHabito = null
            habitosCargados.push({ textoHabito, desdeHabito, hastaHabito, idHab });
        } else if (textoHabito != '') {
            desdeHabito = null
            hastaHabito = null
            habitosCargados.push({ textoHabito, desdeHabito, hastaHabito, idHab });
        }


    });
    return habitosCargados;
}


// ----------------------------- antecedentes --------------------------------------

function nuevoAntecedente() {
    let nuevoAnteccedente = document.getElementById('nuevo-antecedente');
    let idAntecedente = `idAntecedente${antecedenteCounter}`;
    let pintar = `
    <div id="${idAntecedente}" class="capturarValorAntecedente animacion-entrada bg-light d-flex flex-column align-items-start p-5 gap-4 border border-dark">
        <h3 class="text-center">Antecedente</h3>
        <label>Detalles: </label>
        <textarea class="txt-area-create text-left texto-antecedente"></textarea>
        <div class="d-flex gap-4">
            <label>Desde: 
                <input type="date" class="desde-antecedente" name=""/>
            </label>
            <label>Hasta: 
                <input type="date" class="hasta-antecedente" name=""/>
            </label>
            <label>Vigente
                <input type="checkbox"/>
            </label>
        </div>
        <button onclick="eliminarAntecedente('${idAntecedente}')" class="btn btn-danger fw-semibold">Eliminar</button>
    </div>`
    antecedenteCounter++;
    nuevoAnteccedente.innerHTML += pintar;
}

function eliminarAntecedente(idAntecedente) {
    let antecedente = document.getElementById(idAntecedente);
    if (antecedente) {
        
        antecedente.classList.add('animacion-salida-eliminar');
        antecedente.addEventListener('animationend', function handleAnimationEnd() {
            
            antecedente.remove();
            antecedente.removeEventListener('animationend', handleAnimationEnd);
        });
    }
}


function cargarValoresAntecedentes() {
    const antecedentesCargados = [];
    const bloques = document.querySelectorAll('.capturarValorAntecedente');

    bloques.forEach((bloque) => {
        const textoAntecedente = bloque.querySelector('.texto-antecedente').value;
        const idAnteElement = bloque.querySelector('.idAnte');
        const idAnte = idAnteElement ? idAnteElement.value || '' : '';
        let desdeAntecedente = bloque.querySelector('.desde-antecedente').value;
        let hastaAntecedente = bloque.querySelector('.hasta-antecedente').value;

        // el vigente unicamente va a poner disabled o neabled el campo de fechaHasta
        //const vigenteAlergia = bloque.querySelector('.vigente-alergia').checked;

        if (textoAntecedente != '' && desdeAntecedente != '' && hastaAntecedente != '') {
            antecedentesCargados.push({ textoAntecedente, desdeAntecedente, hastaAntecedente, idAnte });
        } else if (textoAntecedente != '' && desdeAntecedente != '') {
            hastaAntecedente = null;
            antecedentesCargados.push({ textoAntecedente, desdeAntecedente, hastaAntecedente, idAnte });
        } else if (textoAntecedente != '') {
            desdeAntecedente = null;
            hastaAntecedente = null;
            antecedentesCargados.push({ textoAntecedente, desdeAntecedente, hastaAntecedente, idAnte });
        }


    });
    return antecedentesCargados;
}



function guardarHistorial() {

    Swal.fire({
        title: '¿Deseas finalizar la edicion?',
        text: "¡La consulta se guardara con los cambios realizados!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, finalizar edicion'
    }).then((result) => {
        if (result.isConfirmed) {
            let vcd = capturarValoresDiagnosticos();
            let ec = capturarValorEvolucion();

            if (vcd.length < 1) {
                toastr.error('Debe ingresar al menos un diagnostico', 'Servidor', {
                    progressBar: true,
                    positionClass: 'toast-top-center',
                });
                return;
            } else if (ec == '<p><br></p>') {
                toastr.error('Debe ingresar la evolucion', 'Servidor', {
                    progressBar: true,
                    positionClass: 'toast-top-center',
                });
                return;
            }

            let med = capturarValoresMedicamentos();

            let ale = capturarValoresAlergias();

            let hab = cargarValoresHabitos();

            let ante = cargarValoresAntecedentes();

            let test = [vcd, ec, med, ale, hab, ante, numero]
            console.log('----------------------------test------------------------')
            console.log(test)
            console.log(numero)
            console.log('--------------------------------------------------------')
            postServer(vcd, ec, med, ale, hab, ante, numero)
            toastr.success('Regresando a la agenda', 'Consulta finalizada con exito', {
                progressBar: true,
                positionClass: 'toast-top-center',
                /*onHidden: function () {
                    window.location.href = '/turnos/agenda';
                }*/
            });

        }
    });
}

function postServer(diagnosticos, evolucion, medicamentos, alergias, habitos, antecedentes, numero) {
    let historial = {
        diagnosticos: diagnosticos,
        evolucion: evolucion,
        medicamentos: medicamentos,
        alergias: alergias,
        habitos: habitos,
        antecedentes: antecedentes,
        numero_turno: numero
    }


    fetch(`/turnos/actualizarHCE`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            historial: historial
        })
    })
        .then(response => {

            return response.json();
        })
        .then(data => {

            if (data.success) {

            } else {
                console.error(data.message || 'fallo en el server');
            }
        })
        .catch(error => {
            console.error('Error al updatear', error);
        })
}


async function drop(tipo, data) {
    fetch(`/turnos/dropDatabase`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            data: data,
            tipo: tipo
        })
    })
        .then(response => {

            return response.json();
        })
        .then(data => {

            if (data.success) {

            } else {
                console.error(data.message || 'fallo en el server');
            }
        })
        .catch(error => {
            console.error('Error al updatear', error);
        })
}

// ------------------------------------ viejo -----------------------------
/*
function mostrarAntecedente() {
    document.getElementById('detalleAntecedentes').innerHTML = (detalleAntecedente[detalleAntecedente.length - 1]);
    document.getElementById('desdeAntecedentes').value = (desdeAntecedente[desdeAntecedente.length - 1]);
    document.getElementById('hastaAntecedentes').value = (hastaAntecedente[hastaAntecedente.length - 1]);
}

function mostrarHabito() {
    document.getElementById('detalleHabitos').innerHTML = (detalleHabito[detalleHabito.length - 1]);
    document.getElementById('desdeHabitos').value = (desdeHabito[desdeHabito.length - 1]);
    document.getElementById('hastaHabitos').value = (hastaHabito[hastaHabito.length - 1]);
}


function mostrarAlergia() {
    document.getElementById('nombreAlergia').value = nombreAlergia[nombreAlergia.length - 1];
    document.getElementById('importanciaAlergia').value = (importanciaAlergia[importanciaAlergia.length - 1]);
    document.getElementById('desdeAlergia').value = (desdeAlergia[desdeAlergia.length - 1]);
    document.getElementById('hastaAlergia').value = (hastaAlergia[hastaAlergia.length - 1]);
}

function mostrarMedicamento() {
    document.getElementById('selectMedicamento').value = idMedicamento[idMedicamento.length - 1]
}

/*function mostrarDatos() {
    mostrarDiagnostico()
    mostrarAntecedente()
    mostrarHabito()
    mostrarAlergia()
    mostrarMedicamento()
}

//let numerito = numero
// var historial = {
//     diagnosticos: [],
//     evolucion: '',
//     medicamentos: [],
//     antecedentes: [],
//     habitos: [],
//     alergias: [],
//     numero_turno: numerito,
//     id_receta: ''
// }

function clean() {
    historial = {
        diagnosticos: [],
        evolucion: '',
        medicamentos: [],
        antecedentes: [],
        habitos: [],
        alergias: [],
    }

    //agregar limpieza de campos
}

function cargarDiagnostico() {
    let detalle = document.getElementById('diagnosticoDetalle').value
    let estado = document.getElementById('estadoDiagnostico').value

    // controlar que complete los campos
    if (detalle == '' || estado == '') {

        toastr.error('Complete todos los campos', 'Servidor', {
            "progressBar": true,
            "positionClass": "toast-top-center"
        });


    } else {
        toastr.success('Diagnositco guardado con exito!', 'Servidor:', {
            "progressBar": true,
            "positionClass": "toast-top-center"
        });

        let data = { detalle: detalle, estado: estado }
        historial.diagnosticos.push(data)
        document.getElementById('btnDiagnostico').disabled = true
        document.getElementById('diagnosticoDetalle').disabled = true
        document.getElementById('estadoDiagnostico').disabled = true;
    }    
}


function cargarEvolucion() {
    let detalle = quill.root.innerHTML;
    
    document.getElementById('btnEvolucion').disabled = true
    
    //disabled= true al terminar
    if (detalle == '') {
        toastr.error('Complete los campos', 'Servidor', {
            "progressBar": true,
            "positionClass": "toast-top-center"
        });
    } else {
        toastr.success('Evolucion guardada con exito!', 'Servidor:', {
            "progressBar": true,
            "positionClass": "toast-top-center"
        });
        historial.evolucion = detalle
        quill.disable()
    }
}

function cargarMedicamento() {

    let valor = document.getElementById('selectMedicamento').value
    let nombre = document.getElementById('selectMedicamento').options[document.getElementById('selectMedicamento').selectedIndex].text

    // controlar que complete los campos
    if (valor == '') {

        toastr.error('Seleccione al menos un medicamento', 'Servidor', {
            "progressBar": true,
            "positionClass": "toast-top-center"
        });


    } else {
        toastr.success('Medicamento guardado con exito!', 'Servidor:', {
            "progressBar": true,
            "positionClass": "toast-top-center"
        });
        let data = { nombre: nombre, valor: parseInt(valor) }

        historial.medicamentos.push(data)
        historial.id_receta = idreceta[idreceta.length - 1]
        document.getElementById('btnMedicamento').disabled = true
        document.getElementById('selectMedicamento').disabled = true
    }


}

function cargarAntecedentes() {
    let detalle = document.getElementById('detalleAntecedentes').value
    let fdesde = document.getElementById('desdeAntecedentes').value
    let fhasta = document.getElementById('hastaAntecedentes').value

    // controlar que complete los campos
    if (detalle == '' || fdesde == '' || fhasta == '') {
        toastr.error('Complete todos los campos', 'Servidor', {
            "progressBar": true,
            "positionClass": "toast-top-center"
        });

    } else if (fdesde > fhasta) { // logica para las fechas
        toastr.error('La fecha "Hasta" no puede ser menor que la fecha "Desde"', 'Servidor', {
            "progressBar": true,
            "positionClass": "toast-top-center"
        });

    } else {
        toastr.success('Antecedente guardado con exito!', 'Servidor:', {
            "progressBar": true,
            "positionClass": "toast-top-center"
        });

        let data = { detalle: detalle, fdesde: fdesde, fhasta: fhasta }
        historial.antecedentes.push(data)
        document.getElementById('btnAntecedentes').disabled = true
        document.getElementById('detalleAntecedentes').disabled = true
        document.getElementById('desdeAntecedentes').disabled = true
        document.getElementById('hastaAntecedentes').disabled = true
    }
}

function cargarHabitos() {
    let detalle = document.getElementById('detalleHabitos').value
    let fdesde = document.getElementById('desdeHabitos').value
    let fhasta = document.getElementById('hastaHabitos').value

    // controlar que complete los campos
    if (detalle == '' || fdesde == '' || fhasta == '') {
        toastr.error('Complete todos los campos', 'Servidor', {
            "progressBar": true,
            "positionClass": "toast-top-center"
        });

    } else if (fdesde > fhasta) { // logica para las fechas
        toastr.error('La fecha "Hasta" no puede ser menor que la fecha "Desde"', 'Servidor', {
            "progressBar": true,
            "positionClass": "toast-top-center"
        });

    } else {
        toastr.success('Habito guardado con exito!', 'Servidor:', {
            "progressBar": true,
            "positionClass": "toast-top-center"
        });

        let data = { detalle: detalle, fdesde: fdesde, fhasta: fhasta }
        historial.habitos.push(data)
        document.getElementById('btnHabitos').disabled = true
        document.getElementById('detalleHabitos').disabled = true
        document.getElementById('desdeHabitos').disabled = true
        document.getElementById('hastaHabitos').disabled = true
    }

    
}

function cargarAlergia() {
    let nombre = document.getElementById('nombreAlergia').value
    let fdesde = document.getElementById('desdeAlergia').value
    let fhasta = document.getElementById('hastaAlergia').value
    let importancia = document.getElementById('importanciaAlergia').value

    // controlar que complete los campos
    if (nombre == '' || fdesde == '' || fhasta == '' || importancia == '') {
        toastr.error('Complete todos los campos', 'Servidor', {
            "progressBar": true,
            "positionClass": "toast-top-center"
        });

    } else if (fdesde > fhasta) { // logica para las fechas
        toastr.error('La fecha "Hasta" no puede ser menor que la fecha "Desde"', 'Servidor', {
            "progressBar": true,
            "positionClass": "toast-top-center"
        });

    } else {
        toastr.success('Habito guardado con exito!', 'Servidor:', {
            "progressBar": true,
            "positionClass": "toast-top-center"
        });

        let data = { nombre: nombre, fdesde: fdesde, fhasta: fhasta, importancia: importancia }
        historial.alergias.push(data)
        document.getElementById('btnAlergia').disabled = true
        document.getElementById('nombreAlergia').disabled = true
        document.getElementById('desdeAlergia').disabled = true
        document.getElementById('hastaAlergia').disabled = true
        document.getElementById('importanciaAlergia').disabled = true
    }

    
}

function updateHistorial() {
    fetch('/turnos/actualizarHCE', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            historial
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                toastr.success('Historial guardado con exito', 'Servidor:', {
                    "progressBar": true,
                    "positionClass": "toast-top-center"
                });
                setTimeout(function() { 
                    window.location.href = '/turnos/agenda'; 
                }, 3000);
            } else {
                alert("ocurrio un error al guardar el historial ");
            }
        })
        .catch(error => console.error('Error:', error));
    clean()
}
try {
    separador()
} catch (error) {
    
}
*/
