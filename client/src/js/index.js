// Import Runtime
import 'regenerator-runtime/runtime';


// Import GSAP
import gsap from 'gsap';


// Import Modules
import { dream } from './vendor/Dreams';
import barba from '@barba/core';
import Page from './Page';


// Define Global Variables
window.$ = dream;
window.gsapDefaults = { defaults: { ease: 'power1.inOut' } };


// Start Load Page
window.addEventListener('DOMContentLoaded', () => {

    // Define Pages
    const pages = {
        main: ['home', 'about', 'services', 'fleet'],
        auth: ['login', 'signup', 'account'],
        booking: ['booking']
    }

    // Create New Page
    const page = new Page({
        initialPage: true
    });


    // Initialize Page
    page.init();


    barba.init({
        transitions: [

            // Default Transition
            {
                before() {
                    return new Promise(resolve => {

                        page.insertSlide();
                        resolve();

                    });
                },

                leave({ current }) {
                    return new Promise(resolve => {
                        console.log(page.elements.slide);
                        
                        const tl = gsap.timeline(gsapDefaults);

                        tl.to(page.elements.slide.e(), { y: 0, duration: .5 });
                        tl.eventCallback('onComplete', resolve);
                    })
                },

                after() {
                    return new Promise(resolve => {
                        const tl = gsap.timeline(gsapDefaults);

                        tl.to(page.elements.slide.children('.preloader__content').e(), { duration: .5, opacity: 0 });

                        tl.to(page.elements.slide.e(), { duration: .5, y: '-100vh' });

                        tl.eventCallback('onComplete', resolve);
                    });
                }
            }

        ],
        views: [

        ]
    })


    // Attach Barba Hooks
    barba.hooks.beforeLeave(() => page.freeze());
    barba.hooks.afterLeave(({next}) => page.refresh(next));
    barba.hooks.after(() => page.start());

})