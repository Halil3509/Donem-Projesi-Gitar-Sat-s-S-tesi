const mongoose = require('mongoose');

const adresSchema = new mongoose.Schema({
    il:String,
    ilce:String,
    acikAdres:String,
    kullanici:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"UserModel"
    }
});

module.exports = mongoose.model('AdresModel',adresSchema);