document.getElementById('btn-agenda').addEventListener('click', function(event) {
    // Verifica si la URL actual contiene createHCE
    const pagActual = window.location.pathname;
    console.log(pagActual);
    if (pagActual.includes('createHCE')) {
        event.preventDefault(); // Evita que el botón realice su acción predeterminada
        Swal.fire({
            title: 'Debes finalizar la atencion',
            text: "Finaliza la atencion para regresar a la agenda",
            icon: 'info',
            showCancelButton: true,
            showConfirmButton: false, // Oculta el botón de confirmación
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cerrar'
        });
    }else if(pagActual.includes('/turnos/editarHCE')) {
        event.preventDefault(); // Evita que el botón realice su acción predeterminada
        Swal.fire({
            title: 'Debes finalizar la atencion',
            text: "Finaliza la atencion para regresar a la agenda",
            icon: 'info',
            showCancelButton: true,
            showConfirmButton: false, // Oculta el botón de confirmación
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cerrar'
        });
    }else{
        window.location.href = '/turnos/agenda';
    }


});

document.getElementById('btn-logout').addEventListener('click', function(event) {
    event.preventDefault(); // Evita que el botón realice su acción predeterminada
    const pagActual = window.location.pathname;
    if (window.location.pathname.includes('createHCE')) {
        event.preventDefault(); // Evita que el botón realice su acción predeterminada
        Swal.fire({
            title: 'Debes finalizar la atencion',
            text: "Finaliza la atencion para cerrar sesion",
            icon: 'info',
            showCancelButton: true,
            showConfirmButton: false, // Oculta el botón de confirmación
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cerrar'
        });
        
    }else if(pagActual.includes('/turnos/editarHCE')) {
        event.preventDefault(); // Evita que el botón realice su acción predeterminada
        Swal.fire({
            title: 'Debes finalizar la atencion',
            text: "Finaliza la atencion para regresar a la agenda",
            icon: 'info',
            showCancelButton: true,
            showConfirmButton: false, // Oculta el botón de confirmación
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cerrar'
        });
    }else{
    Swal.fire({
        title: '¿Estás seguro?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, cerrar sesión'
    }).then((result) => {
        if (result.isConfirmed) {
            toastr.success('Has cerrado sesión exitosamente');
            window.location.href = '/logout'; 
        }
    });}
});



