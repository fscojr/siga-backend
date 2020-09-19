const express = require('express');
// const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');


const buscaRoutes = require('./routes/buscaRoutes');
const emailRoutes = require('./routes/emailRoutes');
const globalErrHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');
const app = express();
const compression = require('compression')

// Allow Cross-Origin requests
app.use(cors());

// Set security HTTP headers
app.use(helmet());

// Limit request from the same API
// const limiter = rateLimit({
//     max: 150,
//     windowMs: 60 * 60 * 1000,
//     message: 'Too Many Request from this IP, please try again in an hour'
// });
// app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({
    limit: '15kb'
}));

// Data sanitization against XSS(clean user input from malicious HTML code)
app.use(xss());

// Prevent parameter pollution
app.use(hpp());

app.use(compression())

// Routes
app.use('/api/v1/busca', buscaRoutes);
app.use('/api/v1/email', emailRoutes);

// handle undefined Routes
app.use('*', (req, res, next) => {
    const err = new AppError(404, 'fail', 'undefined route');
    next(err, req, res, next);
});

app.use(globalErrHandler);

module.exports = app;
