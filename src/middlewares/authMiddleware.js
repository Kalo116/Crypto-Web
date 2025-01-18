const { sessionName, secret } = require('../config/appConfig');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');


// const jwtVerify = promisify(jwt.verify);


exports.auth = async (req, res, next) => {
    const token = req.cookies[sessionName];

    if (token) {
        jwt.verify(token, secret, ((err, decodedToken) => {
            if (err) {
                res.clearCookie(sessionName);
                res.redirect('login');
            };

            req.user = decodedToken;
            res.locals.user = decodedToken;
            next()
        }));
    } else {
        next();
    }

};

exports.isAuth = (req, res, next) => {
    if (!req.user) {
        return res.redirect('/user/login');
    };
    next();
};

exports.isGuest = (req, res, next) => {
    if (req.user) {
        return res.redirect('/');
    };
    next();
};