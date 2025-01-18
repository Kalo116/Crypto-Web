const router = require('express').Router();
const { sessionName } = require('../config/appConfig');
const authService = require('../services/authServices');
const { isAuth, isGuest } = require('../middlewares/authMiddleware');
const { getErrorMessage } = require('../utils/errorHelpers')


router.get('/login', isGuest, (req, res) => {
    res.render('login');
});

router.post('/login', isGuest, async (req, res) => {
    const { email, password } = req.body;
    try {

        const user = await authService.login(email, password);
        const token = await authService.createToken(user);

        res.cookie(sessionName, token, { httpOnly: true });
        res.redirect('/');
    } catch (error) {
        return res.render('login', { error: getErrorMessage(error) })
    }
});

router.get('/register', isGuest, (req, res) => {
    res.render('register');
});

router.post('/register', isGuest, async (req, res) => {
    const { username, email, password, repeatPassword } = req.body;

    if (password !== repeatPassword) {
        return res.render('register', { error: 'Password missmatch!' })
    };

    try {
        const createdUser = await authService.register({ username, email, password });
        const token = await authService.createToken(createdUser);
        res.cookie(sessionName, token, { httpOnly: true });
        res.redirect('/');
    } catch (error) {
        //Add mongoose error mapper
        return res.render('register', { ...req.body, error: getErrorMessage(error) });
    };

});
router.get('/logout', isAuth, (req, res) => {
    res.clearCookie(sessionName);
    res.redirect('/');
});

module.exports = router;