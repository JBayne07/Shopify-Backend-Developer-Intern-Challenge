const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: String,
    manufacturer: String,
    currentStock: Number,
});

module.exports = Product = mongoose.model('Product', productSchema);