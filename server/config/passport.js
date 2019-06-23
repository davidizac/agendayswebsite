const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');
var JwtStrategy = require('passport-jwt').Strategy
var ExtractJwt = require('passport-jwt').ExtractJwt;
const jwtSecret = require('../config').jwtSecret

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = jwtSecret;


const User = mongoose.model('User');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
}, (email, password, done) => {
    User.findOne({ email })
        .then((user) => {
            return new Promise((resolve,reject) => {
                if(user){
                    return resolve(user.validPassword(password))
                }
                else return resolve(false)
            })
           .then((validPassword) => {
                if (!user || !validPassword) {
                    return done('Email or password is invalid');
                }

                return done(null, user);
           }).catch((err) => {
                return done("Unknow Error")
           })
        }).catch(done);
}));



passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.sub}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));

module.exports = passport;

