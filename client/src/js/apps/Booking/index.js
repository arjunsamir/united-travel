// Do Initial Request
import axios from 'axios';

import App from "./App";
// import Oopsie from '../components/Oopsie';
import ReactAppWrapper from "../helpers/ReactAppWrapper";

export default class BookingApp extends ReactAppWrapper {

    constructor(dta, ctn) {
        super(dta.selector, ctn);
        this.App = App;
        this.page = dta.page;
    }

    async load() {

        const res = {
            page: this.page,
        };

        const promises = [
            axios(`/api/copy/booking/${window.locale}`).then(data => res.copy = data?.data)
        ];

        await Promise.all(promises);

        await this.render(res);

    }
    
}