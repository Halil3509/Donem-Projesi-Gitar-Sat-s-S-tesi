const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    ad: String,
});

module.exports = mongoose.model('CategoryModel', CategorySchema);