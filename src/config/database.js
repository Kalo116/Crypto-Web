const mongoose = require('mongoose');

const connectionString = 'mongodb://localhost:27017/js-backend-exam';

exports.initializeDatabase = () =>{
    return mongoose.connect(connectionString);
}