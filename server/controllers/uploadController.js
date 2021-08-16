// Import Node Mouduled and shit
const multer = require('multer');
const sharp = require('sharp');
const util = require('util');

const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const send = require('../utils/sendResponse');
const uniqid = require('uniqid');
const googleCloud = require('../utils/storage');
const bucket = googleCloud.bucket('utravel-site-content');


// Upload To Google Cloud Storage
const uploadToCloud = (file, directory) => new Promise((resolve, reject) => {
    
    const { name, buffer } = file;

    const filePath = directory ? `${directory}/${name}` : name;

    const blob = bucket.file(filePath);
    const blobStream = blob.createWriteStream({
        resumable: false
    });
    blobStream.on('finish', () => {
        const publicUrl = util.format(
            `https://storage.googleapis.com/${bucket.name}/${blob.name}`
            );
        resolve(publicUrl);
    })
    .on('error', () => reject('Unable to upload image, something went wrong'))
    .end(buffer);

})


// Create Multer Uploader
const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter(req, file, cb) {
        if (file.mimetype.startsWith('image')) cb(null, true);
        else cb(new AppError('Not an image! Please upload only images.', 400), false);
    }
});


// Multer Upload Middleware
exports.photo = upload.single('photo');


// Process Profile Photo
exports.processProfilePhoto = catchAsync(async (req, res, next) => {

    if (!req.file) return next();

    const name = `${req.body.name || 'user-photo'}-${uniqid.time()}.jpg`;

    const buffer = await sharp(req.file.buffer)
        .resize(500, 500)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toBuffer();

    const file = await uploadToCloud({ name, buffer }, 'user-photos');

    send(res, {
        status: 'success',
        file
    })

});


// Process Vehicle Photo
exports.processVehiclePhoto = catchAsync(async (req, res, next) => {

    if (!req.file) return next();

    const buffer = await sharp(req.file.buffer).png().toBuffer();
    const name = `vehicle-${uniqid.time()}.png`;
    const file = await uploadToCloud({ name, buffer }, 'vehicles');

    send(res, {
        status: 'success',
        file
    })
});