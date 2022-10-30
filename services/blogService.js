const Blog = require("../models/Blog");
const User = require("../models/User");

async function getById(id) {
    return Blog.findById(id).lean();
}
async function deleteById(id) {
    return Blog.findByIdAndDelete(id);
}
async function getRecent() {
    return Blog.find({}).sort({ createdAt: -1 }).limit(3).lean();
}
async function getAll() {
    return Blog.find({}).lean();
}

async function createBlog(blog) {
    return Blog.create(blog);
}
async function updateById(id, data) {
    const blog = await Blog.findById(id);
    blog.title = data.title;
    blog.blogImage = data.blogImage;
    blog.content = data.content;
    blog.category = data.category;

    return blog.save();
}
async function followPost(id, userId) {
    const blog = await Blog.findById(id);
    const user = await User.findById(userId).lean();

    blog.followList.push(userId);
    blog.followersEmail.push(user.email);
    blog.followListCount++;
    return blog.save();
}
module.exports = {
    getById,
    createBlog,
    getAll,
    getRecent,
    updateById,
    deleteById,
    followPost,
};