// ------------------- libreria txt enriquesido --------------- 
const quill = new Quill('#editor', {
    theme: 'snow'
});
//quill.clipboard.dangerouslyPasteHTML(laTemplate);
console.log('tunrazos', turnazo);
// ------------------------ diagnosticos ---------------------------------------
function otroDiagnositoc() {
    let nuevoDiagnostico = document.getElementById('nuevo-diagnostico');
    let i = 1;
    let pintar = `
    <div id="idDiagnostico${i}" class="capturarValorDiagnostico animacion color-primario-bg d-flex flex-column align-items-start p-5 gap-4 border-bottom border-dark text-light">
        <h3>Diagnostico (obligatorio)</h3>
        <div class="d-flex gap-2">
            <label>Estado: </label>
            <select class="select-diagnostico">
                <option>Preeliminar </option>
                <option>Confirmado</option>
        </select>
        </div>
        <label class="text-center">Detalles: 
        </label>
        <textarea class="txt-area-create txt-area-diagnostico text-left"></textarea>
        
        <button class="btn btn-danger" onclick="(eliminarDiagnostico(${i}))">Eliminar</button>
    </div>
`
    i++;
    nuevoDiagnostico.innerHTML += pintar;
}

function eliminarDiagnostico(numero) {
    let diagnostico = document.getElementById(`idDiagnostico${numero}`);
    if (diagnostico) { diagnostico.remove(); }
}

function capturarValoresDiagnosticos() {
    const diagnosticosCargados = [];
    const bloques = document.querySelectorAll('.capturarValorDiagnostico');

    bloques.forEach((bloque) => {
        const estado = bloque.querySelector('.select-diagnostico').value;
        const detalles = bloque.querySelector('.txt-area-diagnostico').value;
        if (estado != '' && detalles != '') {
            diagnosticosCargados.push({ estado, detalles });
        }

    });
    console.log('Diagnostiocs cargados');
    console.log(diagnosticosCargados);
    return diagnosticosCargados;
}



// ----------------------------------------- evolucion -----------------------------------
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
    console.log('Evolucion cargada');
    console.log(evolucionEnriquecida);
    return evolucionEnriquecida;
}

// ------------------------------ medicamentos -------------------------------
function llenarSelectMedicamento() {
    let todosMedicamentos
    for (const element of medicamentos) {
        todosMedicamentos = `
        <option value="${element.id_medicamento}">${element.nombre_medicamento}</option>
    `;
        document.getElementById('selectMedicamento').innerHTML += todosMedicamentos;
    }

}
llenarSelectMedicamento();

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
        if (idMedicamento != '' && textoMedicamento != '') {
            medicamentosCargados.push({ idMedicamento, textoMedicamento });
        }

    });
    console.log('Medicamentos cargados');
    console.log(medicamentosCargados);
    return medicamentosCargados;
}


// ---------------------------------------- alergias ------------------------------

function nuevaAlergia() {
    let nuevaAlergia = document.getElementById('nueva-alergia');
    let i = 1;
    let pintar = `
    <div id="idAlergia${i}" class="capturarValorAlergias animacion-entrada bg-light d-flex flex-column align-items-start p-5 gap-4 border border-dark">
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
            <button onclick="eliminarAlergia(${i})" class="btn btn-danger fw-semibold">Eliminar</button>
    </div>`
    i++;
    nuevaAlergia.innerHTML += pintar;
}

