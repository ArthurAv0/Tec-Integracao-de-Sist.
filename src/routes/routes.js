const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController'); 

router.post('/api/notificar', notificationController.enviarNotificacao);

module.exports = router;