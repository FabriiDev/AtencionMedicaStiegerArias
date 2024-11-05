
var historial = {
    diagnosticos: [],
    evolucion: '',
    medicamentos: [],
    antecedentes: [],
    habitos: [],
    alergias: [],
}

function cargarDiagnostico() {
    console.log('diagnosticoCargar')
    let detalle = document.getElementById('diagnosticoDetalle').value
    let estado = document.getElementById('estadoDiagnostico').value
    let data = { detalle: detalle, estado: estado }
    historial.diagnosticos.push(data)


}

function cargarEvolucion() {
    console.log('evolucionCargar')
    let detalle = document.getElementById('evolucionDetalle').value
    historial.evolucion = detalle
    //disabled= true al terminar
}

function cargarMedicamento() {
    console.log('mesiCargar')
    let nombre = document.getElementById('nombreMedicamento').value
    let data = { nombre: nombre }
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
    let detalle = document.getElementById('detalleAlergia').value
    let data = { nombre: nombre, fdesde: fdesde, fhasta: fhasta, detalle }
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

    historial = {
        diagnosticos: [],
        evolucion: '',
        medicamentos: [],
        antecedentes: [],
        habitos: [],
        alergias: [],
    }

}


