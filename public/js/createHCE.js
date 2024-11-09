// ------------------- libreria txt enriquesido --------------- 
const quill = new Quill('#editor', {
    theme: 'snow'
});

// ------------------------------------------------------------ 
let numerito=numero
console.log('numerito:')
console.log(numerito)
//toastr.info('info');
var historial = {
    diagnosticos: [],
    evolucion: '',
    medicamentos: [],
    antecedentes: [],
    habitos: [],
    alergias: [],
    numero_turno:numerito
}

function clean(){
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
    console.log('diagnosticoCargar')
    let detalle = document.getElementById('diagnosticoDetalle').value
    let estado = document.getElementById('estadoDiagnostico').value
    let data = { detalle: detalle, estado: estado }
    historial.diagnosticos.push(data)


}
    
quill.clipboard.dangerouslyPasteHTML(laTemplate);

function cargarEvolucion() {
    console.log('evolucionCargar')
    /* con esto se toma el texto con el formato html
    let conHTML = quill.root.innerHTML;
    console.log('texto con formato HTML: ', detalle)
    */
    let detalle = quill.getText();
    historial.evolucion = detalle
    console.log('normal: ', detalle)
    

    //disabled= true al terminar
}

function cargarMedicamento() {
    console.log('mesiCargar')
    let valor = document.getElementById('selectMedicamento').value
    let nombre= document.getElementById('selectMedicamento').options[document.getElementById('selectMedicamento').selectedIndex].text
    let data = { nombre: nombre, valor:parseInt(valor) }
    console.log(valor)
    
    historial.medicamentos.push(data)
}

function cargarAntecedentes() {
    console.log('antesCargar')
    let detalle = document.getElementById('detalleAntecedentes').value
    let fdesde = document.getElementById('desdeAntecedentes').value
    let fhasta = document.getElementById('hastaAntecedentes').value
    let data = { detalle: detalle, fdesde: fdesde, fhasta: fhasta }
    historial.antecedentes.push(data)
}

function cargarHabitos() {
    console.log('habitoCargar')
    let detalle = document.getElementById('detalleHabitos').value
    let fdesde = document.getElementById('desdeHabitos').value
    let fhasta = document.getElementById('hastaHabitos').value
    let data = { detalle: detalle, fdesde: fdesde, fhasta: fhasta }
    historial.habitos.push(data)
}

function cargarAlergia() {
    console.log('alergiaCargar')
    let nombre = document.getElementById('nombreAlergia').value
    let fdesde = document.getElementById('desdeAlergia').value
    let fhasta = document.getElementById('hastaAlergia').value
    let importancia = document.getElementById('importanciaAlergia').value
    let data = { nombre: nombre, fdesde: fdesde, fhasta: fhasta, importancia:importancia }
    historial.alergias.push(data)
}

function guardarHistorial() {

    console.log(historial)

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
                    alert("Historial guardado");
                    // redirigir a la agenda
                    console.log(data)

                } else {
                    alert("ocurrio un error al guardar el historial ");
                }
            })
            .catch(error => console.error('Error:', error));
    } else {
        alert('el diagnostico y evolucion son campos obligatorios')
    }

    clean()

}


