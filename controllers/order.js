const Order = require('./../model/order');
const config = require('./../config/database');
const product = require('./../model/product');
const User = require('../model/user'); // Import User Model Schema
const jwt = require('jsonwebtoken'); // Compact, URL-safe means of representing claims to be transferred between two parties.
const randomize = require('randomatic');
var FCM = require('fcm-node');
var serverKey = 'AAAA6HgzMSw:APA91bF8VyfUYlyaEeObcDWd8FhiaU_qR6o6AvgTVFhezs7pSkAb3zSOsaUDMKOxRUM5kR4v1-Cnm_8i7TIsyshsOub1xJMIdu6UNVwNabirdVW4bG4kNlHwIjsUrdZv9HEqdDax-5PC'; //put your server key here
var fcm = new FCM(serverKey);
const idnumberOrder = randomize('A0', 6);
const moment = require('moment');

//Order delivery
exports.addOrder = (req, res, next) => {
    const mymesa = Object.assign(...[...new Set(req.body.map(obj => obj.mesa)
        .filter(el => el != null))]);
    const myclient = Object.assign(...[...new Set(req.body.map(obj => obj.clientName)
        .filter(el => el != null))]);
    const cliendId = Object.assign(...[...new Set(req.body.map(obj => obj.cliendId)
        .filter(el => el != null))]);
    const formPay = Object.assign(...[...new Set(req.body.map(obj => obj.formPay)
        .filter(el => el != null))]);
    const myobs = Object.assign(...[...new Set(req.body.map(obj => obj.obs)
        .filter(el => el != null))]);
    const mycost = Object.assign(...[...new Set(req.body.map(obj => obj.totalCart)
        .filter(el => el != null))]);
    const costFrete = Object.assign(...[...new Set(req.body.map(obj => obj.costFrete)
        .filter(el => el != null))])
    const costProd = Object.assign(...[...new Set(req.body.map(obj => obj.costProd)
        .filter(el => el != null))])
    const addressDelivery = Object.assign(...[...new Set(req.body.map(obj => obj.addressDelivery)
        .filter(el => el != null))]);
    const tipoOrder = Object.assign(...[...new Set(req.body.map(obj => obj.tipoOrder)
        .filter(el => el != null))]);    
    console.log('meu novo pedido', req.body);
    const order = new Order({
        orders: req.body,
        numberOrder: idnumberOrder,
        mesa: mymesa,
        clientName:myclient,
        cliendId: cliendId,
        obs:myobs,
        totalCart:mycost,
        costFrete: costFrete,
        costProd: costProd,
        addressDelivery:addressDelivery,
        tipoOrder: tipoOrder,
        formPay: formPay,
        IdProducts: req.body._id
    })
    console.log('meu novo id', order);
    order.save((err, order) => {        
        if (err) {            
            res.json({ success: false, message: err });
        } else {
            res.json({ success: true, message: 'Order saved!' });
        }
    })
}
//Order Loja
exports.addOrderLoja = (req, res, next) => {
    const mymesa = Object.assign(...[...new Set(req.body.map(obj => obj.mesa)
        .filter(el => el != null))]);
    const myclient = Object.assign(...[...new Set(req.body.map(obj => obj.clientName)
        .filter(el => el != null))]);    
    const myobs = Object.assign(...[...new Set(req.body.map(obj => obj.obs)
        .filter(el => el != null))]);
    const mycost = Object.assign(...[...new Set(req.body.map(obj => obj.totalCart)
        .filter(el => el != null))]);   
    const tipoOrder = Object.assign(...[...new Set(req.body.map(obj => obj.tipoOrder)
        .filter(el => el != null))]);    
    console.log('meu novo pedido', req.body);
    const order = new Order({
        orders: req.body,
        numberOrder: idnumberOrder,
        mesa: mymesa,
        clientName:myclient,
       
        obs:myobs,
        totalCart:mycost,   
        tipoOrder: tipoOrder,
        IdProducts: req.body._id
    })
    console.log('meu novo id', order);
    order.save((err, order) => {        
        if (err) {            
            res.json({ success: false, message: err });
        } else {
            res.json({ success: true, message: 'Order saved!' });
        }
    })
}
exports.notifyPush = (req, res) => {
    const MyTitle = ({
        title: req.body.title
    })
    var TopicName = '/topics/mana-music';
    var fcmData = {
        to: TopicName,
        notification: {
            title: MyTitle,
            body: 'Novo pedido solicitado'
        },
    };
    console.log(fcmData);
    fcm.send(fcmData, (err, response) => {
        if (err) {
            console.log("Something has gone wrong!", err);
        } else {
            console.log("Successfully sent with response: ", response);
        }
    });
}
exports.usernotifyAdd = (req, res) => {
    const data = req.body;
    console.log('dados enviados', data);

    data = {
        to: "f_Ze8f4G94s:APA91bGZOIbr7VKKAL0Lnk0ddrIr9s2MksVfePhwKUBtbbGGyHZbvggv4rz2BXqGV0d3r6K-JBnolKhVo5_WsixhhH4NYceg8BKzXN_8422fvJQU8uiTHjDyYCJt09bGPRN-r1fPZibo",
        "data": {
            "title": pedido
        }
    }
    const headers = {
        'Authorization': 'key=AAAA6HgzMSw:APA91bF8VyfUYlyaEeObcDWd8FhiaU_qR6o6AvgTVFhezs7pSkAb3zSOsaUDMKOxRUM5kR4v1-Cnm_8i7TIsyshsOub1xJMIdu6UNVwNabirdVW4bG4kNlHwIjsUrdZv9HEqdDax-5PC',
        'Content-Type': 'application/json'
    }
    const options = {
        uri: 'https://fcm.googleapis.com/fcm/send',
        method: 'POST',
        headers: headers
    }

    console.log('otions', options)
    console.log('result', result);
    fcm.send(options, result, data, (err, res) => {
        if (err) {
            res.status(404).send({ message: 'Não autorizado receber notificação' });
        }
        console.log(body)
        res.status(200).send({ success: true, message: 'usuário atualizado' });


    })

}
exports.getOrders = (req, res, next) => {
    Order.find({}).exec((err, orders) => {
        if (err) {
            res.json({ sucess: false, err })
        } else {
            res.json(Array.from(orders));
            console.log(Array.from(orders))
        }
    })
}
exports.getUserOrders = (req, res, next) => {
    Order.find({}).sort({ '_id': -1 }).exec((err, orders) => {
        if (err) {
            res.json({ sucess: false, err })
        } else {
            User.findOne({ _id: req.decoded.userId }).then((user) => {
            const myId = user._id;
            console.log(Array.from(myId));
            const orderClient = orders.filter(order=> String(order.cliendId)== String(myId));    
            res.json(Array.from(orderClient));
            console.log(Array.from(orderClient))
        })
        }
        
    });
    // Order.find({}).exec((err, orders) => {
    //     if (err) {
    //         res.json({ sucess: false, err })
    //     } else {
           
    //        // const orderClient = orders.filter(order=> String(order.cliendId)== String(myId));    
    //         console.log((Array.from(orders)));
    //         for(let item of orders){
    //             for(let order of Array.from(item.orders)){                   
    //                 //const mysabor = order.sabores;
                
           
    //       //  const minhasorders = mysabor.map(item=> item.title);
    //        console.log(order)
    //        const orderEvents = Object.assign({}, ...order);
    //         //res.json(Array.from(orderClient));
    //        //           
    //        console.log(orderEvents)
    //     }
    // }
    //     }
        
    // })
}
exports.searchOrder = (req, res, next) => {
    console.log("minha query", req.query)
    var m = req.query.mesa;
    var q = req.query.pagamento;
    var p = req.query.status;
    console.log(q, p, m)
    var startDate = req.query.createdAt;
    console.log('my date', startDate)
    var end = req.query.end;
    Order.find({
        pagamento: {
            $regex: new RegExp(q)
        },
        status: {
            $regex: new RegExp(p)
        },
        mesa: {
            $regex: new RegExp(m)
        }
    },
        (err, orders) => {
            if (err) {
                res.json({ sucess: false, err })
            } else {
                res.json(Array.from(orders));
                console.log(Array.from(orders))
            }
        }).sort({ '_id': -1 });
    // var q = req.query.status;
    // Order.find({ 'status': q }, (err, orders) => {
    //     if (err) {
    //         res.json({ sucess: false, err })
    //     } else {
    //         res.json(Array.from(orders));
    //         console.log(Array.from(orders))
    //     }
    // })
}
// exports.getOrders = (req, res, nex)=>{

