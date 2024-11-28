const authorizeRole = (...allowedRoles) => {
    return (req,res,next) => {
        if(!allowedRoles.includes(req.user.role)) {
            res.status(403).json({msg : "Access Denied"});
        }
        next();
    };
};

module.exports = {
    authorizeRole,
}