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

    static async turnosPorDia(fecha, matricula) {
        conn = await crearConexion();

        let query = `SELECT p.*,t.estado,t.hora,t.motivo_consulta,t.numero_turno
                    FROM turno t
                    JOIN paciente p ON p.dni_paciente=t.dni_paciente
                    WHERE t.fecha=? and matricula_medico =?`;
        try {
            const [result] = await conn.query(query, [fecha, matricula]);
            return result.length ? result : null;
            // si hay resultado traer turno, si no, devoler null
        } catch (error) {
            console.log("Error al traer turnos: ", error);
        } finally {
            if (conn) conn.end();
        }
    }

    static async turnosPorMedico(matricula) {
        conn = await crearConexion()
        let query = 'SELECT * FROM `turno` WHERE `matricula_medico` =?;'
        try {
            const [result] = await conn.query(query, [matricula]);
            return result.length ? result : null;
        } catch (error) {
            console.log("Error al traer turnos: ", error);
        } finally {
            if (conn) conn.end();
        }

    }

    static async dni(dni_paciente) {
        conn = await crearConexion()
        let query = `SELECT
    t.numero_turno,
    t.fecha,
    p.nombre,
    p.apellido,
    p.dni_paciente,
    m.nombre,
    m.apellido,
    m.especialidad,
    d.resumen_evolucion AS diagnostico,
    d.estado AS estado_diagnostico,
    e.resumen_evolucion AS evolucion,
    al.nombre_alergia,
    al.importancia AS importancia_alergia,
    an.descripcion AS antecedente,
    h.descripcion AS habito,
    r.id_receta,
    me.nombre_medicamento
FROM
    turno t
JOIN paciente p ON
    p.dni_paciente = t.dni_paciente
JOIN medico m ON
    m.matricula_medico = t.matricula_medico
JOIN diagnostico d ON
    t.numero_turno = d.numero_turno
JOIN evolucion e ON
    t.numero_turno = e.numero_turno
JOIN alergia al ON
    t.numero_turno = al.numero_turno
JOIN antecedente an ON
    t.numero_turno = an.numero_turno
JOIN habito h ON
    t.numero_turno = h.numero_turno
JOIN receta r ON
    t.numero_turno = r.numero_turno
JOIN medicamento me ON
    r.id_medicamento = me.id_medicamento
WHERE
    t.dni_paciente = ?;`

        try {
            const [result] = await conn.query(query, [dni_paciente]);
            return result.length ? result : null;
        } catch (error) {
            console.log("Error al traer turnos: ", error);
        } finally {
            if (conn) conn.end();
        }
    }


    static async numero_turno(numero_turno) {
        conn = await crearConexion()
        let query = `SELECT
    t.numero_turno,
    t.fecha,
    t.hora,
    p.nombre,
    p.apellido,
    p.dni_paciente,
    m.nombre,
    m.apellido,
    m.especialidad,
    d.resumen_evolucion AS diagnostico,
    d.estado AS estado_diagnostico,
    e.resumen_evolucion AS evolucion,
    al.nombre_alergia,
    al.importancia AS importancia_alergia,
    an.descripcion AS antecedente,
    h.descripcion AS habito,
    r.id_receta,
    me.nombre_medicamento
FROM
    turno t
JOIN paciente p ON
    p.dni_paciente = t.dni_paciente
JOIN medico m ON
    m.matricula_medico = t.matricula_medico
JOIN diagnostico d ON
    t.numero_turno = d.numero_turno
JOIN evolucion e ON
    t.numero_turno = e.numero_turno
JOIN alergia al ON
    t.numero_turno = al.numero_turno
JOIN antecedente an ON
    t.numero_turno = an.numero_turno
JOIN habito h ON
    t.numero_turno = h.numero_turno
JOIN receta r ON
    t.numero_turno = r.numero_turno
JOIN medicamento me ON
    r.id_medicamento = me.id_medicamento
WHERE
    t.numero_turno = ?;`

        try {
            const [result] = await conn.query(query, [numero_turno]);
            return result.length ? result[0] : null;
        } catch (error) {
            console.log("Error al traer turnos: ", error);
        } finally {
            if (conn) conn.end();
        }
    }
}

module.exports = Turno;