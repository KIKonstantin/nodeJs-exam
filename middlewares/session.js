const { verifyToken } = require("../services/userService");

module.exports = () => (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        try {
            req.user = verifyToken(token);
        } catch (error) {
            res.clearCookie('token');
            res.redirect('/auth/login');
            return;
        }
    }
    next();
};