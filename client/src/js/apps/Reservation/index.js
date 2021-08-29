// Do Initial Request
import axios from 'axios';

import App from "./App";
import ReactAppWrapper from "../helpers/ReactAppWrapper";


export default class ReservationApp extends ReactAppWrapper {

    constructor(dta, ctn) {
        super(dta.selector, ctn);
        this.App = App;
    }

    async load() {

        const res = {};

        const promises = [
            axios(`/api/copy/booking/${window.locale}`).then(data => res.copy = data?.data),
            axios(`/api/booking/reservations/users/me/${window.confirmationCode}`).then(data => res.reservation = data?.data.reservation)
        ];

        await Promise.all(promises);

        await this.render(res);

    }
    
}