const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');
const contactRouter = require('./routes/contact');
const userRouter = require('./routes/user');
const passport = require('passport');
const passportconfig = require('./libs/passport/passport');
const cors = require('cors');



const app = express();
dotenv.config();

app.use(cors());
app.use(bodyParser.json({
    limit: "30mb",
    extended: true
}));
app.use(bodyParser.urlencoded({
    limit: '30mb',
    extended: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/contact', contactRouter);
app.use('/user', userRouter);



module.exports = app;