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
                document.getElementById('pintarTablaTurnos').innerHTML = `
                <tr class="color-primario-txt"> <td class="fw-semibold fs-3 text-danger" colspan='12'>No se encontraron turnos para el ${fechaSeleccionada}</td></tr> `
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
                document.getElementById('pintarTablaTurnos').innerHTML = `
                <tr class="color-primario-txt"> <td class="fw-semibold fs-3 text-danger" colspan='12'>No se encontraron turnos para el ${fechaSeleccionada}</td></tr> 
                `
            }
        })
        .catch(error => {
            console.error('Error al obtener turnos:', error);
        });

});

function alertaComenzarAtencion(nroTurno) {
    Swal.fire({
        title: '¿Deseas comenzar la atencion?',
        text: "¡Empezara a correr el tiempo!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, comenzar atencion'
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = `/turnos/createHCE${nroTurno}`; 
        }
    });
}

function pintarTabla(turnos) {

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
        btnComenzarAtencion = `
        <button class="btn btn-comenzar-atencion fw-semibold" onclick="alertaComenzarAtencion(${turnos.numero_turno})" >Comenzar atencion</button>`
    } else {
        btnComenzarAtencion = `
        <p class="p-0" title="El turno no esta pendiente o el paciente no esta arribado">
        <button disabled class="btn btn-HCE-invertido fw-semibold" onclick="alertaComenzarAtencion(${turnos.numero_turno})" >Comenzar atencion</button>
        </p>`;
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
                <td class="text-danger-emphasis pb-4 pt-5"> ${turnos.nombre_especialidad} </td>

                <td class="pb-4 pt-5 gap-3"> 
                    <a href="/turnos/HCE${turnos.dni_paciente}" target="_blank"> 
                        <span class="material-symbols-outlined icono-hce">
                        clinical_notes
                        </span>
                    </a> 
                </td>

                <td class="pb-4 pt-5 gap-3"> 
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
    limpiarCamposET();
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
        toastr.success('Guardando nueva template', 'Por favor, espere un momento:', {
            "progressBar": true,
            "positionClass": "toast-top-center",
            onHidden: function () {
                window.location.href = '/turnos/agenda';
            }
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
    for (const element of templates) {

        let op = document.createElement('option')
        op.innerHTML = element.nombre
        op.value = element.id_template
        selectNombres.appendChild(op)
    }
}


async function traerTemplates() {
    try {
        const response = await fetch('/cargarTemplates', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`Error en la respuesta: ${response.status}`);
        }
        const data = await response.json();
        cargarEditorTemplates(data);
        return data;
    } catch (error) {
        console.error('Error al traer templates', error);
        return null;
    }
}


quillEditar.enable(false);
let templates = []; // guardar los datos del template en array

(async () => {
    templates = await traerTemplates() || [];
})();

//id que se manda al server
let idServer
document.getElementById('nombres-templates-editar').addEventListener('change', (event) => {
    const selectedValue = event.target.value; // value option

    // compara el id_template con el value
    const datos = templates.find(template => template.id_template === Number(selectedValue));

    if (datos) {
        activarCamposET(false);
        document.getElementById('nombre-template-editar').value = datos.nombre
        idServer=datos.id_template
        quillEditar.clipboard.dangerouslyPasteHTML(datos.txt_template);
    } else {
        console.warn('No se encontraron datos para el template seleccionado.');
        activarCamposET(true);
        limpiarCamposET();
    }
});

function limpiarCamposET(){
    document.getElementById('nombre-template-editar').value = '';
    quillEditar.root.innerHTML = '';
    document.getElementById('nombres-templates-editar').value = '';
    activarCamposET(true);
}

function activarCamposET(bool) {
    document.getElementById('nombre-template-editar').disabled = bool;
    document.getElementById('guardar-template-editar').disabled = bool;
    document.getElementById('eliminar-template-editar').disabled = bool;
    quillEditar.enable(!bool);
}

function serverTemplate(activo,ids) {
    let nombre = document.getElementById('nombre-template-editar').value
    let contenido = quillEditar.root.innerHTML
    fetch('/updateTemplate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            template: contenido,
            nombre: nombre,
            activo: activo,
            id:ids
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
        })
}



document.getElementById('eliminar-template-editar').addEventListener('click', (event) => {
    Swal.fire({
        title: '¿Estas seguro que deseas eliminar esta template?',
        text: "¡No podras recuperarla!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar template'
    }).then((result) => {
        if (result.isConfirmed) {
            serverTemplate(0,idServer)
            limpiarCamposET();
            toastr.success('Borrando el template', 'Por favor espera un momento', {
                progressBar: true,
                positionClass: 'toast-top-center',
                onHidden: function () {
                    window.location.href = '/turnos/agenda';
                }
            });
            
        }
    });
    
})


document.getElementById('guardar-template-editar').addEventListener('click', (event) => {
    toastr.success('Guardando template', 'Por favor espera un momento', {
        progressBar: true,
        positionClass: 'toast-top-center',
        onHidden: function () {
            window.location.href = '/turnos/agenda';
        }
    });
    
    serverTemplate(1,idServer);
    limpiarCamposET();
})
