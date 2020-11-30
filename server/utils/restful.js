const catchAsync = require('./catchAsync');
const send = require('./sendResponse');
const AppError = require('./appError');
const APIFeatures = require('./apiFeatures');


exports.deleteOne = Model => catchAsync(async (req, res, next) => {

    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) return next(new AppError('No document found with that ID', 404));

    send(res, {
        status: 'success',
        data: null
    }, 204);

});


exports.updateOne = Model => catchAsync( async ( req, res, next ) => {

    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!doc) return next(new AppError('No document found with that ID', 404));


    send(res, {
        status: 'success',
        data: { data: doc }
    });
    
});


exports.createOne = Model => catchAsync(async ( req, res, next ) => {

    const doc = await Model.create(req.body);


        send(res, {
            status: 'success',
            data: { data: doc }
        }, 201);

});


exports.getOne = (Model, popOptions) => catchAsync(async ( req, res, next ) => {

    let query = Model.findById(req.params.id);

    if (popOptions) query = query.populate(popOptions);

    const doc = await query;

    if (!doc) return next(new AppError('No document found with that ID', 404));


    send(res, {
        status: 'success',
        data: { data: doc }
    });

});


exports.getAll = Model => catchAsync( async ( req, res, next ) => {

    // To allow for nested GET reviews on tour (hackish)
    let filter = {};
    if (req.params.tourId) filter.tour = req.params.tourId;


    const features = new APIFeatures(Model.find(filter), req.query)
        .filter()
        .sort()
        .limit()
        .paginate()
    ;


    // Await Results
    //const docs = await features.query.explain();
    const docs = await features.query;



    send(res, {
        status: 'success',
        results: docs.length,
        data: { data: docs }
    });

});
