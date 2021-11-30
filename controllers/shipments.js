/**
 * cotrollers/shipments.js
 */

const express = require("express");
const ShipmentModel = require("../models/Shipment");
const router = express.Router();
const moment = require("moment");

module.exports = router;

// ---------------------------
// ---------------------------
// ROUTES
// ---------------------------
// ---------------------------

router.get("/", getShipments);
router.put("/", createShipment);
router.patch("/", editShipment);
router.delete("/:id", deleteShipment);

router.get("/queue", getShipmentQueue);

// ---------------------------
// ---------------------------
// CONTROLLER
// ---------------------------
// ---------------------------

async function getShipments(req, res) {
  //get all shipments where shipmentDate passed current date
  const currentDate = Date(); //get current date
  try {
    const shipments = await ShipmentModel.find({
      shipmentDate: { $lt: currentDate },
    });
    res.json(shipments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  throw new Error("Not implemented.");
}

async function createShipment(req, res) {
  if (
    moment(req.body.shipmentDate, "MM/DD/YYYY", true).isValid() ||
    req.body.shipmentDate === null
  ) {
    const shipmentNumber = (await ShipmentModel.count()) + 1;
    const shipment = {
      shipmentID: `${req.body.customerID}-SH${shipmentNumber}`,
      contents: req.body.contents,
      shipmentDate: req.body.shipmentDate
        ? new Date(req.body.shipmentDate)
        : null,
    };
    try {
      const result = await ShipmentModel.create(shipment);
      return res.json(result);
    } catch (err) {
      return res.status(400).json(err);
    }
  }
}

async function editShipment(req, res) {
  const findShipment = await ShipmentModel.findOne({
    shipmentID: req.body.shipmentID,
  });
  try {
    const editedShipment = await ShipmentModel.updateOne(
      { shipmentID: req.body.shipmentID },
      {
        $set: {
          shipmentDate: new Date(req.body.newShipmentDate),
        },
      }
    );
    return res.json(editedShipment);
  } catch (err) {
    return res.status(400).json(err);
  }
  throw new Error("Not implemented.");
}

async function deleteShipment(req, res) {
  const { id } = req.params;
  try {
    const result = await ShipmentModel.deleteOne({ shipmentID: id });
    return res.json(result);
  } catch (err) {
    return res.status(400).json(err);
  }
  throw new Error("Not implemented.");
}

async function getShipmentQueue(req, res) {
  //get all shipments where shippedat is null
  try {
    const shipments = await ShipmentModel.find({
      $or: [{ shipmentDate: null }, { shipmentDate: { $gt: new Date() } }],
    });
    res.json(shipments);
  } catch {
    res.status(500).json({ message: err.message });
  }
  throw new Error("Not implemented.");
}
