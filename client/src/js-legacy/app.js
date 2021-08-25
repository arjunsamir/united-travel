// Import Runtime & GSAP
import 'regenerator-runtime/runtime';
import gsap from 'gsap';


// Import Modules
import { dream } from './vendor/Dreams';
import barba from '@barba/core';
import Page from './Page';
import Preloader from './Page/components/Preloader';


// Define Global Variables
window.$ = dream;
window.gsapDefaults = { defaults: { ease: 'power1.inOut' } };


// Define Module Global Variables
let slide, page;


// Insert Slide In Page
const insertSlide = () => {
    // Create Slide Element
    slide = $.html('<div class="page-transition-slide"><div class="preloader__content"><svg><use xlink:href="img/icons.svg#logo"></use></svg><span class="preloader__spinner"></span></div></div>');

    // Append Slide Element
    page.elements.body.append(slide);
}


// Define Function to refresh page
const refreshPageEvents = ({ next }) => {
    page.destroy();
    page = new Page({ barba, container: next.container }).init();
}


// Start Page Functions
const startPage = data => {

    // Start Page Events
    page.start();


    // Get Video Backgrounds
    const videos = $(data ? data.next.container : 'main').children('.bg-video');
    

    // Return if no videos on the page
    if (!videos.length) return;
    

    //Autoplay Videos After transition
    videos.children('video[autoplay]').forEach(video => video.play());


    // Add Ready Class To Videos
    videos.addClass('ready');

}



// Start Load Page
window.addEventListener('DOMContentLoaded', () => {

    // Create New Page
    page = new Page({ barba }).init();


    // Create Preloader
    new Preloader().after(startPage).init();


    // Initialize Barba.JS
    barba.init({

        // Define Page Transition
        transitions: [{

            name: 'default-transition',

            // Animate Slide Into Place
            leave() {
                return new Promise(resolve => {               
                    const tl = gsap.timeline(gsapDefaults);

                    tl.to(slide.e(), { y: 0, duration: .5 });
                    tl.eventCallback('onComplete', resolve);
                })
            },

            // Animate Slide Away to reveal new page
            enter() {
                return new Promise(resolve => {

                    const tl = gsap.timeline(gsapDefaults);

                    tl.to(slide.children('.preloader__content').e(), { duration: .5, opacity: 0 });

                    tl.to(slide.e(), { duration: .5, y: '-100vh' });

                    tl.eventCallback('onComplete', resolve);

                });
            }
            
        }],

        // Register JavaScript Components For Different Pages
        views: [
            // Home Namespace
            {
                namespace: 'home',
                beforeEnter({ next }) {
                    page.addComponent('Typewriter', 'ContactForm',
                        {
                            name: 'DraggableSlider', 
                            data: {
                                selector: '.reviews__carousel',
                                activeClass: 'dragging'
                            }
                        }
                    );
                }
            },

            // Services Namespace
            {
                namespace: 'services',
                beforeEnter() {
                    page.addComponent('ContactForm');
                }
            },

            // About Namespace
            {
                namespace: 'about',
                beforeEnter() {
                    page.addComponent('ContactForm');
                }
            },

            // Fleet Namespace
            {
                namespace: 'fleet',
                beforeEnter() {
                    page.addComponent('ContactForm');
                }
            },

            // Login Namespace
            {
                namespace: 'login',
                beforeEnter() {

                    // Apply Navbar Theme Changes
                    page.navbar.applyTheme([{ brand: 'jet' }, { media: 'mobile', brand: 'white' }]).forceLayout('tablet');

                    // Add Auth Form Component
                    page.addComponent({ name: 'AuthForm', data: { page, selector: '#login-form' } });

                }
            },

            // Booking Namespace
            {
                namespace: 'booking',
                beforeEnter() {

                    // Apply Navbar Theme Changes
                    page.navbar.applyTheme([{ brand: 'jet' }]).forceLayout('mobile');

                    // Add Booking App Component
                    page.addComponent({ name: 'BookingApp', data: {
                        page,
                        selector: '#root'
                    }});

                }
            }
        ],

        // Prevent Double Clicking Links
        preventRunning: true,

        // Prevent Defalut Link Actions
        prevent: ({ el }) => el.classList && el.classList.contains('prevent')

    });


    // Attach Global Barba Hooks
    barba.hooks.beforeLeave(insertSlide);
    barba.hooks.afterLeave(refreshPageEvents);
    barba.hooks.after(startPage);

});