//     Order.find({}, (err, orders) => {
//         User.find({}).then((users) => {            
//           res.send(users);
//              console.log('meus users', users)
//              const user = users;
//         if ( user.role !== 'cozinha') {
//             res.status(Array.from(orders))
//             console.log(Array.from(orders));

//     }else{
//         if (order.status === 'aberto' && user.role === 'cozinha') { 
//             const orderResult = orders.filter((order) => {
//                 return order.status === 'aberto'
//             })
//             res.send(Array.from(orderResult))
//             console.log(Array.from(orderResult));
//          }
//     }         

// })

//     }).sort({ '_id': -1 });

// }
//************************************************ */
//start several get orders for dashboard
//***************************************************** */
//Order of day
exports.getdateOrders = (req, res, next) => {
    var start = moment().startOf('day');
    var end = String(req.query.end);
    Order.find({
        createdAt: { "$gte": start.toDate() }
    }, (err, orders) => {
        if (err) {
            res.json({ sucess: false, err })
        } else {
            console.log(Array.from(orders))
            res.json(Array.from(orders));
        }
    });
}
//Order of day into store
exports.getdateStore = (req, res, next) => {
    var start = moment().startOf('day');
    var end = String(req.query.end);
    Order.find({
        createdAt: { "$gte": start.toDate() }
    }, (err, orders) => {
        if (err) {
            res.json({ sucess: false, err })
        } else {
            console.log('getdateStore', orders)
        const orderStore = orders.filter(item=> item.tipoOrder == 'loja');
            console.log(Array.from(orderStore))
            res.json(Array.from(orderStore));
        }
    });
}
//Order of day into store
exports.getdateDelivery = (req, res, next) => {
    var start = moment().startOf('day');
    var end = String(req.query.end);
    Order.find({
        createdAt: { "$gte": start.toDate() }
    }, (err, orders) => {
        if (err) {
            res.json({ sucess: false, err })
        } else {
            console.log(orders)
        const orderStore = orders.filter(item=> item.tipoOrder == 'delivery');
            console.log(Array.from(orderStore))
            res.json(Array.from(orderStore));
        }
    });
}


