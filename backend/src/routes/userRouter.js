const express = require("express");
const { userController } = require("../controller");
const userIdentifier = require("../middleware/userIdentification.middleware");
const validate = require("../middleware/validate");
const { userPassword, userDetails, userIdValidation } = require("../validation/userData.validation");
const router = express.Router();
const upload = require("../utils/fileUpload")

router.use('/uploads', express.static('uploads'));
router.post('/verify', [validate(userPassword), userIdentifier],userController.handlePassword);
router.post('/adduserdetail',userIdentifier,upload.single("image"),userController.handleUserDetail);
router.get('/detail', [validate(userIdValidation), userIdentifier],userController.getUserDetail);
module.exports = router;
