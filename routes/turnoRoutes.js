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
router.post('/actualizarHCE',turnoController.actualizarHCE)

router.get("/HCErender", turnoController.HCErender);
router.post("/guardarHCE",turnoController.guardarHCE)

router.post("/dropDatabase",turnoController.drop)

router.get("/createHCE:numeroTurno",turnoController.createHCE)
router.get("/editarHCE:numeroTurno",turnoController.editHCE)
router.get("/HCE:dni", turnoController.HCE);
module.exports = router;