const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (request, response,  next) => {
    try {
        // Get the token from the header
        const token = request.header('Authorization').replace('Bearer ', '');
        
        // Verify that token is valid
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // find user with correct auth token
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

        if (!user) {
            throw new Error();
        }

        request.token = token;
        request.user = user;

        next();
    } catch (error) {
        response.status(401).send({ error: 'Please authenticate'});
    }
} 

module.exports = auth;