/*
#nombreMedicamento
*/


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
let nombreAlergia=[]
let importanciaAlergia = []
let desdeAlergia = []
let hastaAlergia = []

function separador() {

    detalleDiagnostico = turnoS.diagnostico.split('|')
    estadoDiagnostico = turnoS.estado_diagnostico.split('|')

    nombreMedicamento=turnoS.nombre_medicamento.split('|')

    detalleAntecedente=turnoS.antecedente.split('|')
    desdeAntecedente=turnoS.fecha_desde_antecedente.split('|')
    hastaAntecedente=turnoS.fecha_hasta_antecedente.split('|')

    detalleHabito=turnoS.habito.split('|')
    desdeHabito=turnoS.fecha_desde_habito.split('|')
    hastaHabito=turnoS.fecha_hasta_habito.split('|')

    nombreAlergia=turnoS.nombre_alergia.split('|')
    importanciaAlergia=turnoS.importancia_alergia.split('|')
    desdeAlergia=turnoS.fecha_desde_alergia.split('|')
    hastaAlergia=turnoS.fecha_hasta_alergia.split('|')

}

separador()


function adelante(valor) {
    console.log('valor switch:'+valor)


    switch (valor) {
        case 1:
            indiceDiagnostico++
            cDiagnostico()
            break;
        
        case 2:
            indiceAntecedente++
            cAntecedente()
            break;

        case 3:
            indiceHabito++
            cHabito()
            break;

        case 4:
            indiceAlergia++
            cAlergia()
            break;
        default:
            break;
    }

}

function cDiagnostico() {
    document.getElementById('estadoDiagnostico').innerHTML = detalleDiagnostico[indiceDiagnostico]
    if (estadoDiagnostico[indiceDiagnostico]) {
        document.getElementById('detalleDiagnostico').innerHTML = estadoDiagnostico[indiceDiagnostico]
    } else {
        document.getElementById('detalleDiagnostico').innerHTML = 'Preliminar'
    }
}

function cAntecedente(){
    document.getElementById('detalleAntecedente').innerHTML=detalleAntecedente[indiceAntecedente]
    document.getElementById('desdeAntecedente').innerHTML=desdeAntecedente[indiceAntecedente]
    document.getElementById('hastaAntecedente').innerHTML=hastaAntecedente[indiceAntecedente]
}

function cHabito(){
    document.getElementById('detalleHabito').innerHTML=detalleHabito[indiceHabito]
    document.getElementById('desdeHabito').innerHTML=desdeHabito[indiceHabito]
    document.getElementById('hastaHabito').innerHTML=hastaHabito[indiceHabito]
}


function cAlergia(){
    document.getElementById('nombreAlergia').innerHTML=nombreAlergia[indiceAlergia]
    document.getElementById('importanciaAlergia').innerHTML=importanciaAlergia[indiceAlergia]
    document.getElementById('desdeAlergia').innerHTML=desdeAlergia[indiceAlergia]
    document.getElementById('hastaAlergia').innerHTML=hastaAlergia[indiceAlergia]
}

function cargardatos() {
    fetch('/turnos/DNI', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            dni: turnoS.dni_paciente
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data) {
                let turnos = data.turno
                //puedeCambiar = data.turno[0].numero_turno || 'a';
                console.log(turnos)
                cargarSelect(turnos)

            }
        })
        .catch(error => console.error('Error:', error));

}


select = document.getElementById('selectTurnos')

function cargarSelect(turnos) {

    for (const element of turnos) {
        let option = document.createElement('option')
        const fecha = new Date(element.fecha);
        const fechaFormateada = fecha.toISOString().split('T')[0];

        option.value = element.numero_turno
        option.innerHTML = fechaFormateada
        select.appendChild(option)
        const url = window.location.href;
        let valorSeleccionado = url.split('HCE')[1];
        select.value = valorSeleccionado;
    }

}

select.addEventListener('change', function () {
    let nuevoValor = this.value;
    window.location.href = `/turnos/HCE${nuevoValor}`
});

cargardatos()
cDiagnostico()
