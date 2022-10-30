const { Schema, model } = require("mongoose");

// TODO add User properties and validation according to assignment
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        minLength: [10, "The email should be at least 10 characters long"],
        match: [
            /^[a-zA-Z0-9]+@\w+.\w{2,4}$/i,
            "Not valid email",
        ],
    },
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: [2, "The username should be at least 2 characters long"],
    },
    hashedPassword: {
        type: String,
        required: true,
        minLength: [4, "The password should be at least 4 characters long"],
    },
});

userSchema.index({ email: -1 }, {
    collation: {
        locale: "en",
        strength: 2,
    },
});

const User = model("User", userSchema);

module.exports = User;