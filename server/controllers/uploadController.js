// Import Node Mouduled and shit
const multer = require('multer');
const sharp = require('sharp');

const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const filterObj = require('../utils/filterObjects');
const send = require('../utils/sendResponse');
const uniqid = require('uniqid');


// Create Multer File Filter
const multerFilter = (req, file, cb) => {

    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    }

    else {
        cb(new AppError('Not an image! Please upload only images.', 400), false);
    }

}

// Create Multer Uploaders
const uploaders = {
    userUpload: multer({
        storage: multer.memoryStorage(),
        fileFilter: multerFilter
    }),
    vehicleUpload: multer({
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, 'client/public/img/vehicles');
            },
            filename: (req, file, cb) => {
                const ext = file.mimetype.split('/')[1];
                req.body.fileName = `vehicle-${uniqid()}.${ext}`
                cb(null, req.body.fileName)
            }
        }),
        fileFilter: multerFilter
    })
};

// Upload Photo
exports.userPhoto = uploaders.userUpload.single('photo');

// Resize Photo
exports.resize = catchAsync(async (req, res, next) => {

    if (!req.file) return next();

    const file = `/img/profile-photos/${uniqid()}.jpg`;

    await sharp(req.file.buffer)
        .resize(500, 500)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`client/public${file}`)
    ;

    send(res, {
        status: 'success',
        file
    })

});


exports.vehiclePhoto = uploaders.vehicleUpload.single('photo');


exports.completeVehicleUpload = (req, res, next) => {
    send(res, {
        status: 'success',
        file: req.body.fileName
    })
}