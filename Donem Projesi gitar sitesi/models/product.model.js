const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema ({
    baslik:{type:String, default:"Gitar"},
    marka: { type: String, required: true },
    model: { type: String, required: true },
    renk: { type: String, default: "siyah" },
    klavye: { type: String },
    sap: { type: String },
    perdesayisi: { type: Number, default:'12'},
    fotografUrl:{type:String},
    tur: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'CategoryModel'
     },
    manyetikler: { type: String, default:"3 Single"},
    fiyat: { type: Number, required: true },
    boyut:{type:String, default:'4/4'},
    yon:{type:String, default:'sağlak'}
});

module.exports = mongoose.model('ProductModel',ProductSchema);