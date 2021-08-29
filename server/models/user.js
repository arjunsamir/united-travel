const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');


// Create Schema
const schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is a required field.']
    },
    preferredName: String,
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is a required field'],
        lowercase: true,
        validate: [validator.isEmail, 'Please enter a valid email address.']
    },
    password: {
        type: String,
        minlength: 8,
        select: false
    },
    accountCreatedAt: {
        type: Date,
        default: Date.now(),
        select: false
    },
    passwordSet: Boolean,
    passwordChangedAt: Date,
    resetToken: String,
    tokenExpiration: Date,
    oAuth: [{
        provider: String,
        name: String,
        email: String,
        photo: String
    }],
    googleID: String,
    facebookID: String,
    stripeID: String,
    defaultPaymentMethod: String,
    role: {
        type: String,
        enum: ['admin', 'driver', 'user'],
        default: 'user'
    },
    active: {
        type: Boolean,
        default: true,
        select: false
    },
    photos: {
        type: [String],
        default: ['https://storage.googleapis.com/utravel-site-content/user-photos/utravel-default.png']
    },
    photo: {
        type: String,
        default: 'https://storage.googleapis.com/utravel-site-content/user-photos/utravel-default.png'
    },
    referralCode: String,
    referredBy: String,
    preferredLocale: {
        type: String,
        default: 'en',
        enum: ['en', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'zh']
    },
    credits: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Credit'
        }
    ],
    marketingOptIn: {
        type: Boolean,
        default: false
    }
});


schema.pre('save', async function(next) {

    // Filter Out Unmodified Passwords
    if (!this.isModified('password') || !this.password) return next();

    // Set Pasword Status
    this.passwordSet = !!this.password;

    // Encrypt Password
    this.password = await bcrypt.hash(this.password, 12);

    // Call Next Middleware in stack
    next();

});


schema.pre(/^find/, function(next) {

    this.find({ active: { $ne: false } });
    next();

});


schema.methods.checkPassword = async function(candidate, pass) {

    return await bcrypt.compare(candidate, pass);

}


schema.methods.changedPasswordAfter = function(jwtTimestamp) {

    if (!this.passwordChangedAt) return false;
    const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
    return jwtTimestamp < changedTimestamp;

};


schema.methods.createPasswordResetCode = function() {

    const token = crypto.randomBytes(6).toString('hex').substring(0, 6).replaceAll('0', 'x').toLowerCase();
    this.resetToken = token;
    this.tokenExpiration = Date.now() + 15 * 60 * 1000;
    return token;

}

schema.methods.createPasswordResetToken = function() {

    const token = crypto.randomBytes(32).toString('hex');
    this.resetToken = crypto.createHash('sha256').update(token).digest('hex');
    this.tokenExpiration = Date.now() + 15 * 60 * 1000;
    return token;

}



// Create And Export Model
const User = mongoose.model('User', schema);
module.exports = User;