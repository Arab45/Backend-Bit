const express = require("express");
const router = express.Router();
const { signUp, fetchAllUser, fetchSingleUser } = require("../controller/user-controller");
const { validateSignUp, validation } = require('../middleware/validator');
const { sendUserEmail, userSessionEmail, userResetPasswordEmail, userEmailPasswordSuccess, userTokenEmail } = require("../../service/emailTemp");
const { userExistence } = require("../middleware/user");
const { loginProcess, loginIn, forgetPasswordToken, resetPassword } = require("../controller/userAuth-controller");

router.post("/sign-up", validateSignUp, validation, userExistence, signUp, sendUserEmail);
router.get('/allUser', fetchAllUser);
router.get('/singleUser/:id', fetchSingleUser);
router.post('/signIn', loginProcess, loginIn, userSessionEmail);
// router.get('/verifyLogin', verifyLoginUserToken, userSessionEmail);
// router.get('/logout', logOut);
router.post('/forgetPassword', forgetPasswordToken, userResetPasswordEmail);
router.post('/reset-password/:token', resetPassword, userEmailPasswordSuccess);


module.exports = router;