// Import React Items
import { useState, useEffect } from 'react';

// Import Config & Helpers
import config from '../../data/config';
import { insertScript } from '../../helpers/utils';

// Facebook oAuth Class
class FacebookAuth {
    constructor({ callback, endpoint }) {
        this.callback = callback;
        this.endpoint = endpoint;
        this.fields = {
            fields: 'email,name,first_name,last_name,middle_name,short_name'
        }
    }

    async load() {

        if (window.FB) return;

        window.fbAsyncInit = () => {
            window.FB.init(config.facebook);
        };
    
        await insertScript('https://connect.facebook.net/en_US/sdk.js', 'facebook-jssdk');

    }

    async getUserData() {
        const user = {
            preferredLocale: window.locale
        };
    
        await Promise.all([
            new Promise(resolve => {
                FB.api('/me', this.fields, (data) => {
                    user.name = data.name;
                    user.email = data.email;
                    user.preferredName = data.short_name || data.first_name;
                    user.facebookID = data.id;
                    resolve();
                });
            }),
            new Promise(resolve => {
                FB.api('/me/picture', {
                    redirect: false,
                    height: '250',
                    width: '250',
                    type: 'normal'
                }, (data) => {
                    user.photo = data.data.url;
                    resolve();
                });
            })
        ]);
        
        this.callback(this.endpoint, user)
        FB.logout()
    }

    authenticate() {

        FB.login(() => this.getUserData(), {
            scope: 'email',
            return_scopes: true
        })
        
    }
}

// Google oAuth Class
class GoogleAuth {

    constructor({ callback, endpoint }) {
        this.callback = callback;
        this.endpoint = endpoint;
        this.allowCallback = false;
        this.enabled = true;
    }

    async load() {
        await insertScript('https://apis.google.com/js/api:client.js', 'google-oauth');

        if (!window.GoogleAuth) await new Promise(resolve => {

            // Load Google API
            gapi.load('client:auth2', () => {

                gapi.client.init(config.google).then(resolve).catch((err) => {
                    this.enabled = false;
                    console.warn(err);
                    resolve();
                })

            })
        });

        if (!this.enabled) return;

        // Create New Auth Instance
        this.auth = window.GoogleAuth = gapi.auth2.getAuthInstance();

        // Sign Out User
        this.auth.signOut();

        // Listen For Chances to Authenticator
        this.auth.isSignedIn.listen(() => this.updateStatus())

    }

    updateStatus() {

        if (!this.allowCallback || !this.auth.isSignedIn.get()) return;

        const token = this.auth.currentUser.get().getAuthResponse().id_token;
        
        // Request JWT from server
        this.callback(this.endpoint, { token, preferredLocale: window.locale })

        // Sign googleuser back out to rely on JWT
        this.auth.signOut();
        
    }

    authenticate() {

        this.allowCallback = true;
        this.auth.signIn();

    }
}

// Create Custom Hook
const useOAuth = (callback) => {

    const [oAuth, setOAuth] = useState({});

    useEffect(() => {

        const loadClients = async () => {

            const googleAuth = new GoogleAuth({
                callback,
                endpoint: '/auth/google'
            });

            const facebookAuth = new FacebookAuth({
                callback,
                endpoint: '/auth/facebook'
            })

            // Wait For oAuth Providers to load
            await Promise.all([googleAuth.load(), facebookAuth.load()]);
                

            setOAuth({
                loaded: true,
                enabled: googleAuth.enabled,
                useAuthProvider: (service) => {

                    switch (service) {
                        case 'google':
                            return () => googleAuth.authenticate()
                        case 'facebook':
                            return () => facebookAuth.authenticate()
                    }

                }
            })

        }

        if (!oAuth.loaded) loadClients();

    }, [])

    
    return oAuth;

}

export default useOAuth;