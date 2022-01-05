const mongoose =require('mongoose');

const OrderModel = require('../../models/order.model');
const ProductModel = require('../../models/product.model');

var UserId = "";
exports.addToBasket = (req,res,next) =>{ 
     UserId = req.body.userId;
    var productId = req.body.productId;
    let createData = {
        kullanici:UserId,
        product:productId
    }
    var orders = new OrderModel(createData);
    orders.save((err,doc)=>{
        if(err) res.render('admin/error',{error:err.message});
        else {
            ProductModel.find((err,result)=>{
                if(err) res.render('admin/error',{error:err.message});
                else {
                     OrderModel.find({kullanici:UserId},(err,adet) =>{
                        if(adet) {
                            action = "create";
                            res.render('user/shop',{products:result,id:UserId,action:action, adet: adet.length});
                            action = 'undefined';
                        }
                    })
                   
                }
            }).populate('tur');
        }
    })
}

exports.openBasket = (req,res,next) => { 
    UserId = req.params.id;    
    OrderModel.find({kullanici:UserId},(err,doc)=>{
        if(err) res.render('admin/error',{error:err.message});
        else {
            if(doc.length < 1) {
                res.render('user/basket',{id:UserId,adet:doc.length, entityStation:'false'});
            }
            else
            {
                res.render('user/basket',{products:doc,id:UserId,adet:doc.length, entityStation:'true'});
            }
            
        }
    }).populate({
        path:'product',
        populate:{
            path:'tur'
        }
    });
}

exports.removeFromBasket = (req,res,next) =>{
    var orderId = req.params.id;
   OrderModel.deleteOne({_id : orderId},(err,doc)=>{
       if(err) res.render('admin/error',{error:err.message});
       else {
        ProductModel.find((err,result)=>{
            if(err) res.render('admin/error',{error:err.message});
            else {
                 OrderModel.find({kullanici:UserId},(err,adet) =>{
                    if(adet) {
                        res.render('user/shop',{products:result,id:UserId,action:"delete", adet: adet.length});
                        action = 'undefined';
                    }
                })
               
            }
        }).populate('tur');
       }
   }).populate('product');
}

  