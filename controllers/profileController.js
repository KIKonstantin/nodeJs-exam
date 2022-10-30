const { getAll } = require('../services/blogService');
const { userId } = require('../services/userService');

const profileController = require('express').Router();


profileController.get('/', async(req, res) => {
    const user = await userId(req.user._id);
    const blogs = await getAll();
    const uId = user._id;
    let createdBlogs = [];
    let followedBlogs = [];
    for (const b of blogs) {

        if (b.owner.toString() == uId) {
            createdBlogs.push(b)
        }
        for (const f of b.followList) {
            if (uId == f.toString()) {
                followedBlogs.push(f);
            }
        }
    }
    const createdBlogslength = createdBlogs.lenght > 0
    console.log(createdBlogslength)
    res.render('profile', {
        title: 'Profile page',
        user,
        followedBlogs,
        createdBlogslength,
        createdBlogs
    })
});

module.exports = profileController;