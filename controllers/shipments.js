/**
 * cotrollers/shipments.js
 */

const express = require('express');
const router = express.Router();

module.exports = router;

// ---------------------------
// ---------------------------
// ROUTES
// ---------------------------
// ---------------------------

router.get('/', getShipments);
router.put('/', createShipment);
router.patch('/', editShipment);
router.delete('/', deleteShipment);

router.get('/queue', getShipmentQueue);

// ---------------------------
// ---------------------------
// CONTROLLER
// ---------------------------
// ---------------------------

async function getShipments(req, res) {
  throw new Error('Not implemented.');
}

async function createShipment(req, res) {
  throw new Error('Not implemented.');
}

async function editShipment(req, res) {
  throw new Error('Not implemented.');
}

async function deleteShipment(req, res) {
  throw new Error('Not implemented.');
}

async function getShipmentQueue(req, res) {
  throw new Error('Not implemented.');
}