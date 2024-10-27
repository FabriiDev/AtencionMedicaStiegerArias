const express = require('express');
const path = require('path');
const port = process.env.PORT || 3003;
const cookieSession = require('cookie-session') //• $ npm install cookie-session
const medicoRoutes = require('./routes/medicoRoutes');
const turnoRoutes = require('./routes/turnoRoutes');

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

// Escuchar en el puerto configurado
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});