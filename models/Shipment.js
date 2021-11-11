/**
 * models/Shipment.js
 */

const mongoose = require('mongoose');

const ShipmentSchema = new mongoose.Schema({
  // TODO: Complete this according the the specifications outlined in the README
});

const ShipmentModel = mongoose.model('shipment', ShipmentSchema);
module.exports = ShipmentModel;