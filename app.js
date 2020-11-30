// 1. IMPORT REQUIRED MODULES

//  Import Core Modules
const path = require('path');

// Node Modules
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const compression = require('compression');

// Error Handlers
const AppError = require('./server/utils/appError');
const globalErrorHandler = require('./server/utils/errorHandler');

// Routers
const viewRouter = require('./server/routes/viewRoutes');
const authRouter = require('./server/routes/authRoutes');
const userRouter = require('./server/routes/userRoutes');
const vehicleRouter = require('./server/routes/vehicleRoutes');
const bookingRouter = require('./server/routes/bookingRoutes');
const reviewRouter = require('./server/routes/reviewRoutes');




// 2. CREATE EXPRESS APPLICATION
const app = express();
app.enable('trust proxy');




// 3. CREATE PUBLIC FOLDER
app.use(express.static(path.join(__dirname, 'client/dist')))




// 3. IMPLEMENT SECURITY MIDDLEWARE
app.use(helmet());
app.use('/api', rateLimit({ max: 100, windowMs: 1000 * 60 * 60, message: 'Too many requests from thie IP, please try again in an hour'}));
//app.post('/webhooks/checkout', express.raw({ type: 'application/json' }), bookingController.webhookCheckout);
app.use(mongoSanitize());
app.use(xss());




// 4. BODY PARSING MIDDLEWARE
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());
app.use(compression());




// DEFINE ROUTE HANDLERS
app.use('/', viewRouter);
app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/api/vehicles', vehicleRouter);
app.use('/api/bookings', bookingRouter);
app.use('/api/reviews', reviewRouter);
app.all('*', (req, res, next) => next( new AppError(`Can't find ${req.originalUrl} on this server you bitch!`, 404) ));




// APPLY ERROR HANDLER
app.use(globalErrorHandler);




// EXPORT EXPRESS APPLICATION
module.exports = app;