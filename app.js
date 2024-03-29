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
const cors = require('cors');

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
const dataRouter = require('./server/routes/dataRoutes');
const copyRouter = require('./server/routes/copyRoutes');
const uploadRouter = require('./server/routes/uploadRoutes');
const adminRouter = require('./server/routes/adminRoutes');


// 2. CREATE EXPRESS APPLICATION
const app = express();
app.use(cors())
app.enable('trust proxy');




// 3. CREATE PUBLIC FOLDER
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'client/views/static'));
app.use(express.static(path.join(__dirname, 'client/public')));



// 3. IMPLEMENT SECURITY MIDDLEWARE
app.use(helmet());
if (process.env.NODE_ENV === 'production') app.use('/api', rateLimit({ max: 100, windowMs: 1000 * 60 * 60, message: 'Too many requests from thie IP, please try again in an hour'}));
//app.post('/webhooks/checkout', express.raw({ type: 'application/json' }), bookingController.webhookCheckout);
app.use(mongoSanitize());
app.use(xss());




// 4. BODY PARSING MIDDLEWARE
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());
app.use(compression());




// DEFINE ROUTE HANDLERS
app.use('/', viewRouter());
app.use('/es', viewRouter('es'));
app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/api/vehicles', vehicleRouter);
app.use('/api/booking', bookingRouter);
app.use('/api/reviews', reviewRouter);
app.use('/api/data', dataRouter);
app.use('/api/copy', copyRouter);
app.use('/api/upload', uploadRouter);
app.use('/admin', adminRouter);
app.all('*', (req, res, next) => res.redirect('/'));




// APPLY ERROR HANDLER
app.use(globalErrorHandler);




// EXPORT EXPRESS APPLICATION
module.exports = app;