console.log(pacientes)

function pintarPrimero(pacientes){
    let contenedor = document.getElementById('pintarTablaPacientes');
    let pintar = ''
    for (const element of pacientes) {
        pintar = `
        <tr>
            <td>${element.nombre}</td>
            <td>${element.apellido}</td>
            <td>${element.dni_paciente}</td>
            <td>${element.direccion}</td>
            <td>${element.edad}</td>
            <td><a href="/turnos/HCE${element.dni_paciente}" target="_blank" class="btn btn-HCE-invertido">HCE</a></td>
        </tr>`
        contenedor.innerHTML += pintar;
    }
    
}
pintarPrimero(pacientes)

document.getElementById('busqueda').addEventListener('input', function() {
    let query = this.value.toLowerCase();
    let resultados = pacientes.filter(paciente => 
        paciente.nombre.toLowerCase().includes(query) || 
        paciente.apellido.toLowerCase().includes(query)
    );
    mostrarResultados(resultados);
});

function mostrarResultados(resultados) {
    let contenedor = document.getElementById('pintarTablaPacientes');
    contenedor.innerHTML = '';
    resultados.forEach(paciente => {
        let fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${paciente.nombre}</td>
            <td>${paciente.apellido}</td>
            <td>${paciente.dni_paciente}</td>
            <td>${paciente.direccion}</td>
            <td>${paciente.edad}</td>
            <td><a href="/turnos/HCE${paciente.dni_paciente}" target="_blank" class="btn btn-HCE-invertido">HCE</a></td>
        `;
        contenedor.appendChild(fila);
    });
}

