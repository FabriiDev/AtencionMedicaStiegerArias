const crearConexion = require('../config/db');
let conn;
class Medico {
    constructor(matricula_medico, nombre, apellido, password, especialidad, template) {
        this.matricula_medico = matricula_medico;
        this.nombre = nombre;
        this.apellido = apellido;
        this.password = password;
        this.especialidad = especialidad;
        this.template = template;
    }

    static async traerMedico(matricula) {
        conn = await crearConexion();
        const query = `SELECT
    m.matricula_medico,
    m.nombre,
    m.apellido,
    m.password
FROM
    medico m
WHERE
    matricula_medico = ?`
        try {
            const [result] = await conn.query(query, [matricula]);
            return result.length ? result[0] : null;
            // si hay resultado traer medico, si no, devoler null
        } catch (error) {
            console.log('Error al traer medicos: ', error);
        } finally {
            if (conn) conn.end();
            // cerrar coneccion al finalizar
        }
    }

    static async login(matricula_medico, password) {
        const query = `SELECT m.matricula_medico, m.password , m.nombre , m.apellido 
                        FROM medico m 
                        WHERE matricula_medico = ? and password = ?;`
        try {
            conn = await crearConexion();
            const [result] = await conn.query(query, [matricula_medico, password]);
            return result.length ? result[0] : null;
        } catch (error) {
            console.log('Error al loguear medico: ', error);
        } finally {
            if (conn) conn.end();
        }
    }

    static async guardarTemplate(template, matricula_medico, nombre) {
        const query = `INSERT INTO template(
    nombre,
    txt_template,
    matricula_medico,
    estado
)
VALUES(
    ?,
    ?,
	?,
	1
    
);`
        try {
            conn = await crearConexion();
            const [result] = await conn.query(query, [nombre, template, matricula_medico]);
            return result.length ? result[0] : null;
        } catch (error) {
            console.log('Error al loguear medico: ', error);
        } finally {
            if (conn) conn.end();
        }
    }


    static async traerTemplatesXMatricula(matricula_medico) {
        const query = `SELECT * FROM template WHERE matricula_medico=? AND estado=1;`
        try {
            conn = await crearConexion();
            const [result] = await conn.query(query, [matricula_medico]);
            return result.length ? result : null;
        } catch (error) {
            console.log('Error al loguear medico: ', error);
        } finally {
            if (conn) conn.end();
        }
    }
}



Medico.traerMedico()
module.exports = Medico;