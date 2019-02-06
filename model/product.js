const mongoose = require ('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;


const productSchema = new Schema({
    title: {type: String},
    description: {type: String},
    category: {type:String},
    price: {type:Number},
    url: [{
      url: String,
      values: Schema.Types.Mixed
  }],
    fieldname: { type: String },
   originalname: { type: String },
  encoding: { type: String },
  mimeptype: { type: String },
  destination: { type: String },
  filename: { type: String },
  path: { type: String },
  size: { type: Number }
});

module.exports = mongoose.model('Product', productSchema);