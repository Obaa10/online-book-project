const express = require('express');
const router = express.Router();
const Controller = require('./../controllers/index');
const {checkToken} = require('../lib/middleware/index');


router.post('/payments',checkToken, Controller.createPayment);
router.get('/payments',checkToken, Controller.getPaymentsByUserId);

module.exports = router;