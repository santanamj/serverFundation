const productController = require ('./../controllers/product');
const AuthenticationControler = require ('../controllers/user');
const express =  require ('express');

var api = express.Router();

api.post('/addProduct', productController.addProduct);
//api.get('/getProducts',  productController.getProducts );
api.get('/getProduct/:id', productController.getProduct);
api.get('/SubProduct',   productController.SubProduct);
module.exports = api;