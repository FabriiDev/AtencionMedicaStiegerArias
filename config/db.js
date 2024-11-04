const mysql = require('mysql2/promise');

const crearConexion = async () => {
    const conn = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'atencionmedica',
    });
    return conn;
};

module.exports = crearConexion;