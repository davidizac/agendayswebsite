const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ClientChema = new Schema({
    clientName:String,
    contactMobile:String,
    contactMail:String,
});

ClientChema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
    }
});

let Client = mongoose.model('Client', ClientChema, 'clients');
module.exports = Client;