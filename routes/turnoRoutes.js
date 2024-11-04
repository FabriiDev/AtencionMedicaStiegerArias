const express = require('express');
const router = express.Router();
const turnoController = require('../controller/turnoController');

function checkeo(req, res, next) {
    if (req.session.autenticado) {
        next()
    } else {
        res.render("index")
    }

}
router.use(checkeo)



router.get('/agenda', turnoController.Agenda)
router.post('/pintarTurnos', turnoController.pintarTurnos)
router.post('/DNI',turnoController.turnosPorDni)

router.get("/HCErender", turnoController.HCErender);
router.get("/createHCE:numeroTurno",turnoController.createHCE)
router.get("/HCE:numeroTurno", turnoController.HCE);
module.exports = router;