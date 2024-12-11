const turnoModel = require("../models/turnoModel");


class TurnoController {
    Agenda = (req, res) => {
        turnoModel.turnosPorMedico(req.session.matricula).then(turnos => {
            let nombre = req.session.nombre
            res.render('agenda', { turnos, nombre })
        })
    };

    async pintarTurnos(req, res) {
        try {
            let fecha = req.body.fecha
            let turnos = await turnoModel.turnosPorDia(fecha, req.session.matricula);
            let jsonstring = JSON.stringify(turnos)
            if (!fecha) {
                return res.status(400).json({ success: false, error: 'la fecha debe ser seleccionada' })
            }
            if (turnos == null) {
                return res.status(400).json({ success: false, error: 'no se encontraron turnos' })
            }

            return res.status(200).send({ success: true, jsonstring })
        } catch (error) {
            console.log('Error al pintar turnos: ', error);
            res.status(500).json({ success: false, error: 'Error interno del servidor' });
        }
    }
    async HCE(req, res) {

        let turno = await turnoModel.turnosDni(req.params.dni)
        let medicoLogeado = req.session.matricula;

        let ultimo = turno.es_ultima_atencion
        res.render('HCE', { turno, medicoLogeado, ultimo });
    }



    async HCErender(req, res) {
        res.render('HCE');
    }

    async turnosPorDni(req, res) {
        let turno = await turnoModel.dni(req.body.dni)
        req.session.ultimoTurno = turno[0];
        turno = JSON.stringify({ turno: turno })

        res.send(turno)
    }

    async createHCE(req, res) {
        let turno = await turnoModel.numero_turno(req.params.numeroTurno)
        let medicamentos = await turnoModel.medicamentos()
        res.render('createHCE', { turno, medicamentos })
    }

    async editHCE(req, res) {
        let numero=req.params.numeroTurno
        let turno = await turnoModel.numero_turno(numero)
        const fechaFormateada = turno[0].fecha.toISOString().split('T')[0];
        let medicamentos = await turnoModel.medicamentos()
        
        res.render('editHCE', { turno, fechaFormateada, medicamentos,numero })
    }


    //--------------------------------------------------------------------------------------------------------------------------------
    async guardarHCE(req, res) {
        let envio = { success: false }//si hay tiempo mandar un mensaje segun el error o el if que dio el return
        let historial = req.body.historial
        console.log(historial)

        historial.diagnostico.forEach(element => {
            if (element.estado == '' || element.detalle == '') {
                //si falta cualquiera de los dos se sale de la ruta y se envia el valor de succes por default:false
                res.send(envio)
            }
        });
        if (historial.evolucion == '') {
            res.send(envio)
        }
        //--------------------------------------------------------------------------------
        //si hay aunque sea 1 habito cargado se comprueban sus datos
        if (historial.habitos[0]) {

            historial.habitos.forEach(element => {
                if (element.detalle == '') {
                    res.send(envio)
                }
            });


        }



        if (historial.antecedentes[0]) {
            historial.antecedentes.forEach(element => {
                if (element.detalle == '') {
                    res.send(envio)
                }
            });
        }

        if (historial.alergias[0]) {
            historial.alergias.forEach(element => {
                if (element.nombre == '' || element.importanciaAlergia == '') {
                    res.send(envio)
                }
            });
        }

        if (historial.medicamentos[0]) {
            historial.medicamentos.forEach(element => {
                if (element == '') {
                    res.send(envio)
                }
            });
        }
        try {
            await turnoModel.transaccionHCE(historial)
        } catch (error) {
            console.log(error)
            res.send(error)
        }
        envio = { success: true }
        res.send(envio)
    }

    async actualizarHCE(req, res) {
        let envio = { success: false }//si hay tiempo mandar un mensaje segun el error o el if que dio el return
        let historial = req.body.historial
        console.log('historial server-----------------------------------------')
        console.log(historial)
        /*try {
            let ids = await turnoModel.traerids(historial.numero_turno)
            await turnoModel.transaccionUpdateHCE(historial, ids[0][0])
        } catch (error) {
            console.log(error)
        }*/

        envio = { success: true }
        res.send(envio)
    }
}



module.exports = new TurnoController;
