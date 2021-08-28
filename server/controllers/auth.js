const { promisify } = require('util');

const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const uniqid = require('uniqid');
const capitalize = require('js-capitalize');

const User = require('../models/user');
const AppError = require('../utils/appError');
const sendEmail = require('../utils/sendEmail');
const catchAsync = require('./../utils/catchAsync');
const credits = require('./creditController');
const send = require('../utils/sendResponse');

const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_OAUTH_CLIENT_ID);


const sendToken = (user, status, req, res) => {

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRY
    });

    res.cookie('jwt', token, {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRY * 24 * 60 * 6000),
        secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
        httpOnly: true
    });

    user.password = undefined;

    send(res, {
        status: 'success',
        token,
        data: { user }
    }, status);

}


const createAccount = async body => {

    const data = { ...body };
    if (data.role) delete data.role;
    data.referralCode = encodeURIComponent(`${data.name.replace(/\s+/g, '-').toLowerCase()}-${uniqid.time()}`);

    // Transform data
    data.email = data.email.toLowerCase();
    data.name = capitalize.words(data.name);
    data.passwordSet = !!data.password;
    if (!data.preferredName) data.preferredName = data.name.split(" ")[0];
    if (data.photo) data.photos = [data.photo];
    if (data.referredBy) data.credits = await credits.issue(data.referredBy, data.name);
    
    const user = await User.create(data);

    // Send Welcome Email
    sendEmail({
        to: user.email,
        template: 'welcome',
        locale: user.preferredLocale || 'en',
        data: {
            name: user.preferredName
        }
    });

    console.log('email should have sent');

    return user;

}


const decodeJWT = async (token) => {

    if (!token || token === 'logged-out') return null;
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    return decoded;
}


const findUserByJWT = async (token) => {

    // if (!token || token === 'logged-out') return null;

    // const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const decoded = await decodeJWT(token);

    if (!decoded) return null;

    const user = await User.findById(decoded.id);

    if (!user || user.changedPasswordAfter(decoded.iat)) return null;

    return user;
}


exports.createAccount = catchAsync(async (req, res, next) => {

    if (!req.body.password) return next(new AppError('The password is a required field', 401));
    
    let user = await User.findOne({ email: req.body.email });

    if (user) return send(res, {
        status: 'fail',
        message: 'An account with this email address already exists.'
    });

    user = await createAccount(req.body);
    sendToken(user, 201, req, res);

});


exports.continueWithGoogle = catchAsync(async (req, res, next) => {

    console.log('GOOGLE REQUEST RECIEVED');


    const ticket = await client.verifyIdToken({
        idToken: req.body.token,
        audience: process.env.GOOGLE_OAUTH_CLIENT_ID
    });

    const payload = ticket.getPayload();

    // Link Account With Social Media Login if Not Already Linked
    let user = await User.findOne({ $or: [{ email: payload.email }, { googleID: payload.sub }] });

    const oauthObj = {
        provider: 'google',
        name: payload.name,
        email: payload.email,
        photo: payload.picture
    };

    const data = {
        name: payload.name,
        preferredName: payload.given_name,
        email: payload.email,
        photo: payload.picture,
        oAuth: [oauthObj],
        googleID: payload.sub,
        preferredLocale: req.body.preferredLocale
    };

    // Add Affiliate Link
    if (req.body.referredBy) data.referredBy = req.body.referredBy;

    // If User Does Not Exist Then Create One
    if (!user) user = await createAccount(data);

    // If Account Exists & is not linked to google then add Google OAUTH
    if (!user.googleID) {
        user.googleID = payload.sub;
        user.oAuth.push(oauthObj);
        user.photos.push(data.photo);
        if (!user.photo || user.photo.endsWith('utravel-default.png')) user.photo = data.photo;
        await user.save();
    }

    // Send JWT To Client
    sendToken(user, 200, req, res);


});


exports.continueWithFacebook = catchAsync(async (req, res, next) => {

    console.log('FACEBOOK LOGIN REQUEST RECIEVED');

    let user = await User.findOne({ $or: [{ email: req.body.email }, { facebookID: req.body.facebookID }] });

    const oauthObj = {
        provider: 'facebook',
        name: req.body.name,
        email: req.body.email,
        photo: req.body.photo
    };

    const data = {
        name: req.body.name,
        preferredName: req.body.preferredName,
        email: req.body.email,
        photo: req.body.photo,
        oAuth: [oauthObj],
        facebookID: req.body.facebookID,
        preferredLocale: req.body.preferredLocale
    };

    if (req.body.referredBy) data.referredBy = req.body.referredBy;

    if (!user) user = await createAccount(data);

    console.log('dont need to create an account');


     // If Account Exists & is not linked to facebook then add facebook OAUTH
     if (!user.facebookID) {
        user.facebookID = data.facebookID;
        user.oAuth.push(oauthObj);
        user.photos.push(data.photo);
        if (!user.photo || user.photo.endsWith('utravel-default.png')) user.photo = data.photo;
        await user.save();
    }

    // Send JWT To Client
    sendToken(user, 200, req, res);

});


