const turnoModel = require("../models/turnoModel");


class TurnoController {
    Agenda = (req, res) => {
        res.render("agenda");
    };

    async pintarTurnos(req, res) {
        try {
            let fecha = req.body.fecha
            let turnos = await turnoModel.turnosPorDia(fecha);
            if (!fecha) {
                return res.status(400).json({succes : false, error:'la fecha debe ser seleccionada'})
            }

            return res.status(200).json({
                succes: true,
                true: turnos,
            })            
        } catch (error) {
            console.log('Error al pintar turnos: ', error);
            res.status(500).json({ success: false, error: 'Error interno del servidor' });
         }
    }
}

module.exports = new TurnoController;
