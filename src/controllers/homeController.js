const router = require('express').Router();
const cryptoServices = require('../services/cryptoServices');
const {isAuth} = require('../middlewares/authMiddleware')

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/catalog', async (req, res) => {
    const cryptos = await cryptoServices.getAll().lean();
    res.render('catalog', { cryptos });
});


//Search doesnt work propertly :(
router.get('/search',isAuth, async (req, res) => {
    const cryptos = await cryptoServices.getAll().lean();
    res.render('search', { cryptos });
});

router.post('/search',isAuth, async (req, res) => {
    const cryptos = await cryptoServices.getAll().lean();
    const body = req.body;
    function filterByType(nameInput = '', method) {
        const filteredCryptoes = cryptos
            .filter(x => x.name.toLowerCase().includes(nameInput.toLowerCase()))
            .filter(x => x.paymentMethod == method);
        return filteredCryptoes;
    };
    const filtered = filterByType(body.name, body.paymentMethod);
    res.render('search', { filtered });
});


module.exports = router;