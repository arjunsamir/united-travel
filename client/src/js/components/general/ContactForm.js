import Form from './Form';

export default class ContactForm extends Form {

    constructor(selector, container) {

        super(selector, container);

        this.elements = {
            input: this.form.children('.input'),
            textarea: this.form.children('.textarea')
        }

        // console.log(this.fields);

    }


    onValidationFail() {
        console.log('we validated the WHOLE fooking form m*ty');
    }

    onValidationSuccess() {
        console.log('SUCCESSSSSSS');
    }



}