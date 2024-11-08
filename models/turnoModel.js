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
        let conn;
        conn= await crearConexion()
        conn.beginTransaction((err) => {
            if (err) return reject(err);

            
            const queryActualizarTurno = `
                UPDATE turno
                SET estado = 'Atendido'
                WHERE numero_turno = ?
            `;
            const paramsActualizarTurno = [historial.numero_turno];
            console.log('actualizar turno')
            conn.query(queryActualizarTurno, paramsActualizarTurno, (error) => {
                if (error) return conn.rollback(() => reject(error));
            });

            console.log('actualizar ALERGIA')
            // Inserta en la tabla alergia si los datos están presentes
            if (historial.alergias[0].nombre && historial.alergias[0].importancia && historial.alergias[0].fdesde && historial.alergias[0].fhasta) {
                const queryAlergia = `
                    INSERT INTO alergia (nombre_alergia, importancia, fecha_desde, fecha_hasta, numero_turno)
                    VALUES (?, ?, ?, ?, ?)
                `;
                const paramsAlergia = [historial.alergias[0].nombre, historial.alergias[0].importancia, historial.alergias[0].fdesde, historial.alergias[0].fhasta, historial.numero_turno];

                conn.query(queryAlergia, paramsAlergia, (error) => {
                    if (error) return conn.rollback(() => reject(error));
                });
            }

            console.log('actualizar ANTECEDENTE')
            // Inserta en la tabla antecedente si los datos están presentes
            if (historial.antecedentes[0].detalle && historial.antecedentes[0].fdesde && historial.antecedentes[0].fhasta) {
                const queryAntecedente = `
                    INSERT INTO antecedente (descripcion_antecedente, fecha_desde, fecha_hasta, numero_turno)
                    VALUES (?, ?, ?, ?)
                `;
                const paramsAntecedente = [historial.antecedentes[0].detalle, historial.antecedentes[0].fdesde,historial.antecedentes[0].fhasta, historial.numero_turno];

                conn.query(queryAntecedente, paramsAntecedente, (error) => {
                    if (error) return conn.rollback(() => reject(error));
                });
            }

            console.log('actualizar DIAGNOSTICO')
            // Inserta múltiples registros en la tabla diagnostico si existen en el array
            historial.diagnosticos.forEach(diagnostico => {
                const queryDiagnostico = `
                    INSERT INTO diagnostico (resumen_evolucion, estado, numero_turno)
                    VALUES (?, ?, ?)
                `;
                const paramsDiagnostico = [diagnostico.detalle, diagnostico.estado, historial.numero_turno];

                conn.query(queryDiagnostico, paramsDiagnostico, (error) => {
                    if (error) return conn.rollback(() => reject(error));
                });
            });

            console.log('actualizar EVOLUCION')
            // Inserta en la tabla evolucion
            const queryEvolucion = `
                INSERT INTO evolucion (resumen_evolucion, numero_turno)
                VALUES (?, ?)
            `;
            const paramsEvolucion = [historial.evolucion, historial.numero_turno];

            conn.query(queryEvolucion, paramsEvolucion, (error) => {
                if (error) return conn.rollback(() => reject(error));

                console.log('actualizar HABITO')
                // Inserta en la tabla habito si los datos están presentes
                if (historial.habitos[0].detalle && historial.habitos[0].fdesde && historial.habitos[0].fhasta) {
                    const queryHabito = `
                        INSERT INTO habito (descripcion, fecha_desde, fecha_hasta, numero_turno)
                        VALUES (?, ?, ?, ?)
                    `;
                    const paramsHabito = [historial.habitos[0].detalle, historial.habitos[0].fdesde, historial.habitos[0].fhasta, historial.numero_turno];

                    conn.query(queryHabito, paramsHabito, (error) => {
                        if (error) return conn.rollback(() => reject(error));
                    });
                }

                console.log('actualizar RECETA')
                // Inserta en la tabla receta si hay un medicamento seleccionado
                if (historial.medicamentos[0]) {
                    const queryReceta = `
                        INSERT INTO receta (numero_turno,id_medicamento )
                        VALUES (?, ?)
                    `;
                    const paramsReceta = [historial.medicamentos[0].valor, historial.numero_turno];

                    conn.query(queryReceta, paramsReceta, (error) => {
                        if (error) return conn.rollback(() => reject(error));

                        // Si todo ha ido bien, confirma la transacción
                        conn.commit((err) => {
                            if (err) return conn.rollback(() => reject(err));
                            resolve('Datos actualizados correctamente');
                        });
                    });
                } else {
                    console.log('actualizar ELSE RECETA')
                    // Si no hay medicamento, confirma la transacción sin insertar en receta
                    conn.commit((err) => {
                        if (err) return conn.rollback(() => reject(err));
                        resolve('Datos actualizados correctamente');
                    });
                }
            });
        });
    };
};







module.exports = Turno;