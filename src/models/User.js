const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { saltRounds } = require('../config/appConfig');


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        minLength: [5, 'Username should be longer than 5 symbols'],
        required: [true, 'Username required!']
    },
    email: {
        type: String,
        minLength: [10, 'Email should be longer than 10 symbols'],
        required: [true, 'Email required!']
    },
    password: {
        type: String,
        minLength: [4, 'Password should be longer than 5 symbols'],
        required: [true, 'Password required!']
    },
});

userSchema.pre('save', function (next) {
    bcrypt.hash(this.password, saltRounds)
        .then(hashedPassword => {
            this.password = hashedPassword;
            next();
        });
});

const User = mongoose.model('User', userSchema);

module.exports = User;
