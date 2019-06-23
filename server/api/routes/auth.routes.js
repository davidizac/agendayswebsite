const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
let middlewares = require('../middlewares/middlewares');

router.post("/login", middlewares.login, authController.login);
router.post("/signup",authController.signup);
router.post('/forgot-password',authController.forgotPassword);
router.post('/reset-password',authController.resetPassword);
router.post("/isUserExist", authController.isUserExist);

module.exports = router;