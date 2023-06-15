const express = require('express');
const dotenv = require('dotenv').config({path: '.env-local'});
const cors = require('cors');

const PORT = process.env.PORT || '3000';

const app = express();

/**
 * Middleware
 */
app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

/**
 * Routes
 */
app.get('/', (request, response) => {
    response.status(200).send("Please visit /user/:id (where :id is replaced with your name)");
});

const userRouter = require('./routes/user');
const loginRouter = require('./routes/login');
app.use('/user', userRouter);
app.use('/login', loginRouter);

/** Start listening */
app.listen(PORT, () => {
    console.log(`Listening for requests on port ${PORT}`)
});