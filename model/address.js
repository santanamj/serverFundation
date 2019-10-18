const mongoose = require ('mongoose');
mongoose.Promise = global.Promise;
const Schema =  mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const addressSchema = new Schema({
   
    logradouro: {type: String},
    numero: {type: Number},
    bairro: {type: Schema.Types.ObjectId, ref: 'Bairro'},
    complemento: {type:String},
    userAddress: {type: String},       
});

module.exports = mongoose.model('Address', addressSchema)