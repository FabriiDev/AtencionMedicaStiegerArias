const express = require('express');
const router = express.Router();
const turnoController = require('../controller/turnoController');

router.get('/agenda', turnoController.Agenda)
router.post('/pintarTurnos',turnoController.pintarTurnos)

module.exports = router;