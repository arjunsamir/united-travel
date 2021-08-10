// Do Initial Request
import axios from 'axios';

import App from "./App";
import ReactAppWrapper from "../helpers/ReactAppWrapper";

export default class LoginApp extends ReactAppWrapper {

    constructor(dta, ctn) {
        super(dta.selector, ctn);
        this.App = App;
    }

    getReferral() {
        const url = new URLSearchParams(window.location.search);
        return url.get('code')
    }

    async load() {

        const res = {};

        const promises = [
            axios(`/api/copy/login/${window.locale}`).then(data => res.copy = data?.data)
        ];

        const code = this.getReferral();
        if (code) promises.push(axios(`/users/referrals/${code}`).then(data => res.referral = data?.data?.user));

        await Promise.all(promises);

        await this.render(res);

    }
    
}