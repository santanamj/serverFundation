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
exports.addOrder = (req, res, next) => {

    const order = new Order({
        orders: req.body,
        numberOrder: idnumberOrder
    })

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
exports.searchOrder = (req, res, next) => {
    var q = req.query.pagamento;
    var p = req.query.status;
    console.log(q)
    var startDate = req.query.createdAt;
    console.log('my date', startDate)
    var end = req.query.end;
    Order.find({ 
        pagamento: { 
            $regex: new RegExp(q)
         },
         status: { 
            $regex: new RegExp(p)
         }      
        },     
      (err, orders) => {
        if (err) {
            res.json({ sucess: false, err })
        } else {
            res.json(Array.from(orders));
            console.log(Array.from(orders))
        }
    })
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