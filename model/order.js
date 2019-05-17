const mongoose = require ('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;
const moment = require('moment')
const momentTz = require('moment-timezone')
const now = moment();
const dateToStore = '2018-01-27 10:30'
moment().utcOffset(); // 60 minutes
const timeZone = 'America/Bahia' // 'UTC-03:00'
productSchema  = mongoose.model('Product').schema;
const orderSchema = new Schema({
  numberOrder: {type: String},
 
  status:{
    type: String,
    enum: ['completo', 'aberto'],
    default: 'aberto'
  },
  
  pagamento:{
    type: String,
    enum: ['pago', 'pagamentoAberto'],
    default: 'pagamentoAberto'
  },
  createdAt: { type: String, default: () => moment().format("DD-MM-YYYY, HH:mm:ss") },  
    orders:
  [{
   productId:{type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'},
    quantity:{type:Number},
    mesa: {type:String},
    obs: {type: String},
    totalCart:{ type: String},
    clientName:{type: String},
    product: productSchema
  }]
  

    
        
});
module.exports = mongoose.model('Order', orderSchema);