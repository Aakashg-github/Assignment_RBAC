const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require("../model/userSchema");

const blacklist = new Set(); //for storing logged out token in this project

const register = async (req, res) => {
    try {
        const {email, password, role} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({email, password: hashedPassword, role});
        await newUser.save();
        res.status(201).json({msg: `user registered with email ${email}`});
    }catch(err) {
        res.status(401).json({msg: "Something went wrong while registering"});
    }

};
const login = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            res.status(400).json({msg : "wrong password"});
        }
        const token = jwt.sign(
            {id: user._id, role: user.role},
            process.env.SECRET_KEY,
            {expiresIn: "15m"}
        );
        res.status(200).json({ token });
    }
    if(!user) {
        res.status(401).json({msg: "User Not Found"});
    }
};

const logout = (req,res) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if(authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];

        if(!token) {
            res.status(401).json({ msg : "NO token, Already Logged out"});
        }

        blacklist.add(token); // Add token to blacklist
        res.json({ message: 'Logout successful' });
    }
    res.json({msg : "Already Logged Out"});
};

module.exports = {
    register,
    login,
    logout,
    blacklist,
}