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
    numero_turno,
    fecha
FROM turno
WHERE dni_paciente = ?
ORDER BY fecha DESC`

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
        let conn;
        try {
            conn = await crearConexion();
            
            // Llama al procedimiento almacenado
            const query = 'CALL obtenerDetalleTurno(?)';
            const [result] = await conn.query(query, [numero_turno]);
            // Accede al primer elemento del primer array de resultados
            const turno = result[0][0]; // Extrae el primer registro
            return turno || null; // Devuelve el objeto si existe, si no, null
        } catch (error) {
            console.log("Error al traer turnos: ", error);
        } finally {
            if (conn) conn.end();
        }
    }
    
    
    /*static async numero_turno(numero_turno) {
        conn = await crearConexion()
        let query = `SELECT DISTINCT
    t.numero_turno,
    t.fecha,
    t.hora,
    t.motivo_consulta,
    p.nombre AS nombre_paciente,
    p.apellido AS apellido_paciente,
    p.dni_paciente,
    m.nombre AS nombre_medico,
    m.apellido AS apellido_medico,
    m.especialidad,
    GROUP_CONCAT(DISTINCT d.resumen_evolucion ORDER BY d.resumen_evolucion SEPARATOR ', ') AS diagnostico,
    GROUP_CONCAT(DISTINCT d.estado ORDER BY d.estado SEPARATOR ', ') AS estado_diagnostico,
    GROUP_CONCAT(DISTINCT e.resumen_evolucion ORDER BY e.resumen_evolucion SEPARATOR ', ') AS evolucion,
    GROUP_CONCAT(DISTINCT al.nombre_alergia ORDER BY al.nombre_alergia SEPARATOR ', ') AS nombre_alergia,
    GROUP_CONCAT(DISTINCT al.importancia ORDER BY al.importancia SEPARATOR ', ') AS importancia_alergia,
    GROUP_CONCAT(DISTINCT al.fecha_desde ORDER BY al.fecha_desde SEPARATOR ', ') AS fecha_desde_alergia,
    GROUP_CONCAT(DISTINCT al.fecha_hasta ORDER BY al.fecha_hasta SEPARATOR ', ') AS fecha_hasta_alergia,
    GROUP_CONCAT(DISTINCT an.descripcion ORDER BY an.descripcion SEPARATOR ', ') AS antecedente,
    GROUP_CONCAT(DISTINCT an.fecha_desde ORDER BY an.fecha_desde SEPARATOR ', ') AS fecha_desde_antecedente,
    GROUP_CONCAT(DISTINCT an.fecha_hasta ORDER BY an.fecha_hasta SEPARATOR ', ') AS fecha_hasta_antecedente,
    GROUP_CONCAT(DISTINCT h.descripcion ORDER BY h.descripcion SEPARATOR ', ') AS habito,
    GROUP_CONCAT(DISTINCT h.fecha_desde ORDER BY h.fecha_desde SEPARATOR ', ') AS fecha_desde_habito,
    GROUP_CONCAT(DISTINCT h.fecha_hasta ORDER BY h.fecha_hasta SEPARATOR ', ') AS fecha_hasta_habito,
    GROUP_CONCAT(DISTINCT r.id_receta ORDER BY r.id_receta SEPARATOR ', ') AS id_receta,
    GROUP_CONCAT(DISTINCT me.nombre_medicamento ORDER BY me.nombre_medicamento SEPARATOR ', ') AS nombre_medicamento
FROM
    turno t
JOIN paciente p ON
    p.dni_paciente = t.dni_paciente
JOIN medico m ON
    m.matricula_medico = t.matricula_medico
LEFT JOIN diagnostico d ON
    t.numero_turno = d.numero_turno
LEFT JOIN evolucion e ON
    t.numero_turno = e.numero_turno
LEFT JOIN alergia al ON
    t.numero_turno = al.numero_turno
LEFT JOIN antecedente an ON
    t.numero_turno = an.numero_turno
LEFT JOIN habito h ON
    t.numero_turno = h.numero_turno
LEFT JOIN receta r ON
    t.numero_turno = r.numero_turno
LEFT JOIN medicamento me ON
    r.id_medicamento = me.id_medicamento
WHERE
    t.numero_turno = ?
GROUP BY
    t.numero_turno, t.fecha, t.hora, t.motivo_consulta, 
    p.nombre, p.apellido, p.dni_paciente, 
    m.nombre, m.apellido, m.especialidad;`

        try {
            const [result] = await conn.query(query, [numero_turno]);
            return result.length ? result[0] : null;
        } catch (error) {
            console.log("Error al traer turnos: ", error);
        } finally {
            if (conn) conn.end();
        }
    }*/
}

module.exports = Turno;