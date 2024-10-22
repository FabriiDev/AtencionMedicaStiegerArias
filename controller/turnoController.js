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
            }else{
                res.send(fecha)
            }
            
        } catch (error) { }
    }
}

module.exports = new TurnoController;
