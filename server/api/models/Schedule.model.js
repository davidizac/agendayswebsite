const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ScheduleSchema = new Schema({
    professionalId: { type: Schema.Types.ObjectId, ref: 'Professional' },
    from:Date,
    to:Date
});

ScheduleSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
    }
});

let Schedule = mongoose.model('Schedule', ScheduleSchema, 'schedules');
module.exports = Schedule;