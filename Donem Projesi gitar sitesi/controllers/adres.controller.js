const mongoose = require('mongoose');


const AdresModel = require('../models/adres.model');


exports.create = (req,res,next) =>{
    let createData = {
      il:"izmir",

      ilce:"Çiğli",

      acikAdres:"7895sokak no:65",

      kullanici:"61bf81f954d12c5313d73345"
    }
    var adresses = new AdresModel(createData);

    adresses.save((err,doc)=>{
        if(err) res.status(404).json({message:"işlem başarılı"});

        else res.status(200).json({message:"işlem başarılı",data:doc});
    });
}