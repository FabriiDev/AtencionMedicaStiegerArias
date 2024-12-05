// ------------------- libreria txt enriquesido --------------- 
const quill = new Quill('#editor', {
    theme: 'snow'
});
quill.clipboard.dangerouslyPasteHTML('');

// ------------------------------------------------------------ 

const inputFecha = document.getElementById('fecha');
let hoy = new Date();
let fechaSeleccionada = hoy.toLocaleDateString('en-CA'); // Formato YYYY-MM-DD
inputFecha.value = fechaSeleccionada;


let pintarTablaTurnos = document.getElementById('pintarTablaTurnos');

//document.getElementById('fechaInicial').innerHTML = fechaSeleccionada;

function turnosHoy() {
    fetch('/turnos/pintarTurnos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            fecha: fechaSeleccionada
        })
    })
        .then(response => {

            return response.json();
        })
        .then(data => {

            if (data.success) {

                const turnos = JSON.parse(data.jsonstring);

                for (const element of turnos) {
                    document.getElementById('pintarTablaTurnos').innerHTML += pintarTabla(element);
                }

                // document.getElementById('pintarTablaTurnos').innerHTML = pintarTabla(element);
            } else {
                console.error(data.message || 'No se encontraron turnos');
                document.getElementById('pintarTablaTurnos').innerHTML = `no se encontraron turnos para el ${fechaSeleccionada}`
            }
        })
        .catch(error => {
            console.error('Error al obtener turnos:', error);
        });

}
turnosHoy();

inputFecha.addEventListener('change', (event) => {
    fechaSeleccionada = event.target.value;
    fetch('/turnos/pintarTurnos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            fecha: fechaSeleccionada
        })
    })
        .then(response => {
            return response.json();
        })
        .then(data => {
            if (data.success) {
                //document.getElementById('fechaInicial').innerHTML = fechaSeleccionada;
                const turnos = JSON.parse(data.jsonstring)
                document.getElementById('pintarTablaTurnos').innerHTML = ""
                for (const element of turnos) {
                    document.getElementById('pintarTablaTurnos').innerHTML += pintarTabla(element);
                }
            } else {
                //document.getElementById('fechaInicial').innerHTML = fechaSeleccionada;
                console.error(data.message || 'No se encontraron turnos');
                document.getElementById('pintarTablaTurnos').innerHTML = `no se encontraron turnos para el ${fechaSeleccionada}`
            }
        })
        .catch(error => {
            console.error('Error al obtener turnos:', error);
        });

});


function pintarTabla(turnos) {
    console.log(turnos);
    let colorEstado;
    if (turnos.estado === 'Cancelado') {
        colorEstado = 'text-danger';
    } else if (turnos.estado === 'Atendido') {
        colorEstado = 'text-success';
    } else {
        colorEstado = 'text-primary';
    }
    let colorArribado;
    let textoArribado;
    console.log('--------------')
    if (turnos.arribado === 0) {
        colorArribado = 'text-danger';
        textoArribado = 'No'
    } else {
        colorArribado = 'text-success';
        textoArribado = 'Si'
    }

    let btnComenzarAtencion = '';


    if (turnos.arribado == 1 && turnos.estado == 'Pendiente') {
        btnComenzarAtencion = `<a href="/turnos/createHCE${turnos.numero_turno}" target="_blank">
        <button class="btn btn-success fw-semibold">Comenzar atencion</button>
        </a>`
    } else {
        btnComenzarAtencion = '<p></p>';
    }

    pintarTablaTurnos = `
            <tr>
                <td class="text-danger-emphasis pb-4 pt-5">
                    ${turnos.apellido} ${turnos.nombre}
                </td>
                <td class="text-danger-emphasis pb-4 pt-5"> ${turnos.hora} </td>
                <td class="text-danger-emphasis pb-4 pt-5"> ${turnos.motivo_consulta} </td>
                <td class="${colorEstado} pb-4 pt-5"> ${turnos.estado} </td>
                <td class="${colorArribado} pb-4 pt-5"> ${textoArribado} </td>
                <td class="text-danger-emphasis pb-4 pt-5""> ${turnos.nombre_especialidad} </td>

                <td class="pb-4 pt-5 d-flex gap-3"> 
                    <a href="/turnos/HCE${turnos.dni_paciente}" target="_blank"> 
                        <button class="btn btn-HCE fw-semibold">HCE</button>
                    </a> 
                    ${btnComenzarAtencion}
                </td>
            </tr>`;

    return pintarTablaTurnos;
}


//------------------------------ template --------------------------

document.getElementById('btn-template').onclick = function () {
    document.getElementById('modal').style.display = 'block';
}

document.getElementById('close').onclick = function () {
    document.getElementById('modal').style.display = 'none';
}

window.onclick = function (event) {
    if (event.target == document.getElementById('modal')) {
        document.getElementById('modal').style.display = 'none';
    }
}

function capturarTemplate() {
    const contenido = quill.root.innerHTML;
    return contenido;
}

let templateName=''
document.getElementById('guardar-template').onclick = function () {
    const enHTML = capturarTemplate();
    templateName = document.getElementById('nombre-template').value;
    console.log('Nombre del Template: ', templateName);
    console.log('Texto en HTML: ', enHTML);
    document.getElementById('modal').style.display = 'none';
    if (enHTML === '' || templateName === '') {
        toastr.error('Complete los campos', 'Servidor', {
            "progressBar": true,
            "positionClass": "toast-top-center"
        });
    } else {
        toastr.success('Template guardada con éxito!', 'Servidor:', {
            "progressBar": true,
            "positionClass": "toast-top-center"
        });
        updateTemplate();
    }
}


function updateTemplate() {
    let plantilla = capturarTemplate()
    fetch('/crearTemplate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            template: plantilla,
            nombre: templateName
        })
    })
        .then(response => {

            return response.json();
        })
        .then(data => {

            if (data.success) {

                // document.getElementById('pintarTablaTurnos').innerHTML = pintarTabla(element);
            } else {
                console.error(data.message || 'fallo en template');
            }
        })
        .catch(error => {
            console.error('Error al cargar template', error);
        });
}