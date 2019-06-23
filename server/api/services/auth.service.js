
const User = require("../models/User.model")
const jwtSecret = require('../../config').jwtSecret;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const LONG_TOKEN = 30;
const SHORT_TOKEN = 1;


function decrypt(password){
    return new Promise((resolve,reject)=>{
        return bcrypt.hash(password, 10, function (err, hash) {
            if (err) {
                return reject(err)
            }
            return resolve(hash);
        })
    })
}
   
function signup(user) {
    return User.create(user)
}

// function generateJWT(payload, expirationInDays) {
//     let today = new Date();
//     let exp = new Date(today);
//     exp.setDate(today.getDate() + expirationInDays);

//     payload.exp = parseInt(exp.getTime() / 1000);

//     return jwt.sign(payload, jwtSecret);
// }

function resetPassword(id, password) {
    return decrypt(password).then(hash=>{
        return User.findOneAndUpdate({_id: id}, { password: hash})
    })
}


function forgotPassword(email) {
    return User.findOne({ email: email })
        .then((user) => {
            if (user) {
                let payload = {
                    id: user.id,
                }
                let expirationDate = 1;
                return this.generateJWT(payload, expirationDate);
            }
            return Promise.reject("User does not exist")
        })
}

function isUserExist(email){

    return User.findOne({email:email})
    .then((data) => {
        if(data){
            return Promise.resolve()
        }
        else{
            return Promise.reject()
        }
    })
    
}

function validateToken(token) {
    try {
        return jwt.verify(token, jwtSecret);
    } catch (err) {
        return false;
    }

}

module.exports = {
    signup,
    forgotPassword,
    resetPassword,
    decrypt,
    validateToken,
    isUserExist:isUserExist,
    login :(req)=> {
        let newToken;
        if (req.body.remember) { newToken = req.user.generateJWT(LONG_TOKEN) }
        else { newToken = req.user.generateJWT(SHORT_TOKEN) };
        return Promise.resolve({ token: newToken })
        
    },
}

