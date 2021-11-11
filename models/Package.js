/**
 * models/Shipment.js
 */

const mongoose = require('mongoose');

const PackageSchema = new mongoose.Schema({
  // TODO: Complete this according the the specifications outlined in the README
});
 
const PackageModel = mongoose.model('shipment', PackageSchema);
module.exports = PackageModel;