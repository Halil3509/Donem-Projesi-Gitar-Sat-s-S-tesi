const express = require('express');
const router = express.Router();

const ProductController = require('../controllers/product.controller');
const ViewProductController = require('../controllers/viewcontroller/product.controller');

router.get('/list',ProductController.list);

router.post('/add',ProductController.create);

router.post('/edit',ProductController.update);

router.get('/remove/:_id',ProductController.delete);

router.get('/list/:_id',ProductController.getById);

router.get('/addMenu',ProductController.addMenu);

router.post('/image',ProductController.ChangeImage);

router.post('/imageC',ProductController.ChangeImageForCreate);

router.get('/viewproduct/:id',ViewProductController.getProducts);

router.post('/detailforuser',ViewProductController.detailForUser);

router.get('/buy/:id',ViewProductController.buy);



module.exports = router;