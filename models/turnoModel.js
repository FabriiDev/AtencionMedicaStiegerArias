const crearConexion = require("../config/db");
let conn;

class Turno {
    constructor(
        numero_turno,
        fecha,
        hora,
        motivo_consulta,
        estado,
        dni_paciente,
        matricula_medico
    ) {
        this.numero_turno = numero_turno;
        this.fecha = fecha;
        this.hora = hora;
        this.motivo_consulta = motivo_consulta;
        this.estado = estado;
        this.dni_paciente = dni_paciente;
        this.matricula_medico = matricula_medico;
    }

    static async turnosPorDia(fecha) {
        conn = await crearConexion();

        let query = `SELECT p.apellido,p.nombre,t.estado,t.hora,t.motivo_consulta
FROM turno t
JOIN paciente p ON p.dni_paciente=t.dni_paciente
WHERE t.fecha=?;`;
        try {
            const [result] = await conn.query(query, [fecha]);
            return result.length ? result : null;
            // si hay resultado traer turno, si no, devoler null
        } catch (error) {
            console.log("Error al traer turnos: ", error);
        } finally {
            if (conn) conn.end();
        }
    }
}

module.exports = Turno;