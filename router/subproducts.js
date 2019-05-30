const subproductController = require ('./../controllers/subproducts');
const AuthenticationControler = require ('../controllers/user');
const express =  require ('express');

var api = express.Router();

api.post('/addSubproduct', subproductController.addSubproduct);
api.get('/getSubproducts',  subproductController.getSubproducts );

module.exports = api;