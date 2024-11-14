// ------------------- libreria txt enriquesido --------------- 
const quill = new Quill('#editor', {
    theme: 'snow'
});
quill.clipboard.dangerouslyPasteHTML(laTemplate);


// ------------------------------------------------------------ 
let numerito = numero
var historial = {
    diagnosticos: [],
    evolucion: '',
    medicamentos: [],
    antecedentes: [],
    habitos: [],
    alergias: [],
    numero_turno: numerito
}

console.log(numerito)
console.log(numero)


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

    let detalle = quill.getText();
    
    
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


