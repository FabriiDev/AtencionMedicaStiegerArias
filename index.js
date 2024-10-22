const express = require('express');
const path = require('path');
const port = process.env.PORT || 3003; 
const medicoRoutes = require('./routes/medicoRoutes');
const turnoRoutes=require('./routes/turnoRoutes')

const app = express();

// Middleware para procesar el body de las solicitudes POST
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configura la carpeta 'styles' como estática
app.use('/styles', express.static(path.join(__dirname, 'public/styles')));

// Configuración del motor de plantillas Pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Definimos la carpeta 'public' para archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Usar las rutas de 'medico'
app.use('/index', medicoRoutes);
app.use('/agenda',turnoRoutes)
// Escuchar en el puerto configurado
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});