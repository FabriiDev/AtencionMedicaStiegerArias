const express = require('express');
const router = express.Router();
const turnoController = require('../controller/turnoController');

router.get('/',turnoController.pintarTurnos)

module.exports = router;