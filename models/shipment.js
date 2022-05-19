const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const shipmentSchema = new Schema({
    name: String,
    products: [{_id: Schema.Types.ObjectId, stock: Number}],
});

module.exports = Shipment = mongoose.model('Shipment', shipmentSchema);