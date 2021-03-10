// Import Vendor Components
import HelloWeek from '../../vendor/HelloWeek';
import axios from 'axios';


// Import App Components
import Map from './Map';
import AuthForm from './AuthForm';
import steps from './Step';


// Import Data
import data from '../../data/sampleBooking';
import vehicles from '../../data/vehicles';


// Define Steps
const registeredSteps = ['flight main', 'flight type', 'flight details', 'flight preference', 'ride main', 'ride passengers', 'ride vehicle', 'ride summary', 'auth main', 'payment main', 'confirmation main'];


export default class BookingApp {

    constructor(page, container) {

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


        this.rawData = {};


        // Assign App Data
        this.appData = {
            loaded: false,
            vehicles: []
        }


        // Keep Track of Booking Application State
        this.state = {
            step: ''
        }


        // Define DOM Elements
        const ctn = $(container);
        const child = sel => ctn.children(sel);
        this.elements = {
            container,
            image: child('.booking__image'),
            map: child('#booking-map'),
            card: {
                main: child('.booking-card'),
                body: child('.booking-card__body'),
                back: child('#booking-back'),
                forward: child('#booking-forward')
            }
        }


        // Assign page object
        this.page = page;


        // For debugging
        console.log(this);

    }

    load() {
        


    }


    init() {

        // Prevent Submit
        this.elements.card.body.prevent('submit');


        // Initialize Navigation Events
        this.elements.card.back.click(e => this.navigate(-1, e.target));
        this.elements.card.forward.click(e => this.navigate(1, e.target));


        // Initialize First Step
        this.setStep("flight main");


        // Render Current Step
        this.currentStep.render();


    }

    setStep(name) {

        const keys = name.split(' ');

        this.currentStep = steps[keys[0]][keys[1]]({
            container: this.elements.card.body,
            isMobile: this.page.state.isMobile,
            callbacks: {
                onValid: () => this.elements.card.forward.removeClass('disabled'),
                onError: () => this.elements.card.forward.addClass('disabled')
            },
            data: this.rawData[name]
        });

        this.state.step = name;

    }

    getStepData() {
        //console.log(this.currentStep.data);
        // console.log(this.state);
        
        this.rawData[this.state.step] = this.currentStep.rawData.map(fs => fs.value);

        switch (this.state.step) {

            case 'flight main':
                Object.assign(this.data, this.currentStep.data);
                break;

            case 'flight type':
                console.log(this.currentStep.data);
                break;


        }


        // Debugging Refreence for Data
        // console.log(this.data);
        // console.log(this.rawData);

    }


    getNextStep(iterator, refIndex) {

        const currentIndex = refIndex ?? registeredSteps.findIndex(step => this.state.step === step);
        const index = currentIndex + iterator;
        let next = registeredSteps[index];
        const max = registeredSteps.length;


        // Iterate To Next Steop For Non-Flight Rides
        if (next.includes('flight') && next.split(' ')[1] !== 'main' && !this.data.airportRide) return this.getNextStep(iterator, index);


        // Set Up Next Step
        this.setStep(next);


        // Enable or Disable Back Button
        this.elements.card.back[!index ? 'addClass' : 'removeClass']('disabled');

    }


    async navigate(direction, target) {


        // Blur Clicked Button
        if (target) target.closest('.carat-btn').blur();


        // Return Step Data
        this.getStepData();


        // Unmount Current Step
        await this.currentStep.unmount();


        // Determine Next Step
        this.getNextStep(direction);


        // Render New Step
        this.currentStep.render();


    }



}