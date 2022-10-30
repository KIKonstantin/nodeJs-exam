const { Schema, model, Types } = require("mongoose");

const URL_PATTERN = /^https?:\/\/.+$/i;

const blogSchema = new Schema({
    title: {
        type: String,
        minLength: [5, "Blog title must be at least 5 characters long"],
        maxLength: [50, "Blog title must be at most 50 characters long"]
    },
    blogImage: {
        type: String,
        validate: {
            validator: (value) => URL_PATTERN.test(value),
            message: "Invalid URL",
        },
    },
    content: {
        type: String,
        minLength: [10, "Blog content must be at least 10 characters long"],
    },
    category: {
        type: String,
        minLength: [3, "Blog category must be at least 3 characters long"]
    },
    createdAt: {
        type: String,
        required: true,
        default: () => {
            return (new Date().toISOString().slice(0, 19).split('T').reverse().join(' '));
        }
    },
    followList: { type: [Types.ObjectId], ref: "User", default: [] },
    followersEmail: { type: Array, default: [] },
    followListCount: { type: Number, default: 0 },
    owner: { type: Types.ObjectId, ref: "User" }
});

blogSchema.index({})

const Blog = model("Blog", blogSchema);

module.exports = Blog;