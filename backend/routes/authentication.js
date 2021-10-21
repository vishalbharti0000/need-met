var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');
const {logout,login,signup,gOauth,isSignedIn,isAuthenticated,isFreeLancer,isClient,changePassword,forgotPassword} = require('../controllers/authentication')


router.post('/auth/signup',
            body('email').isEmail().normalizeEmail().withMessage("Please enter a valid Email Id"),
            body('password').isLength({min: 8}).matches(
                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/,
                ).withMessage('must be at least 8 chars long,contains at least 1 uppercase, 1 lowercase and 1 special character'),signup);


router.post('/auth/login',
            body('email').isEmail(),
            body('password').isLength({min: 3}).withMessage("Password should at least be 3 characters long"), 
            login);

router.post('/google',
            body('email').isEmail(),
            body('password').isLength({min: 8}).matches(
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/,
            ).withMessage('must be at least 8 chars long,contains at least 1 uppercase, 1 lowercase and 1 special character'),gOauth);

router.get('/auth/logout', logout);
router.post('/auth/forgot_password', forgotPassword);

router.put('/auth/change_password',body('password').isLength({min: 8}).matches(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/,
).withMessage('must be at least 8 chars long,contains at least 1 uppercase, 1 lowercase and 1 special character'),changePassword);



module.exports = router