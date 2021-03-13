const subproductController = require ('./../controllers/subproducts');
const AuthenticationControler = require ('../controllers/user');
const express =  require ('express');

var api = express.Router();

api.post('/addSubProduct', subproductController.addSubProduct);
api.get('/getSubproduct', subproductController.getSubproduct);
api.get('/oneSubproducts/:id', subproductController.oneSubproducts);
api.get('/getProducts',  subproductController.getProducts );
module.exports = api;