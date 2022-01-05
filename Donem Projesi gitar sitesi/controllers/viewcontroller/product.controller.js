const mongoose = require('mongoose');

const ProductModel = require('../../models/product.model');
const OrderModel  =require('../../models/order.model');


var action = "undefined";
var userId = "";
exports.getProducts = (req,res,next) => { 
    userId = req.params.id
    ProductModel.find((err,doc)=>{
        if(err) res.render('admin/error',{error:err.message});
        else {
            OrderModel.find({kullanici:userId},(err,adet) =>{
                if(adet) {
                    res.render('user/shop',{products:doc,id:userId, action:action,adet:adet.length});
                }
            })
          
        }
    });
}

exports.detailForUser = (req,res,next) => { 
    var productId = req.body.productId;
    var userId = req.body.userId;
   ProductModel.findById(productId,(err,doc)=>{
       if(err) res.render('admin/error',{error:err.message});
       else { 
        OrderModel.find({kullanici:userId},(err,adet) =>{
            if(adet) {
                console.log(adet);
                res.render('user/shop-detail',{product:doc, adet:adet.length , id:userId});
            }
        }).populate('kullanici');
          
       }
   }).populate('tur');
} 

exports.buy = (req,res,next) =>{
    var userId = req.params.id;
    var action = "";
    ProductModel.find((err,doc)=>{
        if(err) res.render('admin/error',{error:err.message});
        else {
            OrderModel.find({kullanici:userId},(err,adet) =>{
                if(adet) {
                    action = "buy";
                    res.render('user/shop',{products:doc,id:userId, action:action,adet:adet.length});
                    action = "undefined";
                }
            })
          
        }
    });
}



