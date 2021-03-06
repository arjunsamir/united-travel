import axios from 'axios';

// Tooltip To Insert
const tooltip = '<div class="input__tooltip hidden"><p></p></div>';

// Icons will only show up in production because currently parcel is bundling all of the files and hashing them. This function works however
const icons = '<svg><use xlink:href="img/icons.svg#close"></use></svg><svg><use xlink:href="img/icons.svg#checkmark-circle"></use></svg>';

const eye = '<svg class="toggle" data-visible="0"><use xlink:href="img/icons.svg#eye"></use></svg>';

// Stored Regex Expressions
const regex = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    name: /^[a-zA-Z-'. ]+$/
};

// Stored Error and Success Messages
const messages = {
    defaults: {
        success: 'Looks great!',
        empty: 'This field is required',
        fail: 'This field is invalid',
        short: 'This must be at least %L% characters'
    },
    email: {
        empty: 'Please enter your email',
        fail: "Email may be missing the '@' or '.'"
    },
    name: {
        success: 'Nice to meet you!',
        empty: 'Please tell us your name',
        fail: 'Please do not include any numbers or special characters'
    },
    message: {
        empty: 'Please enter a message',
        short: 'Your message must be at least %L% characters'
    },
    password: {
        success: 'Perfection',
        empty: 'Please enter a password',
        short: 'Your password must be at least %L% characters'
    }
};

// Filter Inputs With Regex
const filterInput = (element, regex) => {

    let input = element;
    if (!$.dreaming(element)) input = $(element);

    const events = ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"];
    const filter = val => regex.test(val) || !val;

    events.forEach( event => {

        input.on(event, function() {

            if (filter(this.value)) {
                this.oldValue = this.value;
                this.oldSelectionStart = this.selectionStart;
                this.oldSelectionEnd = this.selectionEnd;
            } 

            else if (this.hasOwnProperty("oldValue")) {
                this.value = this.oldValue;
                this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            } 
            
            else {
                this.value = "";
            }

        });


    });

};


class Field {


    constructor(props) {

        // Create Element
        const e = $.dreaming(props.field) ? props.field : $(props.field);


        // Insert Tooltip
        e.insert(tooltip);


        // Insert Icons
        if (props.icons) e.insert(icons);


        // Define Input Nodes
        this.nodes = {
            label: e.children('h6'),
            tooltip: e.children('.input__tooltip'),
            message: e.children('.input__tooltip > p'),
            input: e.children('input, textarea'),
            field: e
        };

        const type = e.data('type');

        // Define Input Properties
        this.props = {
            type,
            name: e.data('name') || type,
            label: this.nodes.label.text(),
            symbiotic: props.symbiotic || false,
            required: e.has('data-required'),
            requiredLength: e.data('min', 'int') || 0,
            regex: regex[type] || false
        };

        const msgs = messages[this.props.type];
        const df = messages.defaults;


        this.messages = {
            success: msgs.success || df.success,
            errors: {
                empty: msgs.empty || df.empty,
                fail: msgs.fail || df.fail,
                short: (msgs.short || df.short).replace('%L%', this.props.requiredLength)
            }
        };


        // Define Symbiotic Input Parent
        if (props.symbiotic) this.parent = props.parent;


        // Define Initial Node Value
        this.value = this.nodes.input.val();
        this.error = '';


        // Define Initial State
        this.state = {
            empty: !this.value ? true : false,
            touched: false,
            focused: false,
            blurred: false,
            valid: !this.props.required,
            popupShown: false,
            forcePopup: false
        };


        // Validate Initial Value
        if (!this.state.empty) this.validate();
        
        this.attachListeners();

    }


    attachListeners() {

        
        this.nodes.input.on('input blur focus', e => this.update(e));


        switch (this.props.type) {

            case 'name':
                filterInput(this.nodes.input, regex.name);
                break;

            case 'password':
                this.attachToggle();
                break;
        }

    }

    attachToggle() {
        const toggle = $.html(eye);
        this.nodes.field.append(toggle);

        console.log(toggle.e().innerHTML);

        toggle.click(() => {

            const currentlyVisible = toggle.data('visible', 'int');
            let icon = toggle.html();
            let type = 'text';

            if (currentlyVisible) {
                type = 'password';
                icon = icon.replace('#eye-off', '#eye');
            }

            else icon = icon.replace('#eye', '#eye-off');

            toggle.setData('visible', type === 'text' ? 1 : 0);
            this.nodes.input.set('type', type);
            toggle.toggle('visible', type === 'text');
            toggle.html(icon);

            
        });

    }


    update(e) {

        if (e && e.type === 'blur') this.state.touched = true;

        const val = e ? e.target.value : this.value;

        this.validate(val);

        // Remove Existing Clases
        this.nodes.field.removeClass('valid error');

        // Update Label Text
        if (val && this.state.valid) this.nodes.label.text(this.messages.success);
        else this.nodes.label.text(this.props.label);

        // Show or Hide Popups
        if (this.state.touched) {

            // Set Error Class
            this.nodes.field.addClass(this.error ? 'error' : 'valid');

            // Show Popup
            if (this.error) this.showPopup();

            // Clear popup
            if (this.state.valid) this.clearPopup();

        }

        // Pass control to parent if parent
        if (this.props.symbiotic) this.parent.update();

    }


