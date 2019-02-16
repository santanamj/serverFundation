const Order = require ('./../model/order');
const config = require('./../config/database');
const product = require('./../model/product');
const User = require('../model/user'); // Import User Model Schema
const jwt = require('jsonwebtoken'); // Compact, URL-safe means of representing claims to be transferred between two parties.
var FCM = require('fcm-node');
var serverKey = 'AAAA6HgzMSw:APA91bF8VyfUYlyaEeObcDWd8FhiaU_qR6o6AvgTVFhezs7pSkAb3zSOsaUDMKOxRUM5kR4v1-Cnm_8i7TIsyshsOub1xJMIdu6UNVwNabirdVW4bG4kNlHwIjsUrdZv9HEqdDax-5PC'; //put your server key here
var fcm = new FCM(serverKey);
exports.addOrder = (req, res, next) => {
    const order = new Order({
        orders: req.body
    })
    
    order.save((err, order) => {
        if (err) {
            res.json({ success: false, message: err });
        } else {
            res.json({ success: true, message: 'Order saved!' });
           
               
              //  const result = users.map(user => user.registerfcm);
           //   const token= 
                var fcmData= {
                    to: "APA91bHb6Ngs8pHskbPVnoBPl4DkWweNx3z77_Wjv4EdEVoI8x9qQOkleSZGZ_ThemH50hcM8-t10qq_HIYf0Iu9NkDbWYQBaUy4SgjTyPKv_rQC2KDhVrokAldd2XfF__iF41Q9wRzm",
                    "data": {
                        "title": "Novo produto"
                    },
                   
                }
                var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
                    to: 'registration_token', 
                    collapse_key: 'your_collapse_key',
                    
                    notification: {
                        title: 'Title of your push notification', 
                        body: 'Body of your push notification' 
                    },
                    
                    data: {  //you can send only notification or only data(or include both)
                        my_key: 'my value',
                        my_another_key: 'my another value'
                    }
                };
                  console.log(fcmData);
                fcm.send( fcmData, (err, res) => {
                    if (err) {
                        console.log("Something has gone wrong!");
                    } else {
                        console.log("Successfully sent with response: ", res);
                    }
                });

           
        }
    })
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
        fcm.send(options, result, data, (err, res)=>{
            if (err) {
              res.status(404).send({message: 'Não autorizado receber notificação'});
            }
            console.log(body)
            res.status(200).send({success: true, message: 'usuário atualizado'});
   
    
       })
   
}
exports.getOrders = (req, res, nex)=>{
    Order.find({}, (err, orders)=>{
        if(err){
            res.json({sucess: false, err})
        }else{
            res.send(Array.from(orders))
            console.log(Array.from(orders));
        }
    }).sort({ '_id': -1 });
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
exports.getoneOrder = (req, res, next)=>{
    const orderId = req.params.id;
    Order.findById(orderId,(err, order)=>{
        if(err){
            res.status(500).send({message: 'Erro na solicitação'})
        }else{
            if(!order){
            res.status(404).send({message:'Pedido não existe'})
        }else{
            res.status(200).send({order});
        }
    }
    })
}
exports.finishOrder = (req, res, next)=>{
    Order.findOne({_id: req.body._id}, (err, order)=>{
        order.status = req.body.status;
        order.save((err) =>{
            if(err){
                if(err.errors){
                    res.json({sucess:false, message: 'Pedido não finalizado'});
                }
            }else{
                res.json({sucess: true, message:'Pedido finalizado'});
                console.log(res.json);
            }
        })

    } )
}