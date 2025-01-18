const router = require('express').Router();
const cryptoServices = require('../services/cryptoServices');
const { isAuth } = require('../middlewares/authMiddleware');
const { getErrorMessage } = require('../utils/errorHelpers');


router.get('/create', isAuth, (req, res) => {
    res.render('create');
});
router.post('/create', isAuth, async (req, res) => {
    try {
        const crypto = await cryptoServices.create({ ...req.body, owner: req.user._id });
        res.redirect('/catalog');
    } catch (error) {
        return res.render('create', { ...req.body, error: getErrorMessage(error) });
    }
});
router.get('/:cryptoId/details', async (req, res) => {
    const cryptoOffer = await cryptoServices.getOne(req.params.cryptoId).lean();

    const cryptoOfferDetailed = await cryptoServices.getOneDetailed(req.params.cryptoId);
    const isBought = cryptoOfferDetailed.buyCrypto.includes(req.user?._id);


    const isOwner = cryptoOffer.owner == req.user?._id;
    res.render('details', { cryptoOffer, isOwner, isBought });
});
router.get('/:editId/edit', isAuth, async (req, res) => {
    const cryptoOffer = await cryptoServices.getOne(req.params.editId).lean();
    if (cryptoOffer.owner != req.user._id) {
        return next({ message: 'You are not authorized', status: 401 });
    }
    res.render('edit', { ...cryptoOffer });
});
router.post('/:editId/edit', isAuth, async (req, res) => {
    const cryptoOffer = await cryptoServices.getOne(req.params.editId).lean();
    if (cryptoOffer.owner != req.user._id) {
        return next({ message: 'You are not authorized', status: 401 });
    };
    try {
        await cryptoServices.update(req.params.editId, req.body);
        res.redirect(`/crypto/${req.params.editId}/details`);
    } catch (error) {
        return res.render('edit', { ...req.body, error: getErrorMessage(error) });
    }
});
router.get('/:cryptoId/delete', isAuth, async (req, res) => {
    const cryptoOffer = await cryptoServices.getOne(req.params.cryptoId).lean();

    if (cryptoOffer.owner != req.user._id) {
        return next({ message: 'You are not authorized to delete!', status: 401 });
    };
    await cryptoServices.delete(cryptoOffer._id);
    res.redirect('/catalog');
});
router.get('/:cryptoId/buy', isAuth, async (req, res) => {
    const crypto = await cryptoServices.getOne(req.params.cryptoId);
    crypto.buyCrypto.push(req.user._id);
    await crypto.save();
    res.redirect(`/crypto/${req.params.cryptoId}/details`);
});

module.exports = router;