const pageNotFoundController = require("../middlewares/404");
const { getRecent } = require("../services/blogService");

const homeController = require("express").Router();

homeController.get("/", async(req, res) => {
    const blogs = await getRecent();
    res.render("home", {
        title: "Home Page",
        blogs,
        user: req.user,
    });
});

homeController.all(pageNotFoundController);

module.exports = homeController;