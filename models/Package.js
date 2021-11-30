/**
 * models/Shipment.js
 */

const mongoose = require("mongoose");

const PackageSchema = new mongoose.Schema({
  // TODO: Complete this according the the specifications outlined in the README
  packageID: {
    type: String,
    required: true,
  },
  order: {
    // packageID
    type: String,
    required: true,
  },
  content: [
    {
      part: String,
      quantity: Number,
      // readyToShip: Boolean,
    },
  ],
  shipmentID: {
    type: String,
    required: false,
    defaultValue: null,
  },
});

const PackageModel = mongoose.model("package", PackageSchema);
module.exports = PackageModel;
