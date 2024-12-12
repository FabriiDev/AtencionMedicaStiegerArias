const express = require('express');
const path = require('path');

const cookieSession = require('cookie-session'); //• $ npm install cookie-session

require('dotenv').config();
const bcrypt = require('bcryptjs'); // Asegúrate de usar bcryptjs

const medicoRoutes = require('./routes/medicoRoutes');
const turnoRoutes = require('./routes/turnoRoutes');

const port = process.env.PORT || 3003;

const app = express();

// Middleware para procesar el body de las solicitudes POST
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Seteo del middleware de sesión
app.use(cookieSession({
    name: 'session',
    secret: 'una cadena aleatoria',
    // Opciones de la cookie
    maxAge: 24 * 60 * 60 * 1000 // 24 horas en milisegundos
}));

// Configura la carpeta 'styles' como estática
app.use('/styles', express.static(path.join(__dirname, 'public/styles')));

// Configuración del motor de plantillas Pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Definimos la carpeta 'public' para archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Usar las rutas de 'medico' y 'turno'
app.use('/', medicoRoutes);
app.use('/turnos', turnoRoutes);

// Si necesitas probar el hash de la contraseña, puedes llamar a la función aquí
async function hashear() {
    let passHasheada = await bcrypt.hash('pass456', 8);
    console.log(passHasheada);
}

// Ejecutar hashear() si es necesario
// hashear(); 

// Ruta de borrado de HCE
app.get('/HCEborrar', (req, res) => {
    res.render('createHCE');
});

// Cerrar sesión
app.get('/logout', (req, res) => {
    req.session = null;
    res.render('index');
});

// Escuchar en el puerto configurado
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
