const Address = require ('./../model/address.js');
const config = require ('./../config/database');



exports.newAddress = (req, res, nex)=>{
   
    const address = new Address ({
        logradouro: req.body.logradouro,
        numero: req.body.numero,
        complemento: req.body.complemento
    });
    address.save((err)=>{
        if(err){
            res.json({success: false, message: err})
        }else{
            res.json({success: true, message: 'created address'});
        }
    })
    
}
exports.getAddress = (req, res, next)=>{
    Address.find({}, (err, addresses)=>{
        if(err){
            res.json({success: false, message: err})
        }else{
           console.log(addresses)
        res.send(addresses);
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


