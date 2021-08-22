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

    getReferral() {
        const url = new URLSearchParams(window.location.search);
        return url.get('code')
    }

    async loginCallback(user) {

        // Update Window user
        window.currentUser = user;

        // Refresh Page Navbar
        await this.page.navbar.refresh();

        // Navigate to Home Page
        this.page.barba.go('/');

    }

    async load() {

        const res = {
            onLogin: (user) => this.loginCallback(user)
        };

        const promises = [
            axios(`/api/copy/login/${window.locale}`).then(data => res.copy = data?.data)
        ];

        const code = this.getReferral();
        if (code) promises.push(axios(`/users/referrals/${code}`).then(data => res.referral = data?.data?.user));

        await Promise.all(promises);

        await this.render(res);

    }

    static async getReactApp() {

        const res = await axios(`/api/copy/login/${window.locale}`);

        console.log(res);

    }
    
}