// Import Vendor Components
import HelloWeek from '../../vendor/HelloWeek';
import axios from 'axios';


// Import App Components
import Map from './Map';
import AuthForm from './AuthForm';


// Import Data
import data from '../../data/sampleBooking';
import vehicles from '../../data/vehicles';


export default class BookingApp {

    constructor(props, container) {

        // Assign Sample Data
        this.data = { ...data };


        // Refrence Data For Booking
        this.refData = {
            pickup: {
                date: null,
                time: null
            },
            dropoff: {
                date: null,
                time: null
            }
        }


        // Assign App Data
        this.appData = {
            loaded: false,
            vehicles: []
        }


        this.elements = {
            container,
            forwardButton: $(container).children('#booking-forward'),
            backButton: $(container).children('#booking-back')
        }

        console.log(this);

    }

    load() {
        


    }


    init() {

        // Attach Event Listeners to Buttons

    }

    
    

}