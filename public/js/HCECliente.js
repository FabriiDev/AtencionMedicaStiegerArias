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
    /* Botones flecha */
    let diagDer = document.getElementById('diag-derecha');
    let diagIzq = document.getElementById('diag-izquierda');

    let anteIzq = document.getElementById('ante-izquierda');
    let anteDer = document.getElementById('ante-derecha');

    let habiIzq = document.getElementById('habi-izquierda');
    let habiDer = document.getElementById('habi-derecha');

    let alerIzq = document.getElementById('aler-izquierda');
    let alerDer = document.getElementById('aler-derecha');

    switch (valor) {
        case 1:
            if (indiceDiagnostico >= detalleDiagnostico.length -1) {
                diagDer.disabled = true;
            } else {
                diagDer.disabled = false;
                indiceDiagnostico++
            }
            cDiagnostico()
            break;
        case 2:
            if (indiceAntecedente >= detalleAntecedente.length -1) {
                anteDer.disabled = true;
                console.log('entro al if ')
            }else{
                anteDer.disabled = false;
                indiceAntecedente++
            }
            cAntecedente()
            break;
        case 3:
            if (indiceHabito >= detalleHabito.length -1) {
                habiDer.disabled = true;
            }else{
                habiDer.disabled = false;
                indiceHabito++
            }
            cHabito()
            break;

        case 4:
            if (indiceAlergia >= nombreAlergia.length -1) {
                alerDer.disabled = true;
            }else{
                alerDer.disabled = false;
                indiceAlergia++
            }
            cAlergia()
            break;
        default:
            break;
    }

}

function cDiagnostico() {
    document.getElementById('estadoDiagnostico').innerHTML = 'Detalle: '+ (detalleDiagnostico[indiceDiagnostico] || 'no hay datos');
    
    document.getElementById('detalleDiagnostico').innerHTML = 'Estado: '+(estadoDiagnostico[indiceDiagnostico] || 'Preliminar')
    
}

function cAntecedente(){
    document.getElementById('detalleAntecedente').innerHTML='Detalle: '+ (detalleAntecedente[indiceAntecedente]  || 'No hay datos');
    document.getElementById('desdeAntecedente').innerHTML='Desde: '+(desdeAntecedente[indiceAntecedente] || 'No hay datos');
    document.getElementById('hastaAntecedente').innerHTML='Hasta: '+(hastaAntecedente[indiceAntecedente] || 'No hay datos');
}

function cHabito(){
    document.getElementById('detalleHabito').innerHTML='Detalle: '+(detalleHabito[indiceHabito]  || 'No hay datos');
    document.getElementById('desdeHabito').innerHTML='Desde: '+(desdeHabito[indiceHabito]  || 'No hay datos');
    document.getElementById('hastaHabito').innerHTML='Hasta: '+(hastaHabito[indiceHabito]  || 'No hay datos');
}


function cAlergia(){
    document.getElementById('nombreAlergia').innerHTML='Nombre: '+(nombreAlergia[indiceAlergia]  || 'No hay datos');
    document.getElementById('importanciaAlergia').innerHTML='Importancia: '+(importanciaAlergia[indiceAlergia]  || 'No hay datos');
    document.getElementById('desdeAlergia').innerHTML='Desde: '+(desdeAlergia[indiceAlergia]  || 'No hay datos');
    document.getElementById('hastaAlergia').innerHTML='Hasta: '+(hastaAlergia[indiceAlergia]  || 'No hay datos');
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
cAntecedente()
cHabito()
cAlergia()