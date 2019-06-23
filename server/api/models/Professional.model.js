const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ProfessionalSchema = new Schema({
    username:'String',
    services:[ {type: Schema.Types.ObjectId, ref: 'Service' }]
});

ProfessionalSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
    }
});

let Professional = mongoose.model('Professional', ProfessionalSchema, 'professionals');
module.exports = Professional;