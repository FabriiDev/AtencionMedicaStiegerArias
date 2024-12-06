// ------------------- libreria txt enriquesido --------------- 
const quill = new Quill('#editor', {
    theme: 'snow'
});
//quill.clipboard.dangerouslyPasteHTML(laTemplate);

function otroDiagnositoc(){
    let nuevoDiagnostico = document.getElementById('nuevo-diagnostico');
    let i = 1;
    let pintar = `
    <div id="idDiagnostico${i}"class="animacion color-primario-bg d-flex flex-column align-items-start p-5 gap-4 border-bottom border-dark text-light">
        <h3>Diagnostico (obligatorio)</h3>
        <div class="d-flex gap-2">
            <label>Estado: </label>
            <select>
                <option>Preeliminar </option>
                <option>Confirmado</option>
        </select>
        </div>
        <label class="text-center">Detalles: 
        </label>
        <textarea class="txt-area-create text-left"></textarea>
        
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

function nuevoMedicamento(){
    let nuevoMedicamento = document.getElementById('nuevo-medicamento');
    let i = 1;
    let pintar = `
    <div id="idMedicamento${i}"class="animacion bg-light d-flex flex-column align-items-start p-5 gap-4 border border-dark">
        <h3 class="text-center">Medicamentos</h3>
        <div class="d-flex gap-2">
            <label>Seleccione medicamento: 
            </label>
            <select>
                <option>Medicamento 1 </option>
                <option>Medicamento 2 </option>
                <option>Medicamento 3 </option>
            </select>
        </div>
        <label>Receta: </label>
        <textarea class="txt-area-create text-left">
        </textarea>
        <button onclick="eliminarMedicamento(${i})" class="btn btn-danger fw-semibold">eliminar</button>
    </div>`
    i++;
    nuevoMedicamento.innerHTML += pintar;
}

function eliminarMedicamento(numero) {
    let medicamento = document.getElementById(`idMedicamento${numero}`);
    if (medicamento) { medicamento.remove(); }
}

function nuevaAlergia(){
    let nuevaAlergia = document.getElementById('nueva-alergia');
    let i = 1;
    let pintar = `
    <div id="idAlergia${i}" class="animacion bg-light d-flex flex-column align-items-start p-5 gap-4 border border-dark">
        <h3 class="text-center">Alergias</h3>
        <label>Nombre: </label>
        <input type="text" />
        <label>Importancia
            <select> 
                <option>Leve</option>
                <option>Normal</option>
                <option>Alta</option>
            </select>
        </label>
        <div class="d-flex gap-4">
        <label>Desde: 
            <input type="date" name=""/>
        </label>
        <label>Hasta: 
            <input type="date" name=""/>
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
    if (alergia) { alergia.remove(); }
}

function nuevoHabito() {
    let nuevoHabito = document.getElementById('nuevo-habito');
    let i = 1;
    let pintar = `
    <div id="idHabito${i}" class="animacion bg-light d-flex flex-column align-items-start p-5 gap-4 border border-dark">
        <h3 class="text-center">Habitos</h3>
        <label>Detalles: </label>
        <textarea class="txt-area-create text-left"></textarea>
        <div class="d-flex gap-4">
            <label>Desde: 
                <input type="date" name=""/>
            </label>
            <label>Hasta: 
                <input type="date" name=""/>
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
    if (habito) { habito.remove(); }
}

function nuevoAntecedente(){
    let nuevoAnteccedente = document.getElementById('nuevo-antecedente');
    let i = 1;
    let pintar = `
    <div id="idAntecedente${i}" class="animacion bg-light d-flex flex-column align-items-start p-5 gap-4 border border-dark">
        <h3 class="text-center">Antecedente</h3>
        <label>Detalles: </label>
        <textarea class="txt-area-create text-left"></textarea>
        <div class="d-flex gap-4">
            <label>Desde: 
                <input type="date" name=""/>
            </label>
            <label>Hasta: 
                <input type="date" name=""/>
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
    if (antecedente) { antecedente.remove(); }
}


function toggleContent(id) {
    const contenido = document.getElementById(id);
    if (contenido.style.display === 'none' || contenido.style.display === '') {
        contenido.style.display = 'block';
        contenido.classList.add('contenido-visible');
    } else {
        contenido.style.display = 'none';
        contenido.classList.remove('contenido-visible');
    }
}


// ---------------------##################################--------------------------------------- 
//let numerito = numero
var historial = {
    diagnosticos: [],
    evolucion: '',
    medicamentos: [],
    antecedentes: [],
    habitos: [],
    alergias: [],
    //numero_turno: numerito
}


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
    }



    document.getElementById('diagnosticoDetalle').value = "";
    document.getElementById('estadoDiagnostico').value = "";
}



function cargarEvolucion() {

    let detalle = quill.root.innerHTML;
    
    
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
        document.getElementById('btnEvolucion').disabled = true

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
    }

    document.getElementById('selectMedicamento').value = "";
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
    }

    document.getElementById('detalleAntecedentes').value = "";
    document.getElementById('desdeAntecedentes').value = "";
    document.getElementById('hastaAntecedentes').value = "";
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
    }

    document.getElementById('detalleHabitos').value = "";
    document.getElementById('desdeHabitos').value = "";
    document.getElementById('hastaHabitos').value = "";
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
    }

    document.getElementById('nombreAlergia').value = '';
    document.getElementById('desdeAlergia').value = '';
    document.getElementById('hastaAlergia').value = '';
    document.getElementById('importanciaAlergia').value = '';
}

function guardarHistorial() {

    let obligatorios = false
    if (historial.diagnosticos[0] && historial.diagnosticos[0] != '' && historial.evolucion != '' && historial.diagnosticos[0].estado != "") {
        obligatorios = true
    }

    if (obligatorios) {

        fetch('/turnos/guardarHCE', {
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
                    // redirigir a la agenda
                    // o mostrar el historial recien cargado? onda mandar al HCE 


                } else {
                    alert("ocurrio un error al guardar el historial ");
                }
            })
            .catch(error => console.error('Error:', error));
            setTimeout(function() { 
                window.location.href = '/turnos/agenda'; 
            }, 3000);
    } else {
        toastr.error('El diagnostico y la evolucion, son obligatorios', 'Servidor', {
            "progressBar": true,
            "positionClass": "toast-top-center"
        });
    }

    clean()

}


