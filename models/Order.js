const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  // TODO: Complete this according the the specifications outlined in the README
  customerId: String,
  orderNumber: String,
  items: [
    {
      part: String,
      batch: Number,
      qty: Number,
      readyToShip: Boolean,
    },
  ],
});

const OrderModel = mongoose.model("orders", OrderSchema);
module.exports = OrderModel;
