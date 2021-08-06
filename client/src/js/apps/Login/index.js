// Do Initial Request
import axios from 'axios';

import App from "./App";
import ReactAppWrapper from "../helpers/ReactAppWrapper";

export default class LoginApp extends ReactAppWrapper {

    constructor(dta, ctn) {
        super(dta.selector, ctn);
        this.App = App;
    }

    async load() {

        const res = {};

        await Promise.all([
            axios('/api/vehicles').then(data => {
                // Filter and Localize Vehicles
                res.vehicles = data?.data?.data?.data
                ?.filter(v => v.active)
                .sort((a, b) => a.seats - b.seats);
            }),
            axios(`/api/copy/login/${window.locale}`).then(data => res.copy = data?.data)
        ]);

        await this.render(res);

    }
    
}