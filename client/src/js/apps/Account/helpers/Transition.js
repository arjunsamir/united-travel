// Import Dependencies
import anime from 'animejs';

// Define Tranition Class
export default class Transition {

    constructor(dispatch) {

        // Create Dispatcher Reference
        this.setStep = (step) => dispatch({
            type: 'SET_STEP',
            payload: step
        });


    }

    set(container) {

        this.container = $(container)

    }

}