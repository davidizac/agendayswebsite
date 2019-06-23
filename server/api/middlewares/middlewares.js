const passport = require('../../config/passport');

function login(req, res, next) {
    passport.authenticate('local', { session: false }, (err, passportUser, info)=> {
        if (!passportUser) {
            return res.status(401).send({msg : err})
        }
        req.user = passportUser;
        next();
    })(req, res, next);
}

function authenticate(req,res,next) {
    passport.authenticate('jwt', { session: false },(err, user, info)=>{
        if (err){
            req.error = err
        }
        if(!user){
            return res.send(401,{msg : info})
        }
        req.user = user;
        req.error = info
        next();
    })(req, res, next);
}

// function userPermission(action,paramKey){  
//     return function (req,res,next){
//         action.entityId = req.params[paramKey] || undefined;
//         return authService.isUserHasPermission(req.user ? req.user : {roles:[]}, action)
//         .then(isAuthorized => 
//             {isAuthorized ? next() : next()}
//             );
//     }
// }


module.exports = {
    login,
    authenticate,
    
}