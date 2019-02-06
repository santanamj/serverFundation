const productController = require ('./../controllers/product');
const AuthenticationControler = require ('../controllers/user');
const express =  require ('express');

var api = express.Router();

api.post('/addProduct', productController.addProduct);
api.get('/getProducts',  productController.getProducts );

module.exports = api;