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



    static async medicamentos() {
        conn = await crearConexion()
        let query = `SELECT * FROM medicamento`

        try {
            const [result] = await conn.query(query);
            return result.length ? result : null;
        } catch (error) {
            console.log("Error al traer medicamentos: ", error);
        } finally {
            if (conn) conn.end();
        }
    }



    static async transaccionHCE(historial) {
        conn = await crearConexion()
        let nTurno=historial.numero_turno
        console.log('numero de turno:'+nTurno)
        try {
            await conn.beginTransaction();

            await conn.query(`UPDATE turno SET estado = 'Atendido' WHERE turno.numero_turno = ?;`,[nTurno])
            // Ejecutar los procedimientos almacenados
            for (const data of historial.diagnosticos) {
                await conn.query(' CALL insertar_Diagnostico(?,?,?)',[data.detalle,data.estado,nTurno]);
            }
            
                await conn.query(' CALL insertar_Evolucion(?,?)',[historial.evolucion,nTurno]);

            for (const data of historial.medicamentos) {
                await conn.query(' CALL insertar_receta(?,?)',[data.valor,nTurno]);
            }

            for (const data of historial.antecedentes) {
                await conn.query(' CALL insertar_Antecedentes(?,?,?,?)',[data.detalle,nTurno,data.fdesde,data.fhasta]);
            }

            for (const data of historial.habitos) {
                await conn.query(' CALL insertar_Habito(?,?,?,?)',[data.detalle,nTurno,data.fdesde,data.fhasta]);
            }
        
            for (const data of historial.alergias) {
                await conn.query(' CALL insertar_Alergia(?,?,?,?,?)',[data.nombre,data.importancia,data.fdesde,data.fhasta,nTurno]);
            }
            // Confirmar la transacción
            await conn.commit();
            console.log('Transacción completada con éxito');
        } catch (error) {
            // En caso de error, revertir la transacción
            await conn.rollback();
            console.error('Error en la transacción, se ha revertido', error);
        } finally {
            // Cerrar la conexión
            await conn.end();
        }
    }
};







module.exports = Turno;