const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    ad:{
        type:String,
        required:true
    },
    soyad:{
        type:String,
        required:true
    },
    cinsiyet:{
        type:String,
        default:"kadın"
    },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: { type: String, required: true }
});

module.exports = mongoose.model('UserModel', userSchema);