function eliminarAlergia(numero) {
    let alergia = document.getElementById(`idAlergia${numero}`);
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
        let desdeAlergia = bloque.querySelector('.desde-alergia').value;
        let hastaAlergia = bloque.querySelector('.hasta-alergia').value;

        // el vigente unicamente va a poner disabled o neabled el campo de fechaHasta
        //const vigenteAlergia = bloque.querySelector('.vigente-alergia').checked;

        if (nombreAlergia != '' && importanciaAlergia != '' && desdeAlergia != '' && desdeAlergia != '') {
            alergiasCargadas.push({ nombreAlergia, importanciaAlergia, desdeAlergia, hastaAlergia });
        } else if (nombreAlergia != '' && importanciaAlergia != '' && desdeAlergia != '') {
            hastaAlergia = '';
            alergiasCargadas.push({ nombreAlergia, importanciaAlergia, desdeAlergia, hastaAlergia });
        } else if (nombreAlergia != '' && importanciaAlergia != '') {
            desdeAlergia = '';
            hastaAlergia = '';
            alergiasCargadas.push({ nombreAlergia, importanciaAlergia, desdeAlergia, hastaAlergia });
        }


    });
    console.log('alergias cargadass');
    console.log(alergiasCargadas);
    return alergiasCargadas;
}
// ----------------------------------------- hábitos -------------------------------
function nuevoHabito() {
    let nuevoHabito = document.getElementById('nuevo-habito');
    let i = 1;
    let pintar = `
    <div id="idHabito${i}" class="capturarValorHabitos animacion-entrada bg-light d-flex flex-column align-items-start p-5 gap-4 border border-dark">
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
        <button onclick="eliminarHabito(${i})" class="btn btn-danger fw-semibold">Eliminar</button>
    </div>`
    i++;
    nuevoHabito.innerHTML += pintar;
}

function eliminarHabito(numero) {
    let habito = document.getElementById(`idHabito${numero}`);
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

        // el vigente unicamente va a poner disabled o neabled el campo de fechaHasta
        //const vigenteAlergia = bloque.querySelector('.vigente-alergia').checked;

        if (textoHabito != '' && desdeHabito != '' && hastaHabito != '') {
            habitosCargados.push({ textoHabito, desdeHabito, hastaHabito });
        } else if (textoHabito != '' && desdeHabito != '') {
            hastaHabito = '';
            habitosCargados.push({ textoHabito, desdeHabito, hastaHabito });
        } else if (textoHabito != '') {
            desdeHabito = '';
            hastaHabito = '';
            habitosCargados.push({ textoHabito, desdeHabito, hastaHabito });
        }


    });
    console.log('Habitos cargados');
    console.log(habitosCargados);
    return habitosCargados;
}

// ----------------------------- antecedentes --------------------------------------

function nuevoAntecedente() {
    let nuevoAnteccedente = document.getElementById('nuevo-antecedente');
    let i = 1;
    let pintar = `
    <div id="idAntecedente${i}" class="capturarValorAntecedente animacion-entrada bg-light d-flex flex-column align-items-start p-5 gap-4 border border-dark">
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
        <button onclick="eliminarAntecedente(${i})" class="btn btn-danger fw-semibold">Eliminar</button>
    </div>`
    i++;
    nuevoAnteccedente.innerHTML += pintar;
}

function eliminarAntecedente(numero) {
    let antecedente = document.getElementById(`idAntecedente${numero}`);
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
        let desdeAntecedente = bloque.querySelector('.desde-antecedente').value;
        let hastaAntecedente = bloque.querySelector('.hasta-antecedente').value;

        // el vigente unicamente va a poner disabled o neabled el campo de fechaHasta
        //const vigenteAlergia = bloque.querySelector('.vigente-alergia').checked;

        if (textoAntecedente != '' && desdeAntecedente != '' && hastaAntecedente != '') {
            antecedentesCargados.push({ textoAntecedente, desdeAntecedente, hastaAntecedente });
        } else if (textoAntecedente != '' && desdeAntecedente != '') {
            hastaAntecedente = '';
            antecedentesCargados.push({ textoAntecedente, desdeAntecedente, hastaAntecedente });
        } else if (textoAntecedente != '') {
            desdeAntecedente = '';
            hastaAntecedente = '';
            antecedentesCargados.push({ textoAntecedente, desdeAntecedente, hastaAntecedente });
        }


    });
    console.log('Antecedentes cargados');
    console.log(antecedentesCargados);
    return antecedentesCargados;
}


// ----------------------- abrir opcionales ---------------------------------
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



// --------------> btn guardar


function guardarHistorial() {
    Swal.fire({
        title: '¿Deseas finalizar la atencion?',
        text: "¡La consulta se guardara con los cambios realizados!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, finalizar atencion'
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

            capturarValoresMedicamentos();

            capturarValoresAlergias();

            cargarValoresHabitos();

            cargarValoresAntecedentes();

            toastr.success('Regresando a la agenda', 'Consulta finalizada con exito', {
                progressBar: true,
                positionClass: 'toast-top-center',
                onHidden: function () {
                    window.location.href = '/turnos/agenda';
                }
            });
            
        }
    });

}

// ---------------------##################################--------------------------------------- 