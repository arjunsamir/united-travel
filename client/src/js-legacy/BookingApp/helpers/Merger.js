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
    
}