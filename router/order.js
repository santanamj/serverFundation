const orderController = require ('./../controllers/order');
const express =  require ('express');

var api = express.Router();

api.post('/addOrder', orderController.addOrder);
api.post('/usernotifyAdd', orderController.usernotifyAdd);
api.get('/getOrders', orderController.getOrders);
api.get('/getoneOrder/:id', orderController.getoneOrder);
api.put('/finishOrder', orderController.finishOrder);
module.exports = api;