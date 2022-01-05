const mongoose = require('mongoose');

var action = "merhaba";

const AdminModel = require('../models/admin.model');
const productModel = require('../models/product.model');

var productCount= "";




// exports.signup = (req, res, next) => {
//     let signupedPerson = { 
//         ad:"Emel Gizem",
//         soyad:"AY",
//         email:"210601689@bakircay.edu.tr",
//         password:"12345"
//     }
//     AdminModel.find({ email: signupedPerson.email }).then(result => {
//         // bu işlem e posta dan 1 den fazla varsa hata verme işlemidir
//         if (result.length >= 1) {
//             action = 'fault';
//             res.render('user/signup',{action:action});
//         }
//         else {
//             bcrypt.hash(signupedPerson.password, 10, (err, hash) => {
//                 if (err) res.render('admin/error', { error: err.message });
//                 else {
//                     const user = new AdminModel({
//                         ad: signupedPerson.ad,
//                         soyad: signupedPerson.soyad,
//                         email: signupedPerson.email,
//                         password: hash
//                     });
//                     user.save().then(result => {
//                         console.log(result);
//                         action = "signuped";
//                         res.render('user/login', { action: action });
//                     })
//                         .catch(err => {
//                             res.render('admin/error',{error:err.message});
//                         });

//                 }
//             })
//         }
//     });
// }