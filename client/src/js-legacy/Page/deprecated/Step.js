// Import Packages
import uniqid from 'uniqid';
import gsap from 'gsap';

// Import Data
import airports from '../../BookingApp/data/airports';

// Import TextNodes
import { h3, h4, p } from '../../utils/textNodes';
import generate from './formComponents';


// Create Shortcut
const bc = 'booking-card';




class Step {

    constructor(props, content) {

        this.content = { ...content };

        this.container = props.container;


        // Initialize Empty Data Object
        this.data = {};


        // Initialize Raw Data
        this.rawData = [];


        // Initialize Step State
        this.state = {
            complete: false,
            fieldsets: {},
            isMobile: props.isMobile
        }


        // Initialize Event Listeners
        this.listeners = [];

        
        // Register Callback Functions
        this.callbacks = props.callbacks ?? {};


        // Import Form Data
        this.importedData = props.data ?? [];


    }


    mount() {

        const events = {
            change: this.listeners.map(l => l.type === 
                'change' ? `[name="${l.id}"]` : null).filter(l => l).join(', ')
        };

        this.container.listenFor('change', events.change, e => {

            const id = e.target.name;

            this.listeners.forEach(listener => {

                const key = listener.key ?? listener.id;

                if (listener.id == id) {
                    const value = listener.test ? listener.test(e.target.value) : e.target.value;
                    this.data[key] = value;

                    const dataRef = this.rawData.find(x => x.id == id);
                    dataRef.value = e.target.value;

                    let isValid = true;
                    
                    switch (listener.inputType) {

                        case 'select':
                            if (!value) isValid = false;
                            break;
                    }

                    this.state.fieldsets[id].valid = isValid;

                }

            });

            this.validate();

            // console.log(this.data);
            // console.log(this.rawData);

        });

        // Manually Fire Change Events
        this.container.children('input').fire('change');

    }


    async unmount() {

        // Fade Out Container
        await new Promise(resolve => gsap.to(this.container.e(), { opacity: 0, duration: .5, onComplete: resolve }));


        // Clear Container
        this.container.clear();


        // Kill Events on Container
        this.container = this.container.kill();
    
    }


    validate() {

        let valid = true;

        $.each(this.state.fieldsets, (key, value) => {

            if (!value.valid) valid = false;

        });

        this.state.complete = valid;

        if (valid) this.callbacks.onValid();
        else this.callbacks.onError();

    }

    registerListeners(inputType, id, test, key, index) {

        let type = 'change';

        this.state.fieldsets[id] = {
            valid: false
        }

        this.listeners.push({
            type,
            inputType,
            id,
            test,
            key,
            valid: e => e.target.checked
        });

        this.rawData.push({ id, value: this.importedData[index] });

    }


    createFieldsets() {

        return this.content.fieldsets.map((fs, i) => {

            // Define Variables
            let inputs = '';
            const id = uniqid();
            const data = this.importedData[i];


            // Render Inputs
            switch (fs.type) {
                case 'option':
                    inputs = generate.options(fs.options, fs.optionSchema, id, data);
                    break;

                case 'select':
                    inputs = generate.select(fs.options, id, data);
                    break;

                case 'date-time':
                    inputs = generate.dateTime(this.state.isMobile);
                    break;
            }


            // Register Event Listeners and Actions
            this.registerListeners(fs.type, id, fs.test, fs.key, i);


            // Render Fieldset
            return `
                <div class="booking-card__fieldset">
                    ${h4(fs.title, `${bc}__fieldset-title`)}
                    ${inputs}
                </div>
            `

        }).join('');

    }



    async render() {

        this.container.css({opacity: 0});

        this.container.insert(`
            ${ h3(this.content.title, `${bc}__title`) }
            ${ p(this.content.text, `${bc}__text`) }
            ${ this.createFieldsets() }
        `);

        this.mount();

        await new Promise(resolve => gsap.to(this.container.e(), { opacity: 1, duration: .5, onComplete: resolve }));

    }


}



export default {

    // Flight Steps
    flight: {

        // Create Main Flight Card Page
        main: props => new Step(props, {
            title: 'Is this an <span>airport</span> ride?',
            fieldsets: [{
                type: 'option',
                key: 'airportRide',
                optionSchema: 'radio',
                options: [{
                    title: 'Yes',
                    text: 'I need to be picked up or dropped off at the airport.',
                    value: 'y'
                }, {
                    title: 'No',
                    text: 'I need a ride to a hotel, theme park, beach, resturant, etc.',
                    value: 'n'
                }],
                test: val => val === 'y'
            }]
        }),


        // Determine if Arriving or Departing Flight
        type: props => new Step(props, {
            title: 'Details about your <span>flight</span>',
            fieldsets: [{
                title: 'Select an airport',
                key: 'airport',
                type: 'select',
                options: airports.map(apt => {
                    return {
                        text: `${apt.code} - ${apt.name}`,
                        value: apt.code
                    }
                }),
                test: val => airports.find(apt => apt.code === val)
            },{
                title: 'What type of flight is this?',
                type: 'option',
                key: 'flightType',
                optionSchema: 'radio',
                options: [{
                    title: 'Arriving',
                    text: 'I need to be picked up from the airport',
                    value: 'arriving'
                }, {
                    title: 'Departing',
                    text: 'I need to be dropped off at the airport before my flight.',
                    value: 'departing'
                }]
            }]
        }),


        // Flight Details
        details: props => new Step(props, {
            title: 'More <span>flight</span> details',
            text: 'Help us schedule your ride by providing some information about your flight schedule.',
            fieldsets: [{
                title: 'Flight Date & Time',
                type: 'date-time'
            },
            {
                title: 'Airline Information',
                type: 'multipart',
                icon: '',
                fields: [{
                    label: 'Airline',
                    placeholder: 'United',
                    type: 'text'
                }, {
                    label: 'Flight Number',
                    placeholder: 'A2302',
                    type: 'text'
                }]
            }]
        }),


        // Flight Preference for Departing Flights
        preference: props => new Step(props, {

        })

    },

    // Main Booking Steps
    ride: {

        // Main Step for controlling Google Map
        main: '',

        // Get Passengers
        passengers: '',

        // Get Vehicle
        vehicle: '',

        // Display Summary
        summary: ''

    },


    // Authentication Steps
    auth: {
        main: ''
    },

    // Payment
    payment: {
        main: ''
    },

    // Confirmtaion
    confirmtaion: {
        main: ''
    }

}