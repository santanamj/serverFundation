const mongoose = require ('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;
productSchema  = mongoose.model('Product').schema;
const orderSchema = new Schema({
  status:{
    type: String,
    enum: ['completo', 'aberto'],
    default: 'aberto'
  },
    orders:
  [{
   productId:{type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'},
    quantity:{type:Number},
    product: productSchema
  }]
  

    
        
});
module.exports = mongoose.model('Order', orderSchema);