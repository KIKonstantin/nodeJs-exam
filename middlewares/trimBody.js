module.exports = (...excluded) => (req, res, next) => {
    if (req.body) {
        for (let key in req.body) {
            if (excluded.includes(key) == false) {
                req.body[key] = req.body[key].trim();
            }
        }
    }
    next();
};