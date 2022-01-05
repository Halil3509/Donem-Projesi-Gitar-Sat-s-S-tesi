const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
var action = "merhaba";

const userModel = require('../models/user.model');
const productModel = require('../models/product.model');

var productCount= "";



exports.list = (req, res, next) => {
   userModel.find((err,doc=>{
       if(err) res.render('admin/error',{error:err.message});
       else console.log("helal lansana");
   }));
}

