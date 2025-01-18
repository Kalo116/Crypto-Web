const express = require('express');
const cookieParser = require('cookie-parser');
const router = require('./router');

const { initializeDatabase } = require('./config/database');
const { auth } = require('./middlewares/authMiddleware');
const { errorHandler } = require('./middlewares/errorHandlerMiddleware');
const app = express();

require('./config/handlebars')(app);
app.use('/static', express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(auth);
app.use(router);
app.use(errorHandler);

initializeDatabase()
    .then(() => {
        app.listen(3000, () => console.log('App is listening on port 3000'));
    })
    .catch((err) => {
        console.log('Cannot connect db: ', err);
    })