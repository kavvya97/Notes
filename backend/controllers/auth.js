const bcrypt = require('bcrypt');
const User = require('../models/user');
const mongoose = require('mongoose');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');


exports.signup = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            const error = new Error('Validation Failed. Please try again');
            error.status = 422;
            throw error;
        }
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        const hashedPw = await bcrypt.hash(password, 12);
        const user = await new User({
            username: username,
            email: email,
            password: hashedPw
        });
        const result =  await user.save();
        res.status(200).json({
            message: 'user created successfully',
            userId: result._id
        });
    } catch (err) {
        if(!err.status) {
            err.status = 500;
        }
        next(err)
    }
    
}   

exports.login = async (req, res, next ) => {
    const errors  = validationResult(req);
    if(!errors.isEmpty()) {
        const error = new Error('Validation Failed. Please try again');
        error.status = 422;
        throw error;
    }
    const email = req.body.email;
    const password = req.body.password;
    try {
        const user =  await User.findOne({email: email});
        if(!user) {
            const error = new Error('user not found');
            error.status = 401;
            next(error);
        }
        const result = await bcrypt.compare(password, user.password);
        if(!result) {
            const error = new Error('Password entered is wrong. please try again.');
            error.status = 401;
            next(error);
            throw error;
        }
        const token = jwt.sign({
            email: user.email,
            _id: user._id 
            }, 'somesuperlongsecretdontpassitorletanybodyknow', {
                expiresIn: '1h'
            });
        res.status(200).json({
            token: token,
            userId: user._id
        })
    } catch(err) {
        if(!err.status) {
            err.status = 500;
            next(err);
        }
    }
    
}