const mysql = require('mysql2/promise');

const crearConexion = async () => {
    const conn = await mysql.createConnection({
        host: 'bnfv6rzpluwxgqzlzidw-mysql.services.clever-cloud.com',
        user: 'ucfmrlb35gmftoax',
        password: 'g7YCgCgEPXySs7fwgsmq',
        database: 'bnfv6rzpluwxgqzlzidw',
    });
    return conn;
};

module.exports = crearConexion;