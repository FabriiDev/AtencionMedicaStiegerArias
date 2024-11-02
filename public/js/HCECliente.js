


function as() {
    fetch('/turnos/DNI', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            dni: dni
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data) {

                let turnos = data.turno
                console.log(turnos)
                cargarSelect(turnos)
            }
        })
        .catch(error => console.error('Error:', error));

}


function cargarSelect(turnos) {
    let select = document.getElementById('selectTurnos')


    turnos.forEach(element => {
        let option = document.createElement('option')
        const fecha = new Date(element.fecha);
        const fechaFormateada = fecha.toISOString().split('T')[0];


        option.value = element.numero_turno
        option.innerHTML = fechaFormateada
        select.appendChild(option)
    });

}

as()