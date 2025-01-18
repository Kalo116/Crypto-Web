const mongoose = require('mongoose');

const imageValidation = function (image) {
    const imageValidationPath = /https?:\/\/(.*)/;
    return imageValidationPath.test(image);
};

const cryptoSchema = mongoose.Schema({
    name: {
        type: String,
        minLength: [2, 'Name should be more than 2 symbols!'],
        required: [true, 'Name is required!']
    },
    image: {
        type: String,
        validate: [imageValidation, 'The path of the picture doesnt work'],
        required: [true, 'Image is required!']
    },
    price: {
        type: Number,
        min: [0, 'Price should be positive number!'],
        required: [true, 'Price is required!']
    },
    description: {
        type: String,
        minLength: [10, 'Description should be at least 10 characters'],
        required: [true, 'Description is required!']
    },
    paymentMethod: {
        type: String,
        enum: ['crypto-wallet', 'credit-card', 'debit-card', 'paypal'],
        required: [true, 'Payment Method is required!']
    },
    buyCrypto: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});


const Crypto = mongoose.model('Crypto', cryptoSchema);

module.exports = Crypto;