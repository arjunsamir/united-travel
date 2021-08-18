// Import Modules
import anime from 'animejs';
import barba from '@barba/core';


// Import Modules
import './main/helpers/Dreams';
import Page from './main/Page';
import Preloader from './main/Preloader';


// Define Module Global Variables
let slide, page;


// Insert Slide In Page
const insertSlide = () => {
    // Create Slide Element
    slide = $.html('<div class="page-transition-slide"><div class="preloader__content"><svg><use href="/img/icons.svg#logo"></use></svg><span class="preloader__spinner"></span></div></div>');

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
            async leave() {

                const tl = anime.timeline({
                    easing: 'easeOutQuad',
                    autoplay: false
                }).add({
                    targets: slide.e(),
                    translateY: ['100vh', '0vh'],
                    duration: 500
                })

                await page.navbar.closeMenu();

                tl.play();

                await tl.finished;
            },

            // Animate Slide Away to reveal new page
            enter() {

                const tl = anime.timeline({
                    easing: 'easeOutQuad'
                }).add({
                    targets: slide.children('.preloader__content').e(),
                    opacity: 0,
                    duration: 500
                })
                .add({
                    targets: slide.e(),
                    translateY: '-100vh',
                    duration: 500
                });

                return tl.finished;
            }
            
        }],

        // Register JavaScript Components For Different Pages
        views: [
            // Home Namespace
            {
                namespace: 'home',
                beforeEnter() {
                    page.addComponent('Typewriter', { name: 'ReviewsApp', data: {
                        page,
                        selector: '#reviews-react-app'
                    }});

                    page.navbar.applyView('full');

                    return page.load();
                }
            },

            // About Namespace
            {
                namespace: 'about',
                beforeEnter() {
                    page.addComponent({ name: 'ReviewsApp', data: {
                        page,
                        selector: '#reviews-react-app'
                    }});
                    
                    page.navbar.applyView('full');

                    return page.load();
                }
            },

            // Fleet Namespace
            {
                namespace: 'fleet',
                beforeEnter() {
                    page.addComponent({ name: 'FleetApp', data: {
                        page,
                        selector: '#fleet-react-app'
                    }});

                    page.navbar.applyView('min');

                    return page.load();
                }
            },

            // Login Namespace
            {
                namespace: 'login',
                beforeEnter() {

                    page.addComponent({ name: 'LoginApp', data: {
                        page,
                        selector: '#login-react-app'
                    }});
                    page.options.smooth = false;
                    page.navbar.applyView('min');

                    return page.load();

                }
            },

            // Booking Namespace
            {
                namespace: 'booking',
                beforeEnter() {

                    // Add Booking App Component
                    page.addComponent({ name: 'BookingApp', data: {
                        page,
                        selector: '#booking-react-app'
                    }});

                    page.options.smooth = false;
                    page.navbar.applyView('min');

                    return page.load();

                }
            }
        ],

        // Prevent Double Clicking Links
        preventRunning: true,

        // Prevent Defalut Link Actions
        prevent: ({ el }) => el.classList && el.classList.contains('prevent'),

        // Enable Debug Mode
        debug: true

    });


    // Attach Global Barba Hooks
    barba.hooks.beforeLeave(insertSlide);
    barba.hooks.afterLeave(refreshPageEvents);
    barba.hooks.after(startPage);

});