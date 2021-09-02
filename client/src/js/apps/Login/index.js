// Do Initial Request
import axios from 'axios';

import App from "./App";
import ReactAppWrapper from "../helpers/ReactAppWrapper";

export default class LoginApp extends ReactAppWrapper {

    constructor(dta, ctn) {
        super(dta.selector, ctn);
        this.App = App;
        this.page = dta.page;
    }

    getParams() {
        const url = new URLSearchParams(window.location.search);

        return {
            code: url.get('code'),
            reservation: url.get('reservation')
        }
    }

    async loginCallback(user) {

        // Update Window user
        window.currentUser = user;

        // Refresh Page Navbar
        await this.page.navbar.refresh();

        const baseUrl = window.locale === "es" ? "/es" : "";

        // Navigate to reservation
        if (this.reservation) window.location.href = `${baseUrl}/reservations/${this.reservation}`;

        // Navigate to Home Page
        else this.page.barba.go(baseUrl + "/");

    }

    async load() {

        const res = {
            onLogin: (user) => this.loginCallback(user)
        };

        const promises = [
            axios(`/api/copy/login/${window.locale}`).then(data => res.copy = data?.data)
        ];

        const { code, reservation } = this.getParams();

        this.reservation = reservation;

        if (code) promises.push(axios(`/users/referrals/${code}`).then(data => res.referral = data?.data?.user));

        await Promise.all(promises);

        await this.render(res);

    }

    static async getReactApp() {

        const res = await axios(`/api/copy/login/${window.locale}`);

        console.log(res);

    }
    
}