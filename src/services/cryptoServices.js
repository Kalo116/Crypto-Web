const Crypto = require('../models/Crypto');

exports.create = (cryptoData) => Crypto.create(cryptoData);
exports.getAll = () => Crypto.find();
exports.getOne = (cryptoId) => Crypto.findById(cryptoId);
exports.getOneDetailed = (cryptoId) => Crypto.findById(cryptoId).populate('owner');
exports.update = (cryptoId, data) => Crypto.findByIdAndUpdate(cryptoId, data, { runValidators: true });
exports.delete = (cryptoId) => Crypto.findByIdAndDelete(cryptoId)