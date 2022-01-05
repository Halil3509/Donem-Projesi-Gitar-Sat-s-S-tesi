const express = require('express');

const router = express.Router();

const CategoryController = require('../controllers/category.controller');

router.get('/list',CategoryController.list);

router.post('/add',CategoryController.create);

router.get('/klasik/:id',CategoryController.klasik);

router.get('/bas/:id',CategoryController.bas);

router.get('/elektro/:id',CategoryController.elektro);

router.get('/akustik/:id',CategoryController.akustik);

router.get('/elektroakustik/:id',CategoryController.elektroakustik);

module.exports = router;