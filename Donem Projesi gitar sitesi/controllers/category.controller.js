const mongoose = require('mongoose');

const CategoryModel = require('../models/category.model');
const OrderModel = require('../models/order.model');
const ProductModel = require('../models/product.model');

exports.create = (req, res, next) => {
    let createData = {
        ad: req.body.ad,
    }
    var categories = new CategoryModel(createData);
    categories.save((err, doc) => {
        if (err) res.status(404).json({
            message: "Kategori oluşturma işlemi başarısız"
        });
        else res.status(200).json({
            message: "Kategori oluşturma işlemi başarılı",
            data: createData
        });
    });
}

exports.list = (req, res, next) => {
    CategoryModel.find((err, doc) => {
        if (err) res.status(404).json({ message: "işlem başarısız" });
        else res.status(200).json({ message: "işlem başarılı", data: doc });
    });
}
var action = " ";
exports.klasik = (req, res, next) => {
    var id = req.params.id;
    ProductModel.find({tur:'61bf83ed54d12c5313d73352'},(err,result)=>{
        if(err) res.render('admin/error',{error:err.message});
        else {
            OrderModel.find((err,doc)=>{
                if(err) res.render('admin/error',{error:err.message});
                else {
                    res.render('user/shop', { products: result, id: id, action: action, adet: doc.length });
                }
            })
        }
    })
}
exports.akustik = (req, res, next) => {
    var id = req.params.id;
    ProductModel.find({tur:'61bf83f654d12c5313d73354'},(err,result)=>{
        if(err) res.render('admin/error',{error:err.message});
        else {
            OrderModel.find((err,doc)=>{
                if(err) res.render('admin/error',{error:err.message});
                else {
                    res.render('user/shop', { products: result, id: id, action: action, adet: doc.length });
                }
            })
        }
    })
}
exports.elektro = (req, res, next) => {
    var id = req.params.id;
    ProductModel.find({tur:'61bf83dc54d12c5313d7334e'},(err,result)=>{
        if(err) res.render('admin/error',{error:err.message});
        else {
            OrderModel.find((err,doc)=>{
                if(err) res.render('admin/error',{error:err.message});
                else {
                    res.render('user/shop', { products: result, id: id, action: action, adet: doc.length });
                }
            })
        }
    })
}
exports.bas = (req, res, next) => {
    var id = req.params.id;
    ProductModel.find({tur:'61bf83d354d12c5313d7334c'},(err,result)=>{
        if(err) res.render('admin/error',{error:err.message});
        else {
            OrderModel.find((err,doc)=>{
                if(err) res.render('admin/error',{error:err.message});
                else {
                    res.render('user/shop', { products: result, id: id, action: action, adet: doc.length });
                }
            })
        }
    })
}
exports.elektroakustik = (req, res, next) => {
    var id = req.params.id;
    ProductModel.find({tur:'61bf83e654d12c5313d73350'},(err,result)=>{
        if(err) res.render('admin/error',{error:err.message});
        else {
            OrderModel.find((err,doc)=>{
                if(err) res.render('admin/error',{error:err.message});
                else {
                    res.render('user/shop', { products: result, id: id, action: action, adet: doc.length });
                }
            })
        }
    })
}