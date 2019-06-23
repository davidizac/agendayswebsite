const authService = require("../services/auth.service")

module.exports = {
    login : (req,res)=> {
        return authService.login(req)
        .then((result) => {
            return res.json(result);
        })
        .catch(error => {
            res.status(401).send(error)
        })
    },

    signup : (req,res)=> {
        return authService.signup(req.body)
        .then((result) => {
            return res.json(result);
        })
        .catch(error => {
            res.status(500).send(error)
        })
    },

    forgotPassword: (req,res) => {
        return authService.forgotPassword(req.body.email)
        .then(() => {
            res.status(200).send();
        }).catch((err) => {
            res.status(401).send(err)
        })
    },

    resetPassword: (req,res) => {
        if (req.body.password != req.body.rePassword) {
            return res.status(401).send("passwords must be identical")
        }
        token = authService.validateToken(req.body.token)
        if(!token)
            return res.status(500).send("Invalid token");

        return authService.resetPassword(token.id, req.body.password)
        .then((response) => {
            res.json(response);
        }).catch(err => {
            console.log(err);
            res.status(500).send("failed to reset password  ")
        })
    },
    isUserExist: (req,res) => {
        return authService.isUserExist(req.body.email)
        .then(() => {
            res.status(200).send();
        }).catch((err) => {
            res.status(404).send(err)
        })
    }
} 