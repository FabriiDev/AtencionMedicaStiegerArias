

function pintarPrimero(pacientes){
    let contenedor = document.getElementById('pintarTablaPacientes');
    let pintar = ''
    for (const element of pacientes) {
        pintar = `
        <tr>
            <td class="color-primario-txt pt-2" >
                <p class="pt-3 fw-semibold">${element.nombre}</p></td>
            <td class="color-primario-txt pt-2" >
                <p class="pt-3 fw-semibold">${element.apellido}</p></td>
            <td class="color-primario-txt pt-2">
                <p class="pt-3 fw-semibold">${element.dni_paciente}</p>
            </td>
            <td class="color-primario-txt pt-2">
                <p class="pt-3 fw-semibold">${element.direccion}</p>
            </td>
            <td class="color-primario-txt pt-2">
                <p class="pt-3 fw-semibold">${element.edad}</p>
            </td>
            <td>
            <a href="/turnos/HCE${element.dni_paciente} target="_blank">
            <span class="material-symbols-outlined icono-hce pt-2">
                clinical_notes
            </span>
            </a></td>
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
            <td class="color-primario-txt pt-2">
                <p class="pt-3 fw-semibold">${paciente.nombre}</p>
            </td>
            <td class="color-primario-txt pt-2">
                <p class="pt-3 fw-semibold">${paciente.apellido}</p>
            </td>
            <td class="color-primario-txt pt-2">
                <p class="pt-3 fw-semibold">${paciente.dni_paciente}</p>
            </td>
            <td class="color-primario-txt pt-2">
                <p class="pt-3 fw-semibold">${paciente.direccion}</p>
            </td>
            <td class="color-primario-txt pt-2">
                <p class="pt-3 fw-semibold">${paciente.edad}</p>
            </td>
            <td>
                <a href="/turnos/HCE${paciente.dni_paciente}" target="_blank">
                <span class="material-symbols-outlined icono-hce pt-2">
                clinical_notes
            </span></a></td>
        `;
        contenedor.appendChild(fila);
    });
}

