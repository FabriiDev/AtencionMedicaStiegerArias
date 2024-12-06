// ------------------- libreria txt enriquesido --------------- 
const quill = new Quill('#editor', {
    theme: 'snow'
});
quill.clipboard.dangerouslyPasteHTML('');

const quillEditar = new Quill('#editor-editar', {
    theme: 'snow'
});

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
        <button class="btn btn-HCE-invertido fw-semibold">Comenzar atencion</button>
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

//------------------------------ template editar --------------------------

document.getElementById('btn-template-editar').onclick = function () {
    document.getElementById('modal-editar').style.display = 'block';
};

document.getElementById('close-editar').onclick = function () {
    document.getElementById('modal-editar').style.display = 'none';
};

window.onclick = function (event) {
    if (event.target == document.getElementById('modal-editar')) {
        document.getElementById('modal-editar').style.display = 'none';
    }
};

// Capturar el contenido del editor para Editar Template
function capturarTemplateEditar() {
    const contenido = quillEditar.root.innerHTML; // Reutiliza el editor 'quill' inicializado en #editor
    return contenido;
}


document.getElementById('guardar-template-editar').onclick = function () {
    const enHTML = capturarTemplateEditar();
    const templateNameEditar = document.getElementById('nombre-template-editar').value;
    const habilitar = document.getElementById('habilitar-template').checked;

    console.log('Nombre del Template: ', templateNameEditar);
    console.log('Texto en HTML: ', enHTML);
    console.log('Habilitado: ', habilitar);

    document.getElementById('modal-editar').style.display = 'none';

    if (enHTML === '' || templateNameEditar === '') {
        toastr.error('Complete los campos', 'Servidor', {
            progressBar: true,
            positionClass: 'toast-top-center',
        });
    } else {
        toastr.success('Template actualizado con éxito!', 'Servidor:', {
            progressBar: true,
            positionClass: 'toast-top-center',
        });
        actualizarTemplate(templateNameEditar, enHTML, habilitar);
    }
};



//------------------------------ template crear --------------------------

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

let templateName = ''
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


function cargarEditorTemplates(templates) {
    let selectNombres = document.getElementById('nombres-templates-editar')
    let nombreTemplate = document.getElementById('nombre-template-editar')
    let habilitado = document.getElementById('habilitar-template')

    console.log('templates en el cargar editor')
    console.log(templates)

    for (const element of templates) {
        console.log(element)
        let op = document.createElement('option')
        op.innerHTML = element.nombre
        op.value = element.id_template
        selectNombres.appendChild(op)
    }
}


async function traerTemplates() {
    fetch('/cargarTemplates', {
        method: 'get',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {

            return response.json();
        })
        .then(data => {
           cargarEditorTemplates(data)


        })
        .catch(error => {
            console.error('Error al traer templates', error);
        });
}



traerTemplates()



