import * as queryString from 'query-string';
import axios from 'axios';


class RequestPasswordResetForm {

    constructor() {
        this.endpoint = '/auth/request-reset-token';
        this.form = $('#reset-request-form');
        this.input = $('#request-reset-email');
    }

    listen() {
        this.form.prevent('submit', () => this.submit());
    }

    async submit() {

        const res = await axios({
            method: 'POST',
            url: this.endpoint,
            data: {
                email: this.input.val()
            }
        });

        console.log(res);

    }

}


class AuthForm {

    constructor() {

        // 1. Grab Form Elements
        this.form = $('#auth-form');
        this.toggle = $('#show-password');
        this.errorField = $('#auth-error');

        this.buttons = {
            google: $('#google-auth-btn'),
            facebook: $('#facebook-auth-btn')
        };

        this.inputs = {
            email: $('#auth-email'),
            password: $('#auth-password')
        };


        // 2. Determine Form Type
        this.type = this.form.data('type') || 'login';
        this.endpoint = '/auth/create-session'


        // 3. Create Object To Store Values
        this.data = {};
        this.user = {};


        // 4. Create Google OAuth
        this.google = {
            config: {
                client_id: '220634530652-pl9i990faf23aoc95mdcgvfsmhqmvd9c.apps.googleusercontent.com',
                cookiepolicy: 'single_host_origin'
            },
            api: window.gapi
        };


        this.facebook = {
            config: {
                client_id: '274042323746865',
                scope: { scope: 'email', return_scopes: true },
                fields: {
                    fields: 'email,name,first_name,last_name,middle_name,short_name'
                }
            }
        };

        this.affiliate = {};

        if (this.type === 'signup') {

            const url = new URLSearchParams(window.location.search);

            this.affiliate = {
                code: url.get('code'),
                name: url.get('name')
            };

            this.inputs.name = $('#auth-name');
            this.endpoint = '/auth/register'

            if (this.affiliate.code) this.data.referredBy = this.affiliate.code;

        }

    }


    listen() {

        this.load();

        this.form.prevent('submit', () => this.submit());
        this.toggle.on('change', e => this.togglePasswordVisibility(e));

        this.google.api.load('auth2', () => {
            this.google.auth = this.google.api.auth2.init(this.google.config);
            this.google.auth.attachClickHandler(this.buttons.google.nodes(), {}, user => this.validateGoogleToken(user));
        });

        this.buttons.facebook.click(() => {

            window.FB.login(res => this.validateFacebookUser(res), this.facebook.config.scope);

        });
        


    }


    getValues() {

        Object.entries(this.inputs).forEach(pair => {
            this.data[pair[0]] = pair[1].val();
        });

        console.log(this.data);
        
    }


    togglePasswordVisibility(e) {
        this.inputs.password.set('type', e.target.checked ? 'text' : 'password');
    }


    onSuccess() {
        window.location = '/';
    }


    onFail(msg) {
        this.errorField.text(msg);
    }


    validate() {
        // Validate The form
    }


    async load() {

        window.fbAsyncInit = () => {
            window.FB.init({
                appId: this.facebook.config.client_id,
                cookie: true, // enable cookies to allow the server to access the session
                xfbml: true, // parse XFBML
                version: 'v7.0'
            });
        
        };

        await new Promise(resolve => {
            const id = 'facebook-jssdk';
            const ref = document.querySelectorAll('script')[0];
            if (document.getElementById(id)) return;
            const js = document.createElement('script');
            js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            js.addEventListener('load', () => resolve());
            ref.parentNode.insertBefore(js, ref);
        });
        console.log('fb successfully loaded');


    }


    async validateFacebookUser(response) {

        const user = {};

        const info = new Promise(resolve => {
            window.FB.api('/me', this.facebook.config.fields, data => {
                user.name = data.name;
                user.email = data.email;
                user.preferredName = data.short_name || data.first_name;
                user.facebookID = data.id;
                resolve(data);
            });
        });

        const photo = new Promise(resolve => {
            window.FB.api('/me/picture', {
                redirect: false,
                height: '250',
                type: 'normal',
                width: '250'
            }, data => {
                user.photo = data.data.url;
                resolve(data.data);
            });
        });

        await Promise.all([info, photo]);

        if (this.affiliate.code) user.referredBy = this.affiliate.code;

        const res = await axios({
            method: 'POST',
            url: '/auth/facebook',
            data: user
        });

        console.log(res);

        //this.onSuccess();

    }


    async validateGoogleToken(user) {

        const data = {
            token: user.getAuthResponse().id_token
        };

        if (this.affiliate.code) data.referredBy = this.affiliate.code;

        const res = await axios({
            method: 'POST',
            url: '/auth/google',
            data
        });

        console.log(res);

        this.onSuccess();

    }


    async submit() {

        this.getValues();

        const res = await axios({
            method: 'POST',
            url: this.endpoint,
            data: this.data
        });

        if (res.data.status === 'success') this.onSuccess();
        else this.onFail(res.data.message)

    }

}



export const initLoginPage = () => {

    const form = new AuthForm('signup');
    form.listen();

    if (form.type === 'login') new RequestPasswordResetForm().listen();

}