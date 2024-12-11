const express = require('express');
const router = express.Router();
const medicoController = require('../controller/medicoController');


router.post('/login', medicoController.Login);

function checkeo(req, res, next) {
    if (req.session.autenticado) {
        next()
    } else {
        res.render("index")
    }

}
router.use(checkeo)


router.get('/', medicoController.Index);
// router.get('/agenda', medicoController.Agenda);
router.get('/HCE', medicoController.HCE);
router.get('/createHCE', medicoController.CreateHCE);
router.get('/cargarTemplates',medicoController.traerTemplates)
router.get('/pacientes',medicoController.pacientes)

router.post('/updateTemplate',medicoController.updateTemplate)
router.post('/crearTemplate',medicoController.guardarTemplate);


module.exports = router;