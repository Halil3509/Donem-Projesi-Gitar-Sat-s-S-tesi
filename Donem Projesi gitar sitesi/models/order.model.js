const mongoose = require('mongoose');

const OrderSchema  = new mongoose.Schema({
    kullanici:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'UserModel'
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'ProductModel'
    }
});

module.exports = mongoose.model('OrderModel',OrderSchema);