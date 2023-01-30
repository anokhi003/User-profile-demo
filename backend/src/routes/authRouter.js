const express = require("express");
const { authController } = require("../controller");
const validate = require("../middleware/validate");
const { loginValidation ,resetPassword } = require("../validation/auth.validation");
const router = express.Router();


router.post('/signup',authController.sendEmail)
router.post('/login',validate(loginValidation),authController.login);
router.get('/resetPassword/:email', validate(resetPassword),authController.handleResetPassword)
module.exports = router;
