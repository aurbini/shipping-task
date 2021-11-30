/**
 * cotrollers/packages.js
 */

const express = require("express");
const router = express.Router();
const PackageModel = require("../models/Package");
const ShipmentModel = require("../models/Shipment");
const OrderModel = require("../models/Order");
module.exports = router;

// ---------------------------
// ---------------------------
// ROUTES
// ---------------------------
// ---------------------------

router.get("/", getPackages);
router.put("/", createPackage);
router.patch("/", editPackage);
router.delete("/:id/", deletePackage);

router.get("/queue", getPackageQueue);

// ---------------------------
// ---------------------------
// CONTROLLER
// ---------------------------
// ---------------------------

const checkIfPackageShipped = async (packageID) => {
  const isPackagedShipped = (await ShipmentModel.findOne({
    $and: [
      { "contents.packageID": packageID },
      { shipmentDate: { $lt: new Date() } },
    ],
  }))
    ? true
    : false;
  return isPackagedShipped;
};

async function getPackages(req, res) {
  try {
    const packages = await PackageModel.find({});
    res.json(packages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  throw new Error("Not implemented.");
}

async function createPackage(req, res) {
  const packageNumber = await PackageModel.count();
  const package = {
    order: req.body.order,
    packageID: `${req.body.customerID}-PS${packageNumber + 1}`,
    content: req.body.content,
  };
  try {
    const result = await PackageModel.create(package);
    return res.json(result);
  } catch (err) {
    return res.status(400).json(err);
  }
}

async function editPackage(req, res) {
  const isPackageCreated = await PackageModel.findOne({
    packageID: req.body.packageID,
  });
  //check if package id is in shipments and if shipment date is in the future
  const hasPackageBeenShipped = await checkIfPackageShipped(req.body.packageID);

  if (isPackageCreated && !hasPackageBeenShipped) {
    try {
      const result = await PackageModel.updateOne(
        { packageID: req.body.packageID },
        {
          $set: {
            content: req.body.content,
          },
        }
      );
      return res.json(result);
    } catch (err) {
      return res.status(400).json(err);
    }
  }
  return res
    .status(400)
    .json({ message: "Cannot edit package that has been shipped." });
  // throw new Error("Not implemented.");
}

async function deletePackage(req, res) {
  const { id } = req.params;

  try {
    const result = await PackageModel.deleteOne({ packageID: id });
    return res.json(result);
  } catch (err) {
    return res.status(400).json(err);
  }
  throw new Error("Not implemented.");
}

async function getPackageQueue(req, res) {
  try {
    const result = await OrderModel.find(
      {
        items: {
          $elemMatch: {
            readyToShip: false,
          },
        },
      },
      { "items.$": 1, orderNumber: 1, customerID: 1 }
    );
    return res.json(result);
  } catch (err) {
    return res.status(400).json(err);
  }
  throw new Error("Not implemented.");
}

//drop contents in package
// try {
//   const result = await PackageModel.updateOne(
//     { packageID: id },
//     {
//       $unset: {
//         contents: 1,
//       },
//     }
//   );
//   return res.json(result);
// }
