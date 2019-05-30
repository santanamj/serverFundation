const mongoose = require ('mongoose');
mongoose.Promise = global.Promise;
const Schema =  mongoose.Schema;

const addressSchema = new Schema({
    logradouro: {type: String},
    numero: {type: Number},
    complemento: {type:String}       
});

module.exports = mongoose.model('Address', addressSchema)