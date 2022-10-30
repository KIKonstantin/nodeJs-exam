const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = "1loimcxepnc87lkaery";

async function register(username, email, password) {

    const existingEmail = await User.findOne({ email }).collation({ locale: 'en', strength: 2 });
    const existingUsername = await User.findOne({ username }).collation({ locale: 'en', strength: 2 });

    if (existingEmail) {
        throw new Error('Email is taken');
    }
    if (existingUsername) {
        throw new Error('Username is taken');
    }

    const hashedPassword = await bcrypt.hash(password, 7);

    const user = await User.create({
        username,
        email,
        hashedPassword
    });

    return createSession(user);
};


async function login(email, password) {
    const user = await User.findOne({ email }).collation({ locale: 'en', strength: 2 });
    if (!user) {
        throw new Error('Incorrect email or password');
    }
    const hasMatch = await bcrypt.compare(password, user.hashedPassword);
    if (!hasMatch) {
        throw new Error('Incorrect email or password');
    }
    return createSession(user);
};

async function logout() {}

function createSession({ _id, email }) {
    const payload = {
        _id,
        email
    };

    return jwt.sign(payload, JWT_SECRET);
};

function verifyToken(token) {
    return jwt.verify(token, JWT_SECRET);
};
async function userId(id) {
    return User.findById(id).lean();
}



module.exports = {
    register,
    login,
    verifyToken,
    userId
};