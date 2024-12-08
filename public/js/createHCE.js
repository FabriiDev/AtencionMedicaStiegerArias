// ------------------- libreria txt enriquesido --------------- 
const quill = new Quill('#editor', {
    theme: 'snow'
});
//quill.clipboard.dangerouslyPasteHTML(laTemplate);

function otroDiagnositoc() {
    let nuevoDiagnostico = document.getElementById('nuevo-diagnostico');
    let i = 1;
    let pintar = `
    <div id="idDiagnostico${i}"class="animacion color-primario-bg d-flex flex-column align-items-start p-5 gap-4 border-bottom border-dark text-light">
        <h3>Diagnostico (obligatorio)</h3>
        <div class="d-flex gap-2">
            <label>Estado: </label>
            <select>
                <option>Preeliminar </option>
                <option>Confirmado</option>
        </select>
        </div>
        <label class="text-center">Detalles: 
        </label>
        <textarea class="txt-area-create text-left"></textarea>
        
        <button class="btn btn-danger" onclick="(eliminarDiagnostico(${i}))">Eliminar</button>
    </div>
`
    i++;
    nuevoDiagnostico.innerHTML += pintar;
}

function eliminarDiagnostico(numero) {
    let diagnostico = document.getElementById(`idDiagnostico${numero}`);
    if (diagnostico) { diagnostico.remove(); }
}

function evolucionTemplates() {
    fetch('/cargarTemplates')
        .then(response => {
            if (!response.ok) {
                throw new Error('la respuesta no fue 200');
            }
            return response.json();
        })
        .then(data => {

            let select = document.getElementById('selectTemplates')
            if (data) {
                for (const element of data) {
                    let option = document.createElement('option')
                    option.innerHTML = element.nombre
                    option.value = element.txt_template
                    select.appendChild(option)
                }
            }


        })
        .catch(error => {
            console.error('errror al cargar templates:', error);
        });

}

evolucionTemplates()

document.getElementById('selectTemplates').addEventListener('change', () => {
    let textoEnriquesido=document.getElementById('selectTemplates').value
    quill.clipboard.dangerouslyPasteHTML(textoEnriquesido)
})


function llenarSelectMedicamento() {
    let todosMedicamentos
    for (const element of medicamentos) {
        todosMedicamentos = `
        <option value="${element.id_medicamento}">${element.nombre_medicamento}</option>
    `;
        document.getElementById('selectMedicamento').innerHTML += todosMedicamentos;
    }

}
llenarSelectMedicamento();

function nuevoMedicamento() {
    let nuevoMedicamento = document.getElementById('nuevo-medicamento');
    let i = 1;


    let pintar = `
    <div id="idMedicamento${i}" class="animacion bg-light d-flex flex-column align-items-start p-5 gap-4 border border-dark">
        <h3 class="text-center">Medicamentos</h3>
        <div class="d-flex gap-2">
            <label>Seleccione medicamento: 
            </label>
            <select id="selectMedicamento${i}">
                ${document.getElementById('selectMedicamento').innerHTML}
            </select>
        </div>
        <label>Receta: </label>
        <textarea class="txt-area-create text-left"></textarea>
        <button onclick="eliminarMedicamento(${i})" class="btn btn-danger fw-semibold">Eliminar</button>
    </div>`;
    i++;
    nuevoMedicamento.innerHTML += pintar;
}

function eliminarMedicamento(numero) {
    let medicamento = document.getElementById(`idMedicamento${numero}`);
    if (medicamento) { medicamento.remove(); }
}

function nuevaAlergia() {
    let nuevaAlergia = document.getElementById('nueva-alergia');
    let i = 1;
    let pintar = `
    <div id="idAlergia${i}" class="animacion bg-light d-flex flex-column align-items-start p-5 gap-4 border border-dark">
        <h3 class="text-center">Alergias</h3>
        <label>Nombre: </label>
        <input type="text" />
        <label>Importancia
            <select> 
                <option>Leve</option>
                <option>Normal</option>
                <option>Alta</option>
            </select>
        </label>
        <div class="d-flex gap-4">
        <label>Desde: 
            <input type="date" name=""/>
        </label>
        <label>Hasta: 
            <input type="date" name=""/>
        </label>
        <label> Vigente
            <input type="checkbox"/>
        </label>
        </div>
            <button onclick="eliminarAlergia(${i})" class="btn btn-danger fw-semibold">Eliminar</button>
    </div>`
    i++;
    nuevaAlergia.innerHTML += pintar;
}

function eliminarAlergia(numero) {
    let alergia = document.getElementById(`idAlergia${numero}`);
    if (alergia) { alergia.remove(); }
}

function nuevoHabito() {
    let nuevoHabito = document.getElementById('nuevo-habito');
    let i = 1;
    let pintar = `
    <div id="idHabito${i}" class="animacion bg-light d-flex flex-column align-items-start p-5 gap-4 border border-dark">
        <h3 class="text-center">Habitos</h3>
        <label>Detalles: </label>
        <textarea class="txt-area-create text-left"></textarea>
        <div class="d-flex gap-4">
            <label>Desde: 
                <input type="date" name=""/>
            </label>
            <label>Hasta: 
                <input type="date" name=""/>
            </label>
            <label>Vigente
                <input type="checkbox"/>
            </label>
        </div>
        <button onclick="eliminarHabito(${i})" class="btn btn-danger fw-semibold">Eliminar</button>
    </div>`
    i++;
    nuevoHabito.innerHTML += pintar;
}

function eliminarHabito(numero) {
    let habito = document.getElementById(`idHabito${numero}`);
    if (habito) { habito.remove(); }
}

function nuevoAntecedente() {
    let nuevoAnteccedente = document.getElementById('nuevo-antecedente');
    let i = 1;
    let pintar = `
    <div id="idAntecedente${i}" class="animacion bg-light d-flex flex-column align-items-start p-5 gap-4 border border-dark">
        <h3 class="text-center">Antecedente</h3>
        <label>Detalles: </label>
        <textarea class="txt-area-create text-left"></textarea>
        <div class="d-flex gap-4">
            <label>Desde: 
                <input type="date" name=""/>
            </label>
            <label>Hasta: 
                <input type="date" name=""/>
            </label>
            <label>Vigente
                <input type="checkbox"/>
            </label>
        </div>
        <button onclick="eliminarAntecedente(${i})" class="btn btn-danger fw-semibold">Eliminar</button>
    </div>`
    i++;
    nuevoAnteccedente.innerHTML += pintar;
}

function eliminarAntecedente(numero) {
    let antecedente = document.getElementById(`idAntecedente${numero}`);
    if (antecedente) { antecedente.remove(); }
}


function toggleContent(id) {
    const contenido = document.getElementById(id);
    if (contenido.style.display === 'none' || contenido.style.display === '') {
        contenido.style.display = 'block';
        contenido.classList.add('contenido-visible');
    } else {
        contenido.style.display = 'none';
        contenido.classList.remove('contenido-visible');
    }
}


// ---------------------##################################--------------------------------------- 