    clear() {
        this.nodes.input.setVal('');
        this.value = '';
    }


    validate(val) {

        let valid = true;
        const value = val|| this.nodes.input.val();
        let error = '';

        if (!value && this.props.required) {
            valid = false;
            error = 'empty';
            this.state.empty = true;
        }

        else if (value.length < this.props.requiredLength) {
            error = 'short';
            valid = false;
        }

        else if (this.props.regex) {
            if (!this.props.regex.test(value)) {
                error = 'fail';
                valid = false;
            }
        }

        this.error = error;
        this.state.valid = valid;
        this.value = value;

    }


    showPopup() {

        if (this.state.popupShown) return this.updatePopup();

        const message = this.error ? this.messages.errors[this.error] : this.messages.success;

        if (this.state.valid) return this.clearPopup();
        
        this.nodes.message.text(message);
        this.nodes.tooltip.removeClass('hidden');
        this.state.popupShown = true;
    }


    updatePopup() {
        this.nodes.message.text(this.messages.errors[this.error]);
    }


    clearPopup() {

        if (!this.state.popupShown) return;

        const isActive = document.activeElement === this.nodes.input.e();

        if (!this.state.valid && isActive) return;

        this.nodes.tooltip.addClass('hidden');
        this.state.popupShown = false;
    }


    forceTouch() {
        this.state.touched = true;
        this.update();
    }


}


class Input {

    constructor(input) {

        // Create Element
        this.element = $.dreaming(input) ? input : $(input);


        // Create Variables
        const children = this.element.children('.input__field');
        const insertIcons = this.element.data('icons', 'int');


        // Set Properties
        this.props = {
            multipart: children.length > 1,
            fields: children.length,
            name: this.element.data('name')
        };


        // Set Initial State
        this.state = {
            empty: true,
            touched: false,
            focused: false,
            valid: false
        };

        
        this.fields = {};


        children.forEach(child => {

            const field = new Field({
                parent: this,
                field: child,
                icons: insertIcons,
                symbiotic: true
            });

            this.fields[field.props.name] = field;

        });


    }


    clear(name) {

        if (name) this.fields[name].clear();

        else $.each(this.fields, field => this.fields[field].clear());

    }

    update() {

        let allValid = true;
        let allTouched = true;
        let touched = false;

        $.each(this.fields, name => {
            const state = this.fields[name].state;
            if (!state.valid) allValid = false;
            if (!state.touched) allTouched = false;
            if (state.touched) touched = true;
        });

        this.element.removeClass('valid error');

        if (!allValid && allTouched) {
            this.element.addClass('error');
            this.state.valid = false;
        }

        else if (allValid && allTouched) {
            this.element.addClass('valid');
            this.state.valid = true;
        }

        if (touched) this.state.touched = true;

    }

    validate() {
        $.each(this.fields, name => this.fields[name].validate());
    }

    showPopup() {
        $.each(this.fields, name => this.fields[name].showPopup());
    }

    clearPopup() {
        $.each(this.fields, name => this.fields[name].clearPopup());
    }
    
    forceTouch() {
        $.each(this.fields, name => this.fields[name].forceTouch());
        this.state.touched = true;
    }
}



export default class Form {

    constructor(selector, container) {

        this.fields = {};
        this.values = {};

        this.form = container ? $(container).children(selector) : $(selector);

    }

    
    init() {

        this.addFields();

        // Prevent Form Submission
        this.form.prevent('submit', () => {

            let allValid = true;

            $.each(this.fields, name => {
                this.fields[name].validate();
                if (!this.fields[name].state.valid) allValid = false;
            });

            if (!allValid) {
                this.showPopups();
                $.each(this.fields, name => this.fields[name].forceTouch());
                if (this.onValidationFail) this.onValidationFail();
            }

            if (allValid) {
                this.clearPopups();
                if (this.onValidationSuccess) this.onValidationSuccess();
            }

        });

        this.listenForFocus();
        
    }


    addFields() {

        this.form.children('.input').forEach(child => {

            const input = new Input(child);
            this.fields[input.props.name] = input;

        });

        this.form.children('.textarea').forEach(child => {

            const field = new Field({ field: child });
            this.fields[field.props.name] = field;

        });

    }


    listenForFocus() {
        this.form.listenFor('focusout', 'input, textarea', e => {
            this.clearPopups();
        });
        
        this.form.listenFor('focusin', 'input, textarea', e => {
            this.clearPopups();
        });
    }


    clearPopups() {
        $.each(this.fields, name => this.fields[name].clearPopup ? this.fields[name].clearPopup() : '');
    }


    showPopups() {
        $.each(this.fields, name => this.fields[name].showPopup ? this.fields[name].showPopup() : '');
    }


    async post(endpoint, data) {

        if (!endpoint && !this.endpoint) console.warn('Please specify and endpoint');

        const res = await axios({
            method: 'POST',
            url: endpoint || this.endpoint,
            data
        });

        return res;

    }

}