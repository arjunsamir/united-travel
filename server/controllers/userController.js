const catchAsync = require('../utils/catchAsync');
const send = require('../utils/sendResponse');
const rest = require('../utils/restful');
const User = require('../models/user');


exports.getMe = catchAsync(async (req, res, next) => {

    send(res, {
        user: req.user
    })

});


exports.updateMe = catchAsync(async (req, res, next) => {

    const data = { ...req.body };

    if (data.password) delete data.password;

    if (!req.userId) return send(res, {
        status: "FAIL"
    });

    const user = await User.findByIdAndUpdate(req.userId, data, {
        new: true,
        runValidators: true
    });
    
    send(res, {
        status: "SUCCESS",
        user
    })
    
    
});

exports.getUserByCode = catchAsync(async (req, res, next) => {
    const code = req.params.code;

    const user = await User.findOne({ referralCode: code });

    if (!user) send(res, {
        user: false
    });

    else send(res, {
        user: {
            name: user.preferredName,
            photo: user.photo,
            code
        }
    });

});


exports.createOne = rest.createOne(User);
exports.getOne = rest.getOne(User);
exports.getAll = rest.getAll(User);
exports.deleteOne = rest.deleteOne(User);
exports.updateOne = rest.updateOne(User);