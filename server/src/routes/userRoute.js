const express = require('express');
const { verifyToken } = require('../middleware/authMiddleware');
const { authorizeRole } = require('../middleware/roleMiddleware');

const router = express.Router();

//user and admin can access this route
router.get("/user", verifyToken, authorizeRole("admin","user"), (req, res) => {
    res.json({msg: "this is for user"});
    //Any routes or functionalities for user as well as admin can be added Here
})

//admin can access this route
router.get("/admin",verifyToken,authorizeRole("admin"), (req, res) => {
    res.json({msg: "this is for admin"});
    //Any routes or functionalities for admin can be added Here
})

//Everone can access this route
router.get("/guest", (req, res) => {
    res.json({msg: "this is for guest"});
})

module.exports = router;