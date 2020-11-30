const Vehicle = require('../models/vehicle');
const rest = require('../utils/restful');


exports.addVehicle = rest.createOne(Vehicle);
exports.getAllVehicles = rest.getAll(Vehicle);
exports.getVehicle = rest.getOne(Vehicle)
exports.updateVehicle = rest.updateOne(Vehicle);
exports.deleteVehicle = rest.deleteOne(Vehicle);