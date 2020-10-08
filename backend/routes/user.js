const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const isAuth = require('../middleware/is-auth');

router.get('/view_profile/:userId', isAuth, userController.getUserInfo)

module.exports = router;