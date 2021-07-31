import React from "react";
import ReactDOM from "react-dom";

import App from './App';


export default class BookingApp {
    constructor(dta, ctn) {
        this.dta = dta;
        this.root = $(ctn).children(dta.selector).e();
    }

    onMount() {
        console.log('App mounted');
    }

    init() {
        ReactDOM.render(<App />, this.root, () => this.onMount());
    }
}