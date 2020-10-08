const jwt = require('jsonwebtoken');
const JWT_SHA = 'somesuperlongsecretdontpassitorletanybodyknow';
module.exports = (req, res, next) => {
    // token is got in 'Authorization' header
    const authHeader = req.get('Authorization');
    if(!authHeader) {
       const err = new Error('User not authenticated');
       err.status = 401;
       throw err; 
    }
    const token = authHeader.split(' ')[1]; // Bearer token ["bearer", "token"]
    try {
        decodedToken = jwt.verify(token, JWT_SHA);
    } catch(err) {
        err.status = 500;
        throw err;
    }
    if(!decodedToken) {
        const err = new Error('User not authenticated');
       err.status = 401;
       throw err; 
    }
    req.userId = decodedToken._id;
    next();
}