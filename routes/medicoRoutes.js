const express = require('express');
const router = express.Router();
const medicoController = require('../controller/medicoController');

router.get('/', medicoController.Index);
// router.get('/agenda', medicoController.Agenda);
router.get('/HCE', medicoController.HCE);
router.get('/createHCE', medicoController.CreateHCE);

// login

router.post('/login', medicoController.Login);

module.exports = router;