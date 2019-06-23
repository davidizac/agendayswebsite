const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ServiceProvidedSchema = new Schema({
    appointmentId:{ type: Schema.Types.ObjectId, ref: 'Appointment' },
    serviceId:{ type: Schema.Types.ObjectId, ref: 'Service' },
    price:Number,
});

ServiceProvidedSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
    }
});

let ServiceProvided = mongoose.model('ServiceProvided', ServiceProvidedSchema, 'serviceProvided');
module.exports = ServiceProvided;