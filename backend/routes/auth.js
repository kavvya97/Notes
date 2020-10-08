const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authController = require('../controllers/auth');
const User = require('../models/user');
router.put('/signup',
    [
        body('email')
        .isEmail()
        .withMessage('Please enter a valid E-mail')
        .custom((value, {req}) => {
            return User.findOne({email: value})
            .then(userDoc => {
                if(userDoc) {
                 return Promise.reject('E-Mail Address already exists');
                }
            })
        })
        .normalizeEmail(),
        body('password').trim().isLength({min: 7}),
        body('username').trim().not().isEmpty()
    ], 
    authController.signup);
router.put('/login', [
    body('email')
    .isEmail()
    .normalizeEmail(),
    body('password').trim().isLength({min: 5})
], authController.login);

module.exports = router;