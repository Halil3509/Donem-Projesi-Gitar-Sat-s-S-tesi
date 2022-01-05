const express = require('express');
const router = express.Router();

const OrderController = require('../controllers/viewcontroller/order.controller');


router.post('/addtobasket',OrderController.addToBasket);

router.get('/basket/:id',OrderController.openBasket);

router.get('/removefrombasket/:id',OrderController.removeFromBasket);

module.exports = router;