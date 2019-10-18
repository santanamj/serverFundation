const Address = require ('./../model/address.js');
const jwt = require('jsonwebtoken'); // Compact, URL-safe means of representing claims to be transferred between two parties.
const config = require('../config/database'); // Import database configuration
const User = require ('../model/user');


exports.newAddress = (req, res, nex)=>{   
    const address = new Address ({
        logradouro: req.body.logradouro,
        numero: req.body.numero,
        bairro: req.body.bairro,
        complemento: req.body.complemento,
        userAddress: req.body.userAddress
    });
    
    address.save((err)=>{
        if(err){
            console.log(address);
            res.json({success: false, message: err})
        }else{
            res.json({success: true, message: 'created address'});
        }
    })
    
}
exports.getAddress = (req, res, next) => {
    Address.find({}, (err, addresses) => {
        if (err) {
            res.send({ success: false, message: err })
        } else {
            User.findOne({ _id: req.decoded.userId }).then((user) => {
                console.log(user)
                const myId = user._id;
                const results = addresses.filter(address => String(address.userAddress) === String(myId));
                return  res.json({success: results}), console.log({addresses: results});
                    })
               }
    })
}
exports.oneAddresses = (req, res) =>{
    var addressId = req.params.id;
      Address.findById(addressId).populate('products').exec((err, addresses) => {
        console.log("addresses:", addresses);
        res.send({success: addresses});
      });
  };


