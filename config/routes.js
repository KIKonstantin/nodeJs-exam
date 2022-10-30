const authController = require("../controllers/authController");
const blogController = require("../controllers/blogController");
const createController = require("../controllers/createController");
const homeController = require("../controllers/homeController");
const profileController = require("../controllers/profileController");
const pageNotFoundController = require("../middlewares/404");

module.exports = (app) => {
    app.use('/', homeController);
    app.use('/auth', authController);
    app.use('/catalog', blogController);
    app.use('/create', createController);
    app.use('/profile', profileController);
    app.use(pageNotFoundController);

};