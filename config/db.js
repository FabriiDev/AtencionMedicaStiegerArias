const mysql = require('mysql2/promise');

const crearConexion = async () => {
    const conn = await mysql.createConnection({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
    });
    return conn;
};

module.exports = crearConexion;