const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ServiceSchema = new Schema({
    serviceName:String,
    duration:Number,
    price:Number,
});

ServiceSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
    }
});

let Service = mongoose.model('Service', ServiceSchema, 'services');
module.exports = Service;