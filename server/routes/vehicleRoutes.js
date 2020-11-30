// Import Dependencies
const express = require('express');
const control = require('../controllers/vehicleController');


// Create Router
const router = express.Router();

router.route('/')
    .get(control.getAllVehicles)
    .post(control.addVehicle)
;

router.route('/:id')
    .get(control.getVehicle)
    .patch(control.updateVehicle)
    .delete(control.deleteVehicle)
;


module.exports = router;