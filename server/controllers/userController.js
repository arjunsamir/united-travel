const catchAsync = require('../utils/catchAsync');
const send = require('../utils/sendResponse');
const rest = require('../utils/restful');
const User = require('../models/user');


exports.getMe = catchAsync(async (req, res, next) => {

});


exports.updateMe = catchAsync(async (req, res, next) => {
    
});


exports.updatePassword = catchAsync(async (req, res, next) => {
    
});


exports.deleteMe = catchAsync(async (req, res, next) => {
    
});


exports.createOne = rest.createOne(User);
exports.getOne = rest.getOne(User);
exports.getAll = rest.getAll(User);
exports.deleteOne = rest.deleteOne(User);
exports.updateOne = rest.updateOne(User);