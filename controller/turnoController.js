const turnoModel = require("../models/turnoModel");


class TurnoController {
    Agenda = (req, res) => {
        res.render("agenda");
    };

    async pintarTurnos(req, res) {
        try {
            let fecha = req.body.fecha
            let turnos = await turnoModel.turnosPorDia(fecha);
            let jsonstring = JSON.stringify(turnos)
            if (!fecha ) {
                return res.status(400).json({ success: false, error: 'la fecha debe ser seleccionada' })
            }
            if (turnos == null) {
                return res.status(400).json({ success: false, error: 'no se encontraron turnos' })
            }

            return res.status(200).send({success: true, jsonstring})
        } catch (error) {
            console.log('Error al pintar turnos: ', error);
            res.status(500).json({ success: false, error: 'Error interno del servidor' });
        }
    }
}

module.exports = new TurnoController;
