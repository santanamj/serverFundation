const orderController = require ('./../controllers/order');
const AuthenticationControler = require ('../controllers/user'),
express = require ('express');

var api = express.Router();

api.post('/addOrder', orderController.addOrder);
api.post('/addOrderLoja', orderController.addOrderLoja);
api.get('/notifyPush', orderController.notifyPush);
api.post('/usernotifyAdd', orderController.usernotifyAdd);
api.get('/getOrders', orderController.getOrders);
api.get('/getdateOrders', orderController.getdateOrders);
api.get('/getdateStore', orderController.getdateStore);
api.get('/getdateDelivery', orderController.getdateDelivery);
api.get('/getUserOrders', AuthenticationControler.use, orderController.getUserOrders);
api.get('/searchOrder', orderController.searchOrder);
api.get('/getoneOrder/:id', orderController.getoneOrder);
api.put('/finishOrder/:id', orderController.finishOrder);
api.put('/pagamentoOrder/:id', orderController.pagamentoOrder);

module.exports = api;