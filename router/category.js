const categoryController = require ('./../controllers/category');
const express = require ('express');

var api = express.Router();

api.post('/newCategory', categoryController.newCategory);
api.get('/getCategory', categoryController.getCategory);

module.exports = api;