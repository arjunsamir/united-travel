// Do Initial Request
import axios from 'axios';

import App from "./App";
import ReactAppWrapper from "../helpers/ReactAppWrapper";


export default class AdminApp extends ReactAppWrapper {

    constructor(dta, ctn) {
        super(dta.selector, ctn);
        this.App = App;
    }

    formatAccountCopy(res) {
        const { login, account } = res;
        const errors = login.errors;
        const inputs = {
            ...login.common, 
            ...login.registration.inputs,
            ...login.login.inputs,
            newPassword: { ...login.reset.inputs.password }
        };
        return {
            ...account,
            inputs: { ...inputs, ...account.inputs },
            errors: { ...errors, ...account.errors }
        }
    }

    async load() {

        const res = {};

        const promises = [
            axios(`/api/copy/login/${window.locale}`).then(data => res.login = data?.data),
            axios(`/api/copy/account/${window.locale}`).then(data => res.account = data?.data),
            axios(`/api/copy/booking/${window.locale}`).then(data => res.resCopy = data?.data)
        ];

        await Promise.all(promises);

        res.copy = this.formatAccountCopy(res);

        await this.render(res);

    }
    
}