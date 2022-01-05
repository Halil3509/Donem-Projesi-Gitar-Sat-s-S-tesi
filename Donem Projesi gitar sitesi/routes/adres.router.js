const express =require('express');
const router = express.Router();

const AdresController = require('../controllers/adres.controller');

router.get('/add',AdresController.create);

 module.exports = router;