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

router.get("/HCE:numeroTurno", turnoController.HCE);

module.exports = router;