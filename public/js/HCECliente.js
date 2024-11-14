/*
#nombreMedicamento
*/
// ------------------- libreria txt enriquesido --------------- 


// ------------------------------------------------------------ 

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
let nombreAlergia = []
let importanciaAlergia = []
let desdeAlergia = []
let hastaAlergia = []



function separador() {

    detalleDiagnostico = turnoS.diagnostico.split('|')
    estadoDiagnostico = turnoS.estado_diagnostico.split('|')

    nombreMedicamento = turnoS.nombre_medicamento.split('|')

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


// -------------------------- carrousel y flechas ----------------------

/* Botones flecha */
let diagDer = document.getElementById('diag-derecha');
let diagIzq = document.getElementById('diag-izquierda');

let anteIzq = document.getElementById('ante-izquierda');
let anteDer = document.getElementById('ante-derecha');

let habiIzq = document.getElementById('habi-izquierda');
let habiDer = document.getElementById('habi-derecha');

let alerIzq = document.getElementById('aler-izquierda');
let alerDer = document.getElementById('aler-derecha');

// -------------------- imagenes flecha NO BOTONES -----------------
let flechaIconIzqDiag = document.getElementById('flecha-icon-izq-diag');
let flechaIconDerDiag = document.getElementById('flecha-icon-der-diag');

let flechaIconDerAnte = document.getElementById('flecha-icon-der-ante');
let flechaIconIzqAnte = document.getElementById('flecha-icon-izq-ante');

let flechaIconIzqHabi = document.getElementById('flecha-icon-izq-habi');
let flechaIconDerHabi = document.getElementById('flecha-icon-der-habi');

let flechaIconDerAler = document.getElementById('flecha-icon-der-aler');
let flechaIconIzqAler = document.getElementById('flecha-icon-izq-aler');

function flechasInicio() {
    if (indiceDiagnostico <= 0) {
        diagIzq.disabled = true;
        flechaIconIzqDiag.src = '/icons/flecha-izquierda-disabled.png'
        diagIzq.title = 'No hay anteriores'
    } else {
        diagIzq.disabled = false;
        indiceDiagnostico--
    }

    if (indiceAntecedente <= 0) {
        anteIzq.disabled = true;
        flechaIconIzqAnte.src = '/icons/flecha-izquierda-disabled.png'
    } else {
        anteIzq.disabled = false;
        indiceAntecedente--
    }

    if (indiceHabito <= 0) {
        habiIzq.disabled = true;
        flechaIconIzqHabi.src = '/icons/flecha-izquierda-disabled.png'
    } else {
        habiIzq.disabled = false;
        indiceHabito--
    }

    if (indiceAlergia <= 0) {
        alerIzq.disabled = true;
        flechaIconIzqAler.src = '/icons/flecha-izquierda-disabled.png'
    } else {
        alerIzq.disabled = false;
        indiceAlergia--
    }

    if (indiceDiagnostico >= detalleDiagnostico.length - 1) {
        diagDer.disabled = true;
        flechaIconDerDiag.src = '/icons/flecha-derecha-disabled.png'
    } else {
        diagDer.disabled = false;
        indiceDiagnostico++
    }

    if (indiceAntecedente >= detalleAntecedente.length - 1) {
        anteDer.disabled = true;
        flechaIconDerAnte.src = '/icons/flecha-derecha-disabled.png'
    } else {
        anteDer.disabled = false;
        indiceAntecedente++
    }

    if (indiceHabito >= detalleHabito.length - 1) {
        habiDer.disabled = true;
        flechaIconDerHabi.src = '/icons/flecha-derecha-disabled.png'
    } else {
        habiDer.disabled = false;
        indiceHabito++
    }

    if (indiceAlergia >= nombreAlergia.length - 1) {
        alerDer.disabled = true;
        flechaIconDerAler.src = '/icons/flecha-derecha-disabled.png'
    } else {
        alerDer.disabled = false;
        indiceAlergia++
    }
}



try {
    separador()
} catch (error) {

}


function atras(valor) {

    switch (valor) {
        case 1:
            if (indiceDiagnostico <= 0) {
                diagIzq.disabled = true;
                flechaIconIzqDiag.src = '/icons/flecha-izquierda-disabled.png'
                diagIzq.title = 'No hay anteriores'
            } else {
                diagIzq.disabled = false;
                indiceDiagnostico--
            }
            diagDer.disabled = false
            flechaIconDerDiag.src = '/icons/flecha-derecha.png'
            cDiagnostico()
            break;
        case 2:
            if (indiceAntecedente <= 0) {
                anteIzq.disabled = true;
                flechaIconIzqAnte.src = '/icons/flecha-izquierda-disabled.png'
            } else {
                anteIzq.disabled = false;
                indiceAntecedente--
            }
            anteDer.disabled = false
            flechaIconDerAnte.src = '/icons/flecha-derecha.png'
            cAntecedente()
            break;
        case 3:
            if (indiceHabito <= 0) {
                habiIzq.disabled = true;
                flechaIconIzqHabi.src = '/icons/flecha-izquierda-disabled.png'
            } else {
                habiIzq.disabled = false;
                indiceHabito--
            }
            habiDer.disabled = false
            flechaIconDerHabi.src = '/icons/flecha-derecha.png'
            cHabito()
            break;

        case 4:
            if (indiceAlergia <= 0) {
                alerIzq.disabled = true;
                flechaIconIzqAler.src = '/icons/flecha-izquierda-disabled.png'
            } else {
                alerIzq.disabled = false;
                indiceAlergia--
            }
            alerDer.disabled = false
            flechaIconDerAler.src = '/icons/flecha-derecha.png'
            cAlergia()
            break;
        default:
            break;
    }

}



function adelante(valor) {
    switch (valor) {
        case 1:
            if (indiceDiagnostico >= detalleDiagnostico.length - 1) {
                diagDer.disabled = true;
                flechaIconDerDiag.src = '/icons/flecha-derecha-disabled.png'
            } else {
                diagDer.disabled = false;
                indiceDiagnostico++
            }
            diagIzq.disabled = false
            flechaIconIzqDiag.src = '/icons/flecha-izquierda.png'
            cDiagnostico()
            break;
        case 2:
            if (indiceAntecedente >= detalleAntecedente.length - 1) {
                anteDer.disabled = true;
                flechaIconDerAnte.src = '/icons/flecha-derecha-disabled.png'
            } else {
                anteDer.disabled = false;
                indiceAntecedente++
            }
            anteIzq.disabled = false;
            flechaIconIzqAnte.src = '/icons/flecha-izquierda.png'
            cAntecedente()
            break;
        case 3:
            if (indiceHabito >= detalleHabito.length - 1) {
                habiDer.disabled = true;
                flechaIconDerHabi.src = '/icons/flecha-derecha-disabled.png'
            } else {
                habiDer.disabled = false;
                indiceHabito++
            }
            habiIzq.disabled = false
            flechaIconIzqHabi.src = '/icons/flecha-izquierda.png'
            cHabito()
            break;

        case 4:
            if (indiceAlergia >= nombreAlergia.length - 1) {
                alerDer.disabled = true;
                flechaIconDerAler.src = '/icons/flecha-derecha-disabled.png'
            } else {
                alerDer.disabled = false;
                indiceAlergia++
            }
            alerIzq.disabled = false
            flechaIconIzqAler.src = '/icons/flecha-izquierda.png'
            cAlergia()
            break;
        default:
            break;
    }

}

function cDiagnostico() {
    document.getElementById('estadoDiagnostico').innerHTML = 'Detalle: ' + (detalleDiagnostico[indiceDiagnostico] || 'no hay datos');

    document.getElementById('detalleDiagnostico').innerHTML = 'Estado: ' + (estadoDiagnostico[indiceDiagnostico] || 'Preliminar')

}

function cMedicamento() {
    let ulMedicamento = document.getElementById('nombreMedicamento');
    nombreMedicamento.forEach(element => {
        let li = document.createElement('li');
        li.textContent = element;
        ulMedicamento.appendChild(li);
    });
}

function cAntecedente() {
    document.getElementById('detalleAntecedente').innerHTML = 'Detalle: ' + (detalleAntecedente[indiceAntecedente] || 'No hay datos');
    document.getElementById('desdeAntecedente').innerHTML = 'Desde: ' + (desdeAntecedente[indiceAntecedente] || 'No hay datos');
    document.getElementById('hastaAntecedente').innerHTML = 'Hasta: ' + (hastaAntecedente[indiceAntecedente] || 'No hay datos');
}

function cHabito() {
    document.getElementById('detalleHabito').innerHTML = 'Detalle: ' + (detalleHabito[indiceHabito] || 'No hay datos');
    document.getElementById('desdeHabito').innerHTML = 'Desde: ' + (desdeHabito[indiceHabito] || 'No hay datos');
    document.getElementById('hastaHabito').innerHTML = 'Hasta: ' + (hastaHabito[indiceHabito] || 'No hay datos');
}


function cAlergia() {
    document.getElementById('nombreAlergia').innerHTML = 'Nombre: ' + (nombreAlergia[indiceAlergia] || 'No hay datos');
    document.getElementById('importanciaAlergia').innerHTML = 'Importancia: ' + (importanciaAlergia[indiceAlergia] || 'No hay datos');
    document.getElementById('desdeAlergia').innerHTML = 'Desde: ' + (desdeAlergia[indiceAlergia] || 'No hay datos');
    document.getElementById('hastaAlergia').innerHTML = 'Hasta: ' + (hastaAlergia[indiceAlergia] || 'No hay datos');
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


if (flagElse) {

    const quill = new Quill('#editor', {
        theme: 'snow'
    });
    quill.clipboard.dangerouslyPasteHTML(evolucionEriquesida);
    quill.disable()


    cDiagnostico()
    cAntecedente()
    cHabito()
    cAlergia()
    cMedicamento()
    cargardatos()
    flechasInicio()

} else {
    cDiagnostico()
    cargardatos()
}