//************************************************ */
//end several get orders for dashboard
//***************************************************** */

exports.getoneOrder = (req, res, next) => {
    const orderId = req.params.id;
    Order.findById(orderId, (err, order) => {
        if (err) {
            res.status(500).send({ message: 'Erro na solicitação' })
        } else {
            if (!order) {
                res.status(404).send({ message: 'Pedido não existe' })
            } else {
                res.status(200).send({ order });
            }
        }
    })
}
exports.finishOrder = (req, res, next) => {
    var orderId = req.params.id;
    var data = req.body.status;
    console.log("my data", data)
    Order.findOneAndUpdate({ _id: orderId }, { $set: { status: data } }, { upsert: true }, function (err, order) {
        console.log(order);
        if (err) {
            res.json({ success: false, msg: 'Failed to update status' });
        }
        else {
            res.json({ success: true, msg: 'Order is updated to On The Way' });
        }
    });
}
exports.pagamentoOrder = (req, res, next) => {
    var orderId = req.params.id;
    var data = req.body.pagamento;
    console.log("my data", data)
    Order.findOneAndUpdate({ _id: orderId }, { $set: { pagamento: data } }, { upsert: true }, function (err, order) {
        console.log(order);
        if (err) {
            res.json({ success: false, msg: 'Failed to update pagamento' });
        }
        else {
            res.json({ success: true, msg: 'Order is updated to On The Way' });
        }
    });
}