exports.login = catchAsync(async (req, res, next) => {

    const { email, password } = req.body;
    if (!email || !password) return send(res, {
        status: 'fail',
        message: 'Please specify both an email and a password'
    });

    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.checkPassword(password, user.password))) return send(res, {
        status: 'fail',
        message: 'The email address or password is incorect.'
    });

    sendToken(user, 200, req, res);

});


exports.checkEmail = catchAsync(async (req, res, next) => {

    const { email } = req.body;
    let exists = false;
    let loginAllowed = true;

    if (email) {
        const user = await User.findOne({ email }).select('+password');
        if (user) exists = true;
        if (user && !user.password) loginAllowed = false;
    }

    send(res, {
        status: 'success',
        exists,
        loginAllowed
    });

});


exports.logout = (req, res) => {

    res.cookie('jwt', 'logged-out', {
        expires: new Date(Date.now() + 10000),
        httpOnly: true
    });

    send(res, { status: 'success' });

};


exports.forgotPassword = catchAsync(async (req, res, next) => {

    // Get Current User
    const user = await User.findOne({ email: req.body.email });

    // Return Error If User Does Not Exist
    if (!user) return send(res, {
        status: 'fail',
        message: 'There is no account associated with this email address.'
    });

    // Create Reset Code
    const token = user.createPasswordResetCode();
    await user.save({ validateBeforeSave: false });

    // Send Email To User
    sendEmail({
        to: user.email,
        template: 'reset',
        locale: user.preferredLocale || 'en',
        data: {
            name: user.preferredName,
            code: token
        }
    })

    // Send Reset Code
    send(res, {
        status: 'success',
        token
    });

});


exports.resetPassword = catchAsync(async (req, res, next) => {

    // Destructure Params
    const { password, token } = req.body;

    // Decrtypt Token
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    // Find User
    const user = await User.findOne({
        resetToken: hashedToken,
        tokenExpiration: { $gt: Date.now() }
    });

    // Return Error
    if (!user) send(res, {
        status: 'fail',
        message: 'The token is invalid or has expired. Please Request a new token.'
    });

    // Unset Token
    user.password = password;
    user.resetToken = undefined;
    user.tokenExpiration = undefined;

    // Save User
    await user.save();

    // Send new JWT
    sendToken(user, 200, req, res);

});


exports.validateResetCode = catchAsync(async (req, res, next) => {

    // Destructure Params
    const { email, code } = req.body;

    // Find User
    const user = await User.findOne({
        email,
        resetToken: code.toLowerCase(),
        tokenExpiration: { $gt: Date.now() }
    });

    // Return Error
    if (!user) return send(res, {
        status: 'fail',
    });

    // Reset Token Properties
    user.resetToken = undefined;
    user.tokenExpiration = undefined;

    // Generate New Token For Browser
    const token = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    // Send Token
    return send(res, {
        status: 'success',
        token
    });

});


exports.protect = catchAsync(async (req, res, next) => {

    const header = req.headers.authorization;
    let token;

    if (header && header.startsWith('Bearer')) token = header.split(' ')[1];
    else if (req.cookies.jwt) token = req.cookies.jwt;
    else return next(new AppError('You are not logged in. Please log in to access this route', 401));

    const user = await findUserByJWT(token);

    // const data = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    // const user = await User.findById(data.id);

    // if (!user) return next(new AppError('This user does not exist', 401));
    // if (user.changedPasswordAfter(data.iat)) return next(new AppError('The password on this account was changed. Please log in again'));

    req.user = user;
    // //res.locals.user = user; // For PUG templates

    next();

});


exports.getUserIdFromJWT = catchAsync(async (req, res, next) => {

    const decoded = await decodeJWT(req.cookies.jwt);

    if (!decoded) return next();

    req.userId = decoded.id;

    next();

})


exports.screen = catchAsync(async (req, res, next) => {

    const user = await findUserByJWT(req.cookies.jwt);

    if (user) {
        req.user = user;
        res.locals.user = user;
    }

    next();

});


exports.restrictTo = (...roles) => {
    
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) return next(new AppError('You do not have permission to perform this action', 403));
        next();
    }
    
}


exports.isLoggedIn = (req, res, next) => {

    if (req.user) res.redirect('/');

    else next();

};


// Redirect Requests
exports.redirect = (target, status = "logged-out") => (req, res, next) => {

    if (status === "logged-in") {
        if (req.user) res.redirect(target);
        else next();
    }

    else {
        if (!req.user) res.redirect(target);
        else next();
    }


}


exports.validateSession = catchAsync(async (req, res, next) => {

    const user = await findUserByJWT(req.cookies.jwt);

    send(res, {
        status: 'success',
        user
    });

});