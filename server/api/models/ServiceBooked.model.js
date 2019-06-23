const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ServiceBookedSchema = new Schema({
    appointmentId:{ type: Schema.Types.ObjectId, ref: 'Appointment' },
    serviceId:{ type: Schema.Types.ObjectId, ref: 'Service' },
    price:Number,
});

ServiceBookedSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
    }
});

let ServiceBooked = mongoose.model('ServiceBooked', ServiceBookedSchema, 'serviceBooked');
module.exports = ServiceBooked;