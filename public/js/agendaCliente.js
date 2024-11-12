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
            document.getElementById('pintarTablaTurnos').innerHTML=`no se encontraron turnos para el ${fechaSeleccionada}`
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
            document.getElementById('pintarTablaTurnos').innerHTML=""
            for (const element of turnos) {
                document.getElementById('pintarTablaTurnos').innerHTML += pintarTabla(element);
            }
        } else {
            //document.getElementById('fechaInicial').innerHTML = fechaSeleccionada;
            console.error(data.message || 'No se encontraron turnos');
            document.getElementById('pintarTablaTurnos').innerHTML=`no se encontraron turnos para el ${fechaSeleccionada}`
        }
    })
    .catch(error => {
        console.error('Error al obtener turnos:', error);
    });
        
});


function pintarTabla(turnos){
    let colorEstado;
    if(turnos.estado === 'Cancelado'){
        colorEstado = 'bg-danger';
    }else if(turnos.estado === 'Atendido'){
        colorEstado = 'bg-success';
    }else{
        colorEstado = 'bg-primary';
    }

    

    pintarTablaTurnos = `
            <tr>
                <td>
                    <a href="/turnos/HCE${turnos.numero_turno}" target="_blank"> ${turnos.apellido} ${turnos.nombre} </a>
                </td>
                <td> ${turnos.hora} </td>
                <td> ${turnos.motivo_consulta} </td>
                <td class="${colorEstado}"> ${turnos.estado} </td>
            </tr>`;

    return pintarTablaTurnos;
}


//------------------------------ tempplate --------------------------


document.getElementById('btn-template').onclick = function() {
    document.getElementById('modal').style.display = 'block';
}

document.getElementById('close').onclick = function() {
    document.getElementById('modal').style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == document.getElementById('modal')) {
        document.getElementById('modal').style.display = 'none';
    }
}

function capturarTemplate(){
    const contenido = quill.root.innerHTML;
    return contenido;
}

document.getElementById('guardar-template').onclick = function() {
    const enHTML = capturarTemplate();
    console.log('texto en HTML: ', enHTML)
    document.getElementById('modal').style.display = 'none';
    updateTemplate()
}


function updateTemplate() {
    let plantilla=capturarTemplate()
    fetch('/crearTemplate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            template: plantilla
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