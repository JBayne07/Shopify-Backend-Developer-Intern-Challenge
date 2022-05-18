const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: String,
    manufacturer: String,
    totalStock: Number,
    currentStock: Number,
    date: Date
});

module.exports = Product = mongoose.model('Product', productSchema);