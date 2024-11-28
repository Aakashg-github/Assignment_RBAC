const jwt = require('jsonwebtoken');
const {blacklist} = require('../controller/authController')

const verifyToken = (req,res,next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if(authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];

        if(!token) {
            res.status(401).json({ msg : "NO token, Access denied"});
        }
        if (blacklist.has(token)) {
            res.status(401).json({ message: 'Token is blacklisted. Please log in again.' });
        }

        try {
            const decode = jwt.verify(token, process.env.SECRET_KEY);
            req.user = decode;
            //console.log(req.user);
            next();
        }catch(err) {
            console.log(err);
            res.status(400).json({ msg: "Invalid token"});
        }
    }
}

module.exports = {
    verifyToken,
}