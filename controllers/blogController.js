const pageNotFoundController = require("../middlewares/404");
const { hasUser, isOwner } = require("../middlewares/guards");
const {
    getAll,
    getById,
    updateById,
    deleteById,
    followPost,
} = require("../services/blogService");
const { userId } = require("../services/userService");
const { parseError } = require("../util/parser");

const blogController = require("express").Router();

blogController.get("/", async(req, res) => {
    const blogs = await getAll();

    res.render("catalog", {
        title: "Blog Page",
        blogs,
        user: req.user,
    });
});

blogController.get("/:id", hasUser(), async(req, res) => {
    const blog = await getById(req.params.id);
    const id = req.params.id;
    const blogOwner = await userId(blog.owner);
    let isUser = res.locals.hasUser;
    blog.followers = blog.followListCount > 0;
    if (isUser) {
        if (blog.followers) {
            blog.follower = blog.followList.map(u => u.toString()).includes(req.user._id.toString());
        }
        blog.isOwner = blog.owner.toString() == req.user._id.toString();
        res.render("details", {
            title: blog.title,
            id,
            isUser,
            user: req.user,
            blog,
        });
    } else {
        res.render("details", {
            title: blog.title,
            isUser,
            blog,
        });
    }
});

blogController.get("/:id/delete", async(req, res) => {
    await deleteById(req.params.id);
    return res.redirect("/catalog");
});

blogController.get("/:id/edit", async(req, res) => {
    const id = req.params.id;
    const blog = await getById(id);
    res.render("edit", {
        title: "Edit Blog",
        id,
        blog,
    });
});

blogController.get('/:id/follow', async(req, res) => {
    const id = req.params.id;
    const blog = await getById(id);
    if (blog.owner.toString() != req.user._id.toString() && blog.followList.map(x => x.toString()).includes(req.user._id.toString()) == false) {
        await followPost(id, req.user._id);
    }
    res.redirect(`/catalog/${req.params.id}`);
})

blogController.post("/:id/edit", async(req, res) => {
    const id = req.params.id;
    const blog = await getById(id);
    try {
        await updateById(id, req.body);
        res.redirect(`/catalog/${id}`);

    } catch (error) {
        res.render("edit", {
            title: "Edit Blog",
            errors: parseError(error),
            id,
            blog: req.body,
        });
    }
});


blogController.all(pageNotFoundController);


module.exports = blogController;