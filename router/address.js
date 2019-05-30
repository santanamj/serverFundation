const addressController = require ('./../controllers/address');
const express = require ('express');

var api = express.Router();

api.post('/newAddress', addressController.newAddress);
api.get('/getAddress', addressController.getAddress);
api.get('/oneAddresses/:id', addressController.oneAddresses);
api.get('/ProductAddress',   addressController.ProductAddress);
module.exports = api;