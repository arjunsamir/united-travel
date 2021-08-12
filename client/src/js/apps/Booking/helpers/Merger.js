export default class Merger {

    constructor(category, state) {
        this.category = category;
        this.state = state;
    }

    merge(data, key) {

        if (key) this.state = Object.assign({}, this.state, {
            [this.category]: Object.assign({}, this.state[this.category], {
                [key]: Object.assign({}, this.state[this.category][key], data)
            })
        })

        else this.state = Object.assign({}, this.state, {
            [this.category]: Object.assign({}, this.state[this.category], data)
        })

        return this.state
    }

    switch() {
        const { category: c } = this;
        this.category = c === 'app' ? 'reservation' : 'app';

        return this;
    }

    validate(step, valid) {

        // Coerce Boolean Value
        const isValid = !!valid;

        // Create Shortcut Reference
        const app = this.state.app;

        // Destructure and construct array
        const { first: f, dynamic: d, last: l } = app.steps;
        const steps = [...f, ...d, ...l];

        // Find Match
        const index = steps.findIndex(s => s.name === step);

        // Get Match. This should NEVER be null
        const match = steps[index];
        
        // Determine if step is valid
        app.steps[match.group][match.index].complete = isValid;

        // Manage Future Steps
        steps.slice(index + 1).forEach((s, i) => {

            // Activate or Deactivate the next step
            if (!i) app.steps[s.group][s.index].active = isValid;

            // If invalid deactivate all other steps
            else if (!isValid) app.steps[s.group][s.index].active = false;

        });

        // Never Forget To Return State
        return this.state;

    }
    
}