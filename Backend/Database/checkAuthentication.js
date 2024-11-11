const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')//Hashing passwords

// Define the tokens object to manage session tokens (in-memory for now)
const tokens = {}

// Set up a token expiration storage (in minutes)
const TOKEN_EXPIRATION_TIME = 20


// Check Authentication in requests
const checkauth = (req, res, next) => {

    try {

        //const authHeader = req.header.authorization
        //if (!authHeader) {
        //    return res.status(401).json({ message: 'Authorization header is missing' });
        //}

        // Extract the token from the authorization header
        const token = req.headers.authorization && authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Token not provided' });
        }

        // Verify and decode token
        const decoded = jwt.verify(token, 'your_jwt_secret')
        const userId = decoded.id
        
        // Check if token exists in the in-memory storage and has not expired
        const tokenData = tokens[userId];
        if (!tokenData || tokenData.token !== token || Date.now() > tokenData.expiration) {
            return res.status(401).json({ message: 'Invalid or expired token' });
        }
        //if (!tokens[decoded.email] || tokens[decoded.email].token !== token) {
        //    return res.status(401).json({ message: 'Invalid or expired token' });
        //}
        
        // Allow the request to proceed if token is valid
        req.user = decoded;
        req.userId = userId;
        next();
    } 
    
    catch (error) {
        // Redirect to Login page
        console.error(error);
        
        return res.status(401).json({ message: 'Please login to access - invalid token' });
    }
};

// Function to store token with an expiration time
const storeToken = (userId, token, duration = 20 * 60 * 1000) => {
    //const expiration = new Date().getTime() + TOKEN_EXPIRATION_TIME * 60 * 1000; // Calculate expiration in milliseconds

    tokens[email] = {
        token,
        expiresAt: /*expiration*/Date.now() + duration,
    };
};

module.exports = {checkauth, storeToken}
