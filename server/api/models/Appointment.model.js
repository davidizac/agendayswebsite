const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let AppointmentSchema = new Schema({
    date_created:{type:Date},
    clientId: { type: Schema.Types.ObjectId, ref: 'Client' },
    ProfessionalId: { type: Schema.Types.ObjectId, ref: 'Professional' },
    clientName: {type:String, required:true},
    clientContact: {type:String, required:true},
    startTime:Date,
    end_time_expected:Date,
    end_time:Date,
    price_expected:Number,
    price_full:Number,
    discount:Number,
    price_final:Number,
    canceled:Boolean,
    cancellation_reason:String
    //Professional_created
});

AppointmentSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
    }
});

let Appointment = mongoose.model('Appointment', AppointmentSchema, 'appointments');

module.exports = Appointment;