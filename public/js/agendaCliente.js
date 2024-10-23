const intputFecha = document.getElementById('fecha');
let hoy = new Date;
let fechaSeleccionada = hoy.toISOString().split('T')[0];

let pintarTablaTurnos = document.getElementById('pintarTablaTurnos');

document.getElementById('fechaInicial').innerHTML = fechaSeleccionada;

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
        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor: ' + response.status);
        }
        return response.json();
    })
    .then(data => {
        //console.log(data)
        if (data.success) {
            
            const turnos = JSON.parse(data.jsonstring);
            console.log(turnos);

            for (const element of turnos) {
                document.getElementById('pintarTablaTurnos').innerHTML += pintarTabla(element);
            }

            // document.getElementById('pintarTablaTurnos').innerHTML = pintarTabla(element);
        } else {
            console.error(data.message || 'No se encontraron turnos');
        }
    })
    .catch(error => {
        console.error('Error al obtener turnos:', error);
    });
}
turnosHoy();

intputFecha.addEventListener('change', (event) => {
    fechaSeleccionada = event.target.value;
    console.log(fechaSeleccionada);
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
        //console.log(data.success)
        if (data.success) {
            const turnos = data.turnos; // Asegúrate de acceder a los turnos correctamente
            console.log(turnos);
        } else {
            console.error(data.message || 'No se encontraron turnos');
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
                    <a href="#" target="_blank"> ${turnos.apellido} ${turnos.nombre} </a>
                </td>
                <td> ${turnos.hora} </td>
                <td> ${turnos.motivo_consulta} </td>
                <td class="${colorEstado}"> ${turnos.estado} </td>
            </tr>`;

    return pintarTablaTurnos;
}