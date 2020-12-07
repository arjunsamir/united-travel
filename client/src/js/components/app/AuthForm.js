import Form from '../general/Form';

export default class AuthForm extends Form {

    constructor(props, container) {

        // 1. Call Super
        super(props.selector, container);

        console.log(this);

        this.endpoint = props.endpoint;
        this.navbar = props.page.navbar;
        this.navigator = props.page.barba;

        this.google = {
            config: {
                client_id: '220634530652-pl9i990faf23aoc95mdcgvfsmhqmvd9c.apps.googleusercontent.com',
                cookiepolicy: 'single_host_origin'
            },
            button: $('#google-auth-btn')
        };

        this.facebook = {
            config: {
                client_id: '274042323746865',
                scope: { scope: 'email', return_scopes: true },
                fields: {
                    fields: 'email,name,first_name,last_name,middle_name,short_name'
                }
            },
            button: $('#facebook-auth-btn')
        };

        this.affiliate = {};

        this.loadOAuth();

    }


    async loadOAuth() {

        window.fbAsyncInit = () => {
            window.FB.init({
                appId: this.facebook.config.client_id,
                cookie: true,
                xfbml: true,
                version: 'v7.0'
            });
        };

        const ref = document.querySelectorAll('script')[0];

        const insertScript = (id, src) => {
            
            if ($(`#${id}`).length) return true;

            const js = document.createElement('script');
            js.id = id;
            js.src = src;
            
            return new Promise(resolve => {
                js.addEventListener('load', () => resolve());
                ref.parentNode.insertBefore(js, ref);
            });

        };

        const facebook = insertScript('facebook-jssdk', 'https://connect.facebook.net/en_US/sdk.js');
        const google = insertScript('google-oauth', 'https://apis.google.com/js/api:client.js');

        await Promise.all([facebook, google]);

        this.google.api = window.gapi;


        // Attach Listeners
        this.google.api.load('auth2', () => {
            this.google.auth = this.google.api.auth2.init(this.google.config);
            this.google.auth.attachClickHandler(this.google.button.e(), {}, user => this.authenticateGoogleUser(user));
        });

        this.facebook.button.click(() => {
            window.FB.login(() => this.authenticateFacebookUser(), this.facebook.config.scope);
        });

        

    }


    async authenticateFacebookUser() {

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
                width: '250',
                type: 'normal'
            }, data => {
                user.photo = data.data.url;
                resolve(data.data);
            });
        });

        await Promise.all([info, photo]);

        this.authenticate('/auth/facebook', user);

    }


    authenticateGoogleUser(user) {

        const data = {
            token: user.getAuthResponse().id_token
        };

        this.authenticate('/auth/google', data);

    }


    async authenticate(endpoint, data) {

        if (this.affiliate.code) data.referredBy = this.affiliate.code;

        const res = await this.post(endpoint, data);

        console.log('request has been completed');
        console.log(res);

        if (res.status !== 200) return this.handleOAuthError();

        const target = this.navigator.history.previous ? this.navigator.history.previous.url : '/';

        this.navbar.login(res.data.data.user);

        this.navigator.go(target);

    }


    handleOAuthError() {
        console.log('An unknown error has occurred');
    }

}