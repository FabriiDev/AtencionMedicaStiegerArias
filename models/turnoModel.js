const { Console } = require("console");
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
    t.fecha = ? AND t.matricula_medico = ?
ORDER BY hora;`;
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
        let query = 'SELECT * FROM `turno` WHERE `matricula_medico` =? ORDER BY hora ASC;'
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
            const query = 'CALL obtener_turno_detalleTRES(?)';
            const [result] = await conn.query(query, [numero_turno]);
            // Accede al primer elemento del primer array de resultados
            const turno = result[0]; // Extrae el primer registro
            return turno || null; // Devuelve el objeto si existe, si no, null
        } catch (error) {
            console.log("Error al traer turnos: ", error);
        } finally {
            if (conn) conn.end();
        }
    }

    static async turnosDni(dni) {
        let conn;
        try {
            conn = await crearConexion();

            // Llama al procedimiento almacenado
            const query = 'CALL todosLosTurnos(?)';
            const [result] = await conn.query(query, [dni]);
            // Accede al primer elemento del primer array de resultados
            const turno = result[0]; // Extrae el primer registro
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
    //------------------------------------------------------------------------------drops---------------------------------------------------------------
    static async dDiagnostico(id) {
        conn = await crearConexion()
        let query = `DELETE FROM diagnostico WHERE diagnostico.id_diagnostico =?`

        try {
            const [result] = await conn.query(query, [id]);
            return result.length ? result : null;
        } catch (error) {
            console.log("Error al bajar la receta: ", error);
        } finally {
            if (conn) conn.end();
        }
    }


    static async dReceta(id) {
        conn = await crearConexion()
        let query = `DELETE FROM receta WHERE receta.id_receta = ?`

        try {
            const [result] = await conn.query(query, [id]);
            return result.length ? result : null;
        } catch (error) {
            console.log("Error al bajar la receta: ", error);
        } finally {
            if (conn) conn.end();
        }
    }

    static async dAlergia(id) {
        conn = await crearConexion()
        let query = `DELETE FROM alergia WHERE alergia.id_alergia =?`

        try {
            const [result] = await conn.query(query, [id]);
            return result.length ? result : null;
        } catch (error) {
            console.log("Error al bajar la alergia: ", error);
        } finally {
            if (conn) conn.end();
        }
    }

    static async dHabito(id) {
        conn = await crearConexion()
        let query = `DELETE FROM habito WHERE habito.id_habito = ?`

        try {
            const [result] = await conn.query(query, [id]);
            return result.length ? result : null;
        } catch (error) {
            console.log("Error al bajar el habito: ", error);
        } finally {
            if (conn) conn.end();
        }
    }

    static async dAntecedente(id) {
        conn = await crearConexion()
        let query = `DELETE FROM antecedente WHERE antecedente.id_antecedente = ?`

        try {
            const [result] = await conn.query(query, [id]);
            return result.length ? result : null;
        } catch (error) {
            console.log("Error al bajar el antecedente: ", error);
        } finally {
            if (conn) conn.end();
        }
    }



    //----------------------------------------------------------------------------------------tiempo de atencion-------------------------------------------------------
    static async tiempoAtencion(horas, minutos, segundos, horaComienzo, horaFinal, matricula) {
        conn = await crearConexion()
        let query = `INSERT INTO tiempos_consulta( matricula_medico, horas, minutos, segundos, hora_comienzo, hora_final) VALUES (?,?,?,?,?,?)`

        try {
            const [result] = await conn.query(query, [matricula, horas, minutos, segundos, horaComienzo, horaFinal]);
            return result.length ? result : null;
        } catch (error) {
            console.log("Error al bajar el antecedente: ", error);
        } finally {
            if (conn) conn.end();
        }
    }


    static async traerTiempoPromedio(matricula) {
        conn = await crearConexion()
        let query = `SELECT 
    AVG(horas) AS promedio_horas,
    AVG(minutos) AS promedio_minutos,
    AVG(segundos) AS promedio_segundos
    FROM tiempos_consulta
    WHERE matricula_medico = ?`

        try {
            const [result] = await conn.query(query, [matricula]);
            return result.length ? result : null;
        } catch (error) {
            console.log("Error al traer el los tiempos: ", error);
        } finally {
            if (conn) conn.end();
        }
    }




    //--------------------------------------------------------------------------------------------------------------------------------------------------


    static async transaccionHCE(historial) {
        conn = await crearConexion()
        let nTurno = historial.numero_turno
        try {
            await conn.beginTransaction();

            await conn.query(`UPDATE turno SET estado = 'Atendido' WHERE turno.numero_turno = ?;`, [nTurno])
            // Ejecutar los procedimientos almacenados

            for (const data of historial.diagnostico) {
                await conn.query(' CALL insertar_Diagnostico(?,?,?)', [data.detalles, data.estado, nTurno]);
            }

            await conn.query(' CALL insertar_Evolucion(?,?)', [historial.evolucion, nTurno]);

            for (const data of historial.medicamentos) {
                await conn.query(' CALL insertar_receta(?,?,?)', [data.idMedicamento, nTurno, data.textoMedicamento]);
            }

            for (const data of historial.antecedentes) {
                await conn.query(' CALL insertar_Antecedentes(?,?,?,?)', [data.textoAntecedente, nTurno, data.desdeAntecedente, data.hastaAntecedente]);
            }

            for (const data of historial.habitos) {
                await conn.query(' CALL insertar_Habito(?,?,?,?)', [data.textoHabito, nTurno, data.desdeHabito, data.hastaHabito]);
            }

            for (const data of historial.alergias) {
                await conn.query(' CALL insertar_Alergia(?,?,?,?,?)', [data.nombreAlergia, data.importanciaAlergia, data.desdeAlergia, data.hastaAlergia, nTurno]);
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
                for (const element of historial.diagnosticos) {
                    if (element.detalles != '' && element.idDiag != 0) {
                        // si tiene texto y su id es distinto de 0 quiere hacer una update
                        await conn.query(`UPDATE diagnostico SET resumen_evolucion = ?, estado = ? WHERE id_diagnostico = ?`, [element.detalles, element.estado, element.idDiag]);
                    } else if (element.detalles != '') {
                        //si no crea uno
                        await conn.query(' CALL insertar_Diagnostico(?,?,?)', [element.detalles, element.estado, nTurno]);
                    }
                }
            } catch (error) {
                console.log(error)
            }

            try {
                if (historial.evolucion != '') {
                    await conn.query(`UPDATE evolucion SET resumen_evolucion=? WHERE numero_turno=?`, [historial.evolucion, nTurno]);
                }
            } catch (error) {
                console.log(error)
            }

            try {
                if (historial.medicamentos.length > 0) {
                    for (const element of historial.medicamentos) {
                        if (element.idMedicamento != 0 && element.idRece != 0) {
                            await conn.query(`UPDATE receta SET numero_turno=?,id_medicamento=?,txt_receta=? WHERE id_receta=?`, [nTurno, element.idMedicamento, element.textoMedicamento, element.idRece]);
                        } else if (element.idRece != 0) {
                            await conn.query(' CALL insertar_receta(?,?)', [element.idMedicamento, nTurno, element.textoMedicamento]);
                        }
                    }


                }

            } catch (error) {
                console.log(error)
            }

            try {
                if (historial.antecedentes.length > 0) {
                    for (const element of historial.antecedentes) {
                        if (element.textoAntecedente != '' && element.idAnte != 0) {
                            await conn.query('UPDATE antecedente SET descripcion=?,fecha_desde=?,fecha_hasta=? WHERE id_antecedente=?', [element.textoAntecedente, element.desdeAntecedente, element.hastaAntecedente, element.idAnte]);
                        } else if (element.textoAntecedente != '') {
                            await conn.query(' CALL insertar_Antecedentes(?,?,?,?)', [element.textoAntecedente, nTurno, element.desdeAntecedente, element.hastaAntecedente]);
                        }
                    }

                }

            } catch (error) {
                console.log(error)
            }

            try {
                if (historial.habitos.length > 0) {
                    for (const element of historial.habitos) {
                        if (element.textoHabito != '' && element.idHab != 0) {
                            await conn.query('UPDATE habito SET descripcion=?,fecha_desde=?,fecha_hasta=? WHERE id_habito=?', [element.textoHabito, element.desdeHabito, element.hastaHabito, element.idHab]);
                        } else if (element.textoHabito != '') {
                            await conn.query(' CALL insertar_Habito(?,?,?,?)', [element.textoHabito, nTurno, element.desdeHabito, element.hastaHabito]);
                        }
                    }
                }
            } catch (error) {
                console.log(error)
            }


            try {
                if (historial.alergias.length > 0) {
                    for (const element of historial.alergias) {
                        if (element.nombreAlergia != '' && element.importanciaAlergia != '' && element.idAler != 0) {
                            await conn.query('UPDATE alergia SET nombre_alergia=?,importancia=?,fecha_desde=?,fecha_hasta=? WHERE `id_alergia`=?', [element.nombreAlergia, element.importanciaAlergia, element.desdeAlergia, element.hastaAlergia, element.idAler]);
                        } else if (element.nombreAlergia != '' && element.importanciaAlergia != '') {
                            await conn.query(' CALL insertar_Alergia(?,?,?,?,?)', [element.nombreAlergia, element.importanciaAlergia, element.desdeAlergia, element.hastaAlergia, nTurno]);
                        }
                    }
                }
            } catch (error) {
                console.log(error)
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