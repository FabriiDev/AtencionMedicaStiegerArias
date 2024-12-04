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

        let query = `SELECT DISTINCT
    p.*,
    t.estado,
    t.hora,
    t.motivo_consulta,
    t.numero_turno,
    espe.nombre_especialidad,
    t.arribado
FROM
    turno t
JOIN paciente p ON
    p.dni_paciente = t.dni_paciente
LEFT JOIN medico_especialidad m_e ON
	t.id_especialidad = m_e.id_especialidad
LEFT JOIN especialidad espe ON
	espe.id_especialidad = m_e.id_especialidad
WHERE
    t.fecha = ? AND t.matricula_medico = ?;`;
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
            const query = 'CALL todosLosTurnos(?)';
            const [result] = await conn.query(query, [numero_turno]);
            // Accede al primer elemento del primer array de resultados
            const turno = result[0]; // Extrae el primer registro
            console.log(turno)
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

    static async traerids(nTurno) {
        conn = await crearConexion()
        let query = `CALL traerID(?);`
        try {
            const [result] = await conn.query(query, [nTurno]);
            return result.length ? result : null;
        } catch (error) {
            console.log("Error al traer ids: ", error);
        }
    }



    static async transaccionHCE(historial) {
        conn = await crearConexion()
        let nTurno = historial.numero_turno
        try {
            await conn.beginTransaction();

            await conn.query(`UPDATE turno SET estado = 'Atendido' WHERE turno.numero_turno = ?;`, [nTurno])
            // Ejecutar los procedimientos almacenados
            for (const data of historial.diagnosticos) {
                await conn.query(' CALL insertar_Diagnostico(?,?,?)', [data.detalle, data.estado, nTurno]);
            }

            await conn.query(' CALL insertar_Evolucion(?,?)', [historial.evolucion, nTurno]);

            for (const data of historial.medicamentos) {
                await conn.query(' CALL insertar_receta(?,?)', [data.valor, nTurno]);
            }

            for (const data of historial.antecedentes) {
                await conn.query(' CALL insertar_Antecedentes(?,?,?,?)', [data.detalle, nTurno, data.fdesde, data.fhasta]);
            }

            for (const data of historial.habitos) {
                await conn.query(' CALL insertar_Habito(?,?,?,?)', [data.detalle, nTurno, data.fdesde, data.fhasta]);
            }

            for (const data of historial.alergias) {
                await conn.query(' CALL insertar_Alergia(?,?,?,?,?)', [data.nombre, data.importancia, data.fdesde, data.fhasta, nTurno]);
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


    static async transaccionUpdateHCE(historial, ids) {
        let nTurno = historial.numero_turno
        conn = await crearConexion()

        try {
            await conn.beginTransaction();

            try {
                if (historial.diagnosticos[0].detalle != '' && historial.diagnosticos[0] != '' && ids.idD != 0) {
                    await conn.query(`UPDATE diagnostico SET resumen_evolucion = ?, estado = ? WHERE id_diagnostico = ?`, [historial.diagnosticos[0].detalle, historial.diagnosticos[0].estado, ids.idD]);
                }
            } catch (error) {}

            try {
                if (historial.evolucion != '' && ids.idE != 0) {
                    await conn.query(`UPDATE evolucion SET resumen_evolucion=? WHERE id_evolucion=?`, [historial.evolucion, ids.idE]);
                }
            } catch (error) {}
            
            try {
                if (historial.medicamentos[0].valor != 0 && ids.idR != 0) {
                    await conn.query(`UPDATE receta SET numero_turno=?,id_medicamento=? WHERE id_receta=?`, [nTurno, historial.medicamentos[0].valor, ids.idR]);
                } else if (historial.medicamentos[0].valor != 0) {
                    await conn.query(' CALL insertar_receta(?,?)', [historial.medicamentos[0].valor, nTurno]);
                }
            } catch (error) {}

            try {
                if (historial.antecedentes[0].detalle != '' && historial.antecedentes[0].fdesde != '' && historial.antecedentes[0].fhasta != '' && ids.idAN != 0) {
                    await conn.query('UPDATE antecedente SET descripcion=?,fecha_desde=?,fecha_hasta=? WHERE id_antecedente=?', [historial.antecedentes[0].detalle, historial.antecedentes[0].fdesde, historial.antecedentes[0].fhasta, ids.idAN]);
                } else if (historial.antecedentes[0].detalle != '' && historial.antecedentes[0].fdesde != '' && historial.antecedentes[0].fhasta != '') {
                    await conn.query(' CALL insertar_Antecedentes(?,?,?,?)', [historial.antecedentes[0].detalle, nTurno, historial.antecedentes[0].fdesde, historial.antecedentes[0].fhasta]);
                }
            } catch (error) { }

            try {
                if (historial.habitos[0].detalle != '' && historial.habitos[0].fdesde != '' && historial.habitos[0].fhasta != '' && ids.idH != 0) {
                    await conn.query('UPDATE habito SET descripcion=?,fecha_desde=?,fecha_hasta=? WHERE id_habito=?', [historial.habitos[0].detalle, historial.habitos[0].fdesde, historial.habitos[0].fhasta, ids.idH]);
                } else if (historial.habitos[0].detalle != '' && historial.habitos[0].fdesde != '' && historial.habitos[0].fhasta != '') {
                    await conn.query(' CALL insertar_Habito(?,?,?,?)', [historial.habitos[0].detalle, nTurno, historial.habitos[0].fdesde, historial.habitos[0].fhasta]);
                }
            } catch (error) { }


            try {
                if (historial.alergias[0].nombre != '' && historial.alergias[0].importancia != '' && historial.alergias[0].fdesde != '' && historial.alergias[0].fhasta != '' && ids.idAL != 0) {
                    await conn.query('UPDATE alergia SET nombre_alergia=?,importancia=?,fecha_desde=?,fecha_hasta=? WHERE `id_alergia`=?', [historial.alergias[0].nombre, historial.alergias[0].importancia, historial.alergias[0].fdesde, historial.alergias[0].fhasta, ids.idAL]);
                } else if (historial.alergias[0].nombre != '' && historial.alergias[0].importancia != '' && historial.alergias[0].fdesde != '' && historial.alergias[0].fhasta != '') {
                    await conn.query(' CALL insertar_Alergia(?,?,?,?,?)', [historial.alergias[0].nombre, historial.alergias[0].importancia, historial.alergias[0].fdesde, historial.alergias[0].fhasta, nTurno]);
                }
            } catch (error) { }
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