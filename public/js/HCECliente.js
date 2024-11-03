//let puedeCambiar;

function cargardatos() {
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
        /*
        console.log('PUUEDE CAMBIAR: ' ,puedeCambiar); 
        console.log('elemento: ' , element.numero_turno)
        if (puedeCambiar == element.numero_turno){
            console.log('entro al if');
            document.getElementById('aca').innerHTML += '<p> ASLDJHKLAS ALSJDLASJLDK ASDLKJALKSD</p>'
        }*/
    }

}

select.addEventListener('change', function () {
    let nuevoValor = this.value;
    window.location.href = `/turnos/HCE${nuevoValor}`
});

cargardatos()