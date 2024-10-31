alert('asd');
function HCEnroTurno(){
    fetch('/HCE:numeroTurno')
    .then(response => console.log('RTA: ',response)) 
    .then(data => console.log('data: ', data))
    .catch(error => console.error('Error:', error)); 
    
}
HCEnroTurno();
