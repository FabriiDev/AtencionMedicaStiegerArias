document.getElementById('btn-agenda').addEventListener('click', function(event) {
    // Verifica si la URL actual contiene createHCE
    if (window.location.pathname.includes('createHCE')) {
        event.preventDefault(); // Evita que el botón realice su acción predeterminada
        Swal.fire({
            title: '¿Estás seguro que deseas volver a la agenda?',
            text: "Se perderán los todos cambios",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, volver'
        }).then((result) => {
            if (result.isConfirmed) {
                toastr.info('Redirigiendo al inicio...');
                window.location.href = '/turnos/agenda'; 
            }
        });
    }else{
        window.location.href = '/turnos/agenda';
    }
});

document.getElementById('btn-logout').addEventListener('click', function(event) {
    event.preventDefault(); // Evita que el botón realice su acción predeterminada
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
    });
});



