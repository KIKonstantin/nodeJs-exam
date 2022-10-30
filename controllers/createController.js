const pageNotFoundController = require('../middlewares/404');
const { createBlog } = require('../services/blogService');
const { parseError } = require('../util/parser');

const createController = require('express').Router();

createController.get('/', (req, res) => {
    res.render('create', {
        title: 'Create Page',
        user: req.user
    });
});
createController.post('/', async(req, res) => {
    const blog = {
        title: req.body.title,
        blogImage: req.body.blogImage,
        content: req.body.content,
        category: req.body.category,
        owner: req.user._id
    };

    try {

        await createBlog(blog);
        res.redirect("/catalog");

    } catch (error) {
        res.render("create", {
            title: "Create Blog",
            errors: parseError(error),
            blog,
        });
    }
});


createController.all(pageNotFoundController);


module.exports = createController;