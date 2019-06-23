const Service         = require('./Service.model');
const ServiceBooked = require('./ServiceBooked.model');
const ServiceProvided           = require('./ServiceProvided.model');
const Professional           = require('./Professional.model');
const Client        = require('./Clients.model');
const User     = require('./User.model');
const Appointment       = require('./Appointment.model');
const Schedule       = require('./Schedule.model');

module.exports = {
    Service,
    ServiceBooked,
    ServiceProvided,
    Professional,
    Client,
    User,
    Appointment,
    Schedule
};