/**
 * models/Shipment.js
 */

const mongoose = require("mongoose");

const ShipmentSchema = new mongoose.Schema({
  // TODO: Complete this according the the specifications outlined in the README
  shipmentID: {
    type: String,
    required: true,
  },
  packagedInShipment: [
    {
      packageID: {
        type: String,
        required: true,
      },
    },
  ],
  shipmentDate: {
    type: Date,
    required: false,
    defaultValue: null,
  },
});

const ShipmentModel = mongoose.model("shipment", ShipmentSchema);
module.exports = ShipmentModel;
