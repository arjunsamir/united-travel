const Settings = require('../models/settings');
const catchAsync = require('../utils/catchAsync');
const rest = require('../utils/restful');
const send = require('../utils/sendResponse');



// Get All Settings
exports.getSettingsHistory = rest.getAll(Settings);

// Get Current Settings
exports.getSettings = catchAsync(async (req, res, next) => {

    // Query For Active Settings
    const settings = await Settings.findOne({ active: true });

    send(res, {
        status: 'success',
        settings
    });

});

exports.createSettings = catchAsync(async (req, res, next) => {

    // Update Settings To Be Inactive
    await Settings.updateMany({ active: true }, { active: false });

    // Query For Active Settings
    const settings = await Settings.create(req.body);

    // Send Respons
    send(res, {
        status: 'success',
        settings
    });

});

// Update/Create Settings
exports.updateSettings = catchAsync(async (req, res, next) => {

    // Update Settings Data
    const settings = await Settings.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    });

    // Send Respons
    send(res, {
        status: 'success',
        settings
    });

});