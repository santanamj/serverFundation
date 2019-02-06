const mongoose = require ('mongoose');
mongoose.Promise = global.Promise;
const Schema =  mongoose.Schema;


const categorySchema = new Schema({
    title: {type: String},
    description: {type: String}
});

module.exports = mongoose.model('Category', categorySchema)