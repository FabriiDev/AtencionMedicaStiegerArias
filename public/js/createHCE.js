
var historial = {

    diagnosticos: [],

    evolucion: '',

    medicamentos: [],

    antecedentes: [],

    habitos:[],

    alergias: [],
}



function guardarDiagnostico() {
    console.log('diagnosticoGuardar')
    let detalle = document.getElementById('diagnosticoDetalle').value
    let estado = document.getElementById('estadoDiagnostico').value
    let data = { detalle: detalle, estado: estado }
    historial.diagnosticos.push(data)


}



function guardarEvolucion() {
    console.log('evoguardar')
    let detalle = document.getElementById('evolucionDetalle').value




    //disabled= true al terminar
}

function medicamento() {
    console.log('mesi')
    document.getElementById('nombreMedicamento').disabled = false
    document.getElementById('detalleMedicamento').disabled = false
}

function guardarMedicamento() {
    console.log('mesiGuardar')
    let nombre = document.getElementById('nombreMedicamento').value
    let detalle = document.getElementById('detalleMedicamento').value
    let data = { nombre: nombre, detalle: detalle }
    historial.medicamentos.push(data)
}

function antecedentes() {
    console.log('ante')
    document.getElementById('detalleAntecedentes').disabled = false
    document.getElementById('desdeAntecedentes').disabled = false
    document.getElementById('hastaAntecedentes').disabled = false
}

function guardarAntecedentes() {
    console.log('antesGuardar')
    let detalle = document.getElementById('detalleAntecedentes').value
    let fdesde = document.getElementById('desdeAntecedentes').value
    let fhasta = document.getElementById('hastaAntecedentes').value
    let data={detalle:detalle,fdesde:fdesde,fhasta:fhasta}
    historial.antecedentes.push(data)
}


function habitos() {
    console.log('habi')
    document.getElementById('detalleHabitos').disabled = false
    document.getElementById('desdeHabitos').disabled = false
    document.getElementById('hastaHabitos').disabled = false
}

function guardarHabitos() {
    console.log('habitoGuardar')
    let detalle = document.getElementById('detalleHabitos').value
    let fdesde = document.getElementById('desdeHabitos').value
    let fhasta = document.getElementById('hastaHabitos').value
    let data={detalle:detalle,fdesde:fdesde,fhasta:fhasta}
    historial.habitos.push(data)
}

function alergia() {
    console.log('alergia')
    document.getElementById('nombreAlergia').disabled = false
    document.getElementById('desdeAlergia').disabled = false
    document.getElementById('hastaAlergia').disabled = false
    document.getElementById('detalleAlergia').disabled = false
}

function guardarAlergia() {
    console.log('alergiaGuardar')
    let nombre = document.getElementById('nombreAlergia').value
    let fdesde = document.getElementById('desdeAlergia').value
    let fhasta = document.getElementById('hastaAlergia').value
    let detalle = document.getElementById('detalleAlergia').value
    let data={nombre:nombre,fdesde:fdesde,fhasta:fhasta,detalle}
    historial.alergias.push(data)
}










/*

#detalleAlergia
#hastaAlergia
#desdeAlergia
#nombreAlergia
#btnAlergia

#hastaHabitos
#desdeHabitos
#detalleHabitos
#btnHabitos

#hastaAntecedentes
#desdeAntecedentes
#detalleAntecedentes
#btnAntecedentes

#detalleMedicamento
#nombreMedicamento
#btnMedicamento

#evolucionDetalle
#btnEvolucion

#diagnosticoDetalle
#btnDiagnostico
#estadoDiagnostico

#nombreAlergia
#hastaAlergia
#desdeAlergia
#detalleAlergia
#btnAlergia
*/ 