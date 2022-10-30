function hasUser() {
    return (req, res, next) => {
        if (req.user) {
            res.locals.hasUser = true;
            next();
        } else {
            res.locals.hasUser = false;
            next();
        }
    };
};

function isOwner() {
    return (req, res, next) => {
        if (req.user && res.locals.blog.owner.toString() == req.user._id.toString()) {
            res.locals.isOwner = true;
            next();
        }
    }
}

function isGuest() {
    return (req, res, next) => {
        if (req.user) {
            // TODO check assignment for correct redirect
            res.redirect('/auth/login');
        } else {
            next();
        }
    };
};

module.exports = {
    hasUser,
    isGuest,
    isOwner
}