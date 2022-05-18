const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const shipmentSchema = new Schema({
    name: String,
    products: [{id: Schema.Types.ObjectId, stock: Number}],
    date: Date
});

module.exports = Shipment = mongoose.model('Shipment', shipmentSchema);