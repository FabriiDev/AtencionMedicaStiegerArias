// ------------------- libreria txt enriquesido --------------- 
const quill = new Quill('#editor', {
    theme: 'snow'
});
quill.clipboard.dangerouslyPasteHTML(Evolucion123);

// ------------------------------------------------------------ 

let indiceDiagnostico = 0
let estadoDiagnostico = []
let detalleDiagnostico = []

let nombreMedicamento = []
let idMedicamento = []
let idreceta = []

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

    detalleDiagnostico = turnoS.diagnostico.split('|')
    estadoDiagnostico = turnoS.estado_diagnostico.split('|')

    nombreMedicamento = turnoS.nombre_medicamento.split('|')
    idMedicamento = turnoS.id_medicamento.split('|')
    idreceta = turnoS.id_receta.split('|')

    detalleAntecedente = turnoS.antecedente.split('|')
    desdeAntecedente = turnoS.fecha_desde_antecedente.split('|')
    hastaAntecedente = turnoS.fecha_hasta_antecedente.split('|')

    detalleHabito = turnoS.habito.split('|')
    desdeHabito = turnoS.fecha_desde_habito.split('|')
    hastaHabito = turnoS.fecha_hasta_habito.split('|')

    nombreAlergia = turnoS.nombre_alergia.split('|')
    importanciaAlergia = turnoS.importancia_alergia.split('|')
    desdeAlergia = turnoS.fecha_desde_alergia.split('|')
    hastaAlergia = turnoS.fecha_hasta_alergia.split('|')
}

//trae los datos a editar
function mostrarDiagnostico() {

    document.getElementById('estadoDiagnostico').value = (estadoDiagnostico[estadoDiagnostico.length - 1]);

    document.getElementById('diagnosticoDetalle').innerHTML = (detalleDiagnostico[detalleDiagnostico.length - 1])

}

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

function mostrarDatos() {
    mostrarDiagnostico()
    mostrarAntecedente()
    mostrarHabito()
    mostrarAlergia()
    mostrarMedicamento()
}

let numerito = numero
var historial = {
    diagnosticos: [],
    evolucion: '',
    medicamentos: [],
    antecedentes: [],
    habitos: [],
    alergias: [],
    numero_turno: numerito,
    id_receta: ''
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
        console.log(valor)
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
        console.log('antesCargar')
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
        console.log('habitoCargar')
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
        console.log('alergiaCargar')
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
separador()
mostrarDatos()
