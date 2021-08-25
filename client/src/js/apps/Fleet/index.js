// Do Initial Request
import axios from 'axios';

import App from "./App";
import ReactAppWrapper from "../helpers/ReactAppWrapper";

export default class FleetApp extends ReactAppWrapper {

    constructor(dta, ctn) {
        super(dta.selector, ctn);
        this.App = App;
        this.scroll = dta.page.scroll;
    }

    
    async load() {

        const res = {
            scroll: this.scroll
        };

        await Promise.all([
            axios('/api/vehicles').then(data => {
                // Filter and Localize Vehicles
                res.vehicles = data?.data?.data?.data
                ?.filter(v => v.active)
                .sort((a, b) => a.seats - b.seats);
            }),
            axios(`/api/copy/fleet/${window.locale}`).then(data => res.copy = data?.data)
        ]);

        await this.render(res);

    }
}