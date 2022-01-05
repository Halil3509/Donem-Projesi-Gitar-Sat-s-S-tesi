const mongoose = require('mongoose');

const ProductModel = require('../models/product.model');
const AdminModel = require('../models/admin.model');
const userModel = require('../models/user.model');
const OrderModel = require('../models/order.model');

const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const adminModel = require('../models/admin.model');
var action = "merhaba";

var productCount = "";
var userCount = "";

exports.OpenPage = (req, res, next) => {
    ProductModel.find((err, result) => {
        if (err) return res.render('admin/error', { error: err.message });
        else productCount = result.length;

    });
    AdminModel.find((err, doc) => {
        if (err) return res.render('admin/error', { error: err.message });
        else {
            userCount = doc.length;
            res.render('admin/anasayfa', { userCount: userCount, productCount: productCount });
        }
    });

}

exports.loginAdmin = (req, res, next) => {
    AdminModel.find({ email: req.body.email }).then(result => {
        console.log(result);
        if (result.length < 1) {
            action = "error"
            res.render('admin/adminlogin', { action: action });
        }  // e postayı bulamayınca oluşan yer
        bcrypt.compare(req.body.password, result[0].password, (err, doc) => {
            if (err) {
                action = "error";
                res.render('admin/adminlogin', { action: action });
            };
            if (doc) {
                const token = jwt.sign({
                    email: result[0].email,
                    _id: result[0]._id,
                },
                    process.env.JWT_KEY,
                    {
                        expiresIn: '1h'
                    }
                )
                action = "success";
                ProductModel.find((err, doc) => {
                    if (err) res.render('admin/error', { error: err.message });
                    else {
                        productCount = doc.length;
                        AdminModel.find((err, result2) => {
                            if (err) res.render('admin/error', { error: err.message });
                            else {
                                action = "merhaba";
                                res.render('admin/anasayfa', {
                                    productCount: productCount,
                                    userCount: result2.length,
                                    user: result[0]
                                });
                            }
                        })
                    }
                });
            }
            else {
                action = "error";
                res.render('admin/adminlogin', { action: action });
            };
        });
    });
}

exports.openLoginAdmin = (req, res, next) => {
    res.render('admin/adminlogin', {
        action: action
    });
}

exports.openAboutPage = (req, res, next) => {
    OrderModel.find({kullanici:loginedUserId},(err,adet) =>{
        if(adet) {
            res.render('user/about',{id:loginedUserId ,adet:adet.length});
        }
    })
}

exports.openContactPage = (req, res, next) => {
    OrderModel.find({kullanici:loginedUserId},(err,adet) =>{
        if(adet) {
            res.render('user/contact',{id:loginedUserId ,adet:adet.length,message:'undefined'});
        }
    })
}

exports.openHomePage = (req, res, next) => {
    OrderModel.find({kullanici:loginedUserId},(err,adet) =>{
        if(adet) {
            res.render('user/home',{id:loginedUserId ,adet:adet.length});
        }
    })
   
}

exports.signupUser = (req, res, next) => {
    userModel.find({ email: req.body.email }).then(result => {
        // bu işlem e posta dan 1 den fazla varsa hata verme işlemidir
        if (result.length >= 1) {
            action = 'fault';
            res.render('user/signup', { action: action });
        }
        else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) res.render('admin/error', { error: err.message });
                else {
                    const user = new userModel({
                        ad: req.body.ad,
                        soyad: req.body.soyad,
                        cinsiyet: req.body.cinsiyet,
                        email: req.body.email,
                        password: hash
                    });
                    user.save().then(result => {
                        console.log(result);
                        action = "signuped";
                        res.render('user/login', { action: action });
                    })
                        .catch(err => {
                            res.render('admin/error', { error: err.message });
                        });

                }
            })
        }
    });
}
var loginedUserId = "";
exports.loginUser = (req, res, next) => {
    userModel.find({ email: req.body.email }).then(result => {
        if (result.length < 1) {
            action = "error"
            res.render('user/login', { action: action });
        }  // e postayı bulamayınca oluşan yer
        bcrypt.compare(req.body.password, result[0].password, (err, doc) => {
            if (err) {
                action = "error";
                res.render('user/login', { action: action });
            };
            if (doc) {
                const token = jwt.sign({
                    email: result[0].email,
                    _id: result[0]._id,
                },
                    process.env.JWT_KEY,
                    {
                        expiresIn: '1h'
                    }
                )
                action = "success";
                ProductModel.find((err, doc) => {
                    if (err) res.render('admin/error', { error: err.message });
                    else {
                        userModel.find({ email: req.body.email }, (err, sonuc) => {
                            loginedUserId = sonuc[0]._id;
                            if (sonuc) {
                                console.log(sonuc);
                                productCount = doc.length;
                                userModel.find((err, result) => {
                                    if (err) res.render('admin/error', { error: err.message });
                                    else {
                                        OrderModel.find({kullanici:sonuc[0]._id},(err,adet) =>{
                                            if(adet) {
                                                res.render('user/home',{ id: sonuc[0]._id ,adet:adet.length});
                                            }
                                        })
                                    }
                                });
                            }
                        });
                    }
                });
                action = "undefined";

            }
            else {
                action = "error";
                res.render('user/login', { action: action });
                action ="undefined";
            };
        });
    });
}

exports.openLoginUser = (req, res, next) => {
    action = "undefined";
    res.render('user/login', {
        action: action
    });
}

exports.OpensignupUser = (req, res, next) => {
    res.render('user/signup', { action: "undefined" });
}

exports.sendMail = (req,res,next) =>{
    OrderModel.find({kullanici:loginedUserId},(err,adet) =>{
        if(adet) {
            res.render('user/contact',{id:loginedUserId ,adet:adet.length,message:'true'});
        }
    })
}
