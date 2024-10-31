alert('asd');
function HCEnroTurno(){
    fetch(`/turnos/HCE${11}`)
    .then(response => console.log('RTA: ',response)) 
    .then(data => console.log('data: ', data))
    .catch(error => console.error('Error:', error)); 
    
}
HCEnroTurno();
