const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer');

const CategoryModel = require('../models/category.model');
const ProductModel = require('../models/product.model');

exports.list = (req, res, next) => {
    ProductModel.find((err, doc) => {
        if (err) return res.status(404).json({
            message: "listeleme işlemi başarısız"
        });
        else {
            res.render('admin/table', {
                products: doc,
                action: 'undefined'
            });
        }
    }).populate('tur');
}

//ilk ekleme işini hallet product ekle sonra detaya gitme işlmeini yap 

exports.create = (req, res, next) => {
    CategoryModel.find({ ad: req.body.tur }, (err, result) => {
        console.log(result);  //dönüşünde array döndürür
        let createData = {
            baslik:req.body.baslik,
            marka: req.body.marka,
            model: req.body.model,
            renk: req.body.renk,
            klavye: req.body.klavye,
            sap: req.body.sap,
            perdesayisi: req.body.perdesayisi,
            tur: result[0]._id,
            manyetikler: req.body.manyetikler,
            fotografUrl: "../"+req.body.fotografUrl,
            fiyat: req.body.fiyat,
            boyut: req.body.boyut,
            yon: req.body.yon
        }

        console.log(createData);
        var products = new ProductModel(createData);
        products.save((err, doc) => {
            console.log(doc);
            if (err) res.render('admin/error',{error:err.message});
            else {
                ProductModel.find((err, result) => {
                    if (err) res.render('admin/error', { error: err.message });
                    else res.render('admin/table', { products: result, action: 'create' });
                }).populate('tur');
            }
        });
    });
}

exports.update = (req, res, next) => {
    CategoryModel.find({ ad: req.body.tur }, (err, result) => {
        let updateData = {
            baslik:req.body.baslik,
            marka: req.body.marka,
            model: req.body.model,
            renk: req.body.renk,
            klavye: req.body.klavye,
            sap: req.body.sap,
            perdesayisi: req.body.perdesayisi,
            tur: result[0]._id,
            manyetikler: req.body.manyetikler,
            fotografUrl:"../"+req.body.fotografUrl,
            fiyat: req.body.fiyat,
            boyut: req.body.boyut,
            yon: req.body.yon
        }
        ProductModel.updateOne({ _id: req.body.ID }, updateData, (err, doc) => {
            if (err) res.render('admin/error', { error: err.message });
            else {
                ProductModel.find((err, result2) => {
                    res.render('admin/table', { action: "edit", products: result2 });
                }).populate('tur');
            }
        })
    });
}

exports.delete = (req, res, next) => {
    var id = req.params._id;
    ProductModel.findByIdAndDelete({ _id: id }, (err, doc) => {
        if (err) res.render('admin/error', { error: err.message });
        else {
            ProductModel.find((err, result) => {
                if(err) res.render('admin/error',{error:err.message});
                else res.render('admin/table', {
                    products: result,
                    action: "delete"
                 });
            });
        }
    })
}
var product = "";
exports.getById = (req, res, next) => {
    var id = req.params._id;
    ProductModel.findById(id, (err, doc) => {
        product = doc;
        if (err) res.render('admin/error', { error: err.message });
        else {
            res.render('admin/detail', { product: doc, file: "../" + doc.fotografUrl });
        }
    }).populate('tur');
}

exports.addMenu = (req, res, next) => {
    res.render('admin/addMenu');
}


//Image işlemleri
// Set The Storage Engine
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// Init Upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 5000000 },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('image');

// Check File Type
function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}


exports.ChangeImage = (req, res, next) => {
    upload(req, res, (err) => {
        if (err) {
            res.render('admin/error', {
                error: err.message
            });
        } else {
            console.log(product);
            res.render('admin/detail', {
                // filename: req.file.filename,
                file: `../uploads/${req.file.filename}`,
                product: product,
            });
        }
    });
}

exports.ChangeImageForCreate = (req, res, next) => {
    upload(req, res, (err) => {
        if (err) {
            res.render('admin/error', {
                error: err.message
            });
        } else {
            console.log(product);
            res.render('admin/addMenu', {
                // filename: req.file.filename,
                file: `../uploads/${req.file.filename}`,
            });
        }
    });
}
