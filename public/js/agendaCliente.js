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