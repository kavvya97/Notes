const Notes = require('../models/notes');
const mongoose = require('mongoose');
const User = require('../models/user');

exports.getUserInfo = async (req, res, next) => {
    const currentUser = req.userId;
    const userId = req.params.userId;
    if(currentUser.toString() !== userId.toString()) {
        const error = new Error('user not authorized');
        error.status = 404;
        next(error);
    }
    try {
        const user = await User.findById(userId).select(['-password']);
        if(!user) {
            const error = new Error('user information not available!. please try again');
            error.status = 404;
            next(error);
            throw error
        }
        res.status(200).json({
            message: 'Fetched user data',
            user: user,
            userId: req.userId
        });
    } catch(err) {
        if(!err.status) {
            err.status = 500;
            next(err);
        }
    }

}