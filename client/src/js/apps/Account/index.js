// Do Initial Request
import axios from 'axios';

import App from "./App";
import ReactAppWrapper from "../helpers/ReactAppWrapper";


export default class AccountApp extends ReactAppWrapper {

    constructor(dta, ctn) {
        super(dta.selector, ctn);
        this.App = App;
    }

    async load() {

        const res = {};

        const promises = [
            axios(`/api/copy/login/${window.locale}`).then(data => res.login = data?.data),
            axios(`/api/copy/account/${window.locale}`).then(data => res.account = data?.data)
        ];

        await Promise.all(promises);

        // Do a shitload of destructuring and restructuring
        const { login, account } = res;
        const errors = login.errors;
        const inputs = {
            ...login.common, 
            ...login.registration.inputs,
            ...login.login.inputs,
            newPassword: { ...login.reset.inputs.password }
        };
        res.copy = {
            ...account,
            inputs: { ...inputs, ...account.inputs },
            errors: { ...errors, ...account.errors }
        }

        await this.render(res);

    }
    
}