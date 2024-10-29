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
        // res.send('tuqi'+req.params.numeroTurno)

        let turno = await turnoModel.numero_turno(req.params.numeroTurno)
        console.log(turno)



        res.render('HCE',{turno})
    }
}



module.exports = new TurnoController;
