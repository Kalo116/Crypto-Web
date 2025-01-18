const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/appConfig');
const bcrypt = require('bcrypt');


exports.register = async ({ username, email, password }) => {
    let createdUser = User.create({
        username,
        email,
        password
    });

    return createdUser;
};

exports.login = async (email, password) => {
    const user = await User.findOne({ email });
    if (email == '' || password == '') {
        throw {
            message: 'Email and password required!'
        };
    }
    if (!user) {
        throw {
            message: 'Cannot find username or password'
        };
    };
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw {
            message: 'Invalid username or password'
        };
    };

    return user;
};

exports.createToken = (user) => {
    const payload = { _id: user._id, username: user.username, email: user.email };
    const options = { expiresIn: '2d' };

    let tokenPromise = new Promise((resolve, reject) => {
        jwt.sign(payload, secret, options, (err, token) => {
            if (err) {
                return reject(err);
            };
            resolve(token);
        });
    });

    return tokenPromise;
};