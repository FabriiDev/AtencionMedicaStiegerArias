
const express = require('express');
const path = require('path');

const cookieSession = require('cookie-session') //• $ npm install cookie-session

require('dotenv').config();
let bcrypt;

try {
    bcrypt = require('bcrypt');
} catch (e) {
    bcrypt = require('bcryptjs');
}

const medicoRoutes = require('./routes/medicoRoutes');
const turnoRoutes = require('./routes/turnoRoutes');


const port = process.env.PORT || 3003;

const app = express();

// Middleware para procesar el body de las solicitudes POST
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//seteo del middleware
app.use(cookieSession({
    name: 'session',
    secret: 'una cadena aleatoria',
    // Opciones de la cookie
    maxAge: 24 * 60 * 60 * 1000 // 24 horas esta en milisegundos
}))

// Configura la carpeta 'styles' como estática
app.use('/styles', express.static(path.join(__dirname, 'public/styles')));

// Configuración del motor de plantillas Pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Definimos la carpeta 'public' para archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Usar las rutas de 'medico'
app.use('/', medicoRoutes);
app.use('/turnos', turnoRoutes);



async function hashear() {
    let passHasheada = await bcrypt.hash('pass456', 8)
    console.log(passHasheada);
}
app.get('/HCEborrar', (req, res) => {
    res.render('createHCE');
})

// cerrar sesion
app.get('/logout', (req, res) => {
    req.session = null;
    res.render('index');
});

//hashear();

// Escuchar en el puerto configurado
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});