const intputFecha = document.getElementById('fecha');
let hoy = new Date;
let fechaSeleccionada = hoy.toISOString().split('T')[0];


document.getElementById('fechaInicial').innerHTML = fechaSeleccionada;



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
        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor: ' + response.status);
        }
        return response.json();
    })
    .then(data => {
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


