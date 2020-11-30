import '@babel/polyfill';
import { initLoginPage } from './components/login';
import { initCore } from './components/core';
import { initResetForm } from './components/resetPassword';
import { initBooking } from './components/booking';


const init = {
    core: initCore,
    main: () => console.log('welcome to the main page'),
    auth: initLoginPage,
    reset: initResetForm,
    booking: initBooking
};


// Init Page & Run Contexts
const contexts = ["core", ...JSON.parse(document.querySelector('body').dataset.contexts)];
contexts.forEach(ctx => init[ctx]());