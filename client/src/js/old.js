// Import Dreams JS and set Global Scope
import { dream } from './components/vendor/Dreams';
window.$ = dream;


// Import Barba JS and GSAP
import barba from '@barba/core';
import gsap from 'gsap';


// Import Components
import removePreloader from './controllers/removePreloader';
import Scroll from './components/general/Scroll';
import DraggableSlider from './components/general/DraggableSlider';
import Navbar from './components/general/Navbar';
import Footer from './components/general/Footer'
import ContactForm from './components/general/ContactForm';
import Typewriter from './components/general/Typewriter';
import AuthForm from './components/app/AuthForm';
import Gallery from './components/general/Gallery';
import QRCode from './components/vendor/QRCode';


// Create & Start Load Timer
const loadTimer = $.timer();
loadTimer.start();


// Initialize Classes
let scroll = new Scroll('dev-mode');
const navbar = new Navbar(scroll);
const footer = new Footer(scroll);
let contactForm = new ContactForm('#contact-form');



// Create Flow & timeline
const flow = {};
let body, tl, slide;


// 1. Functions To Be Executed On Initial Page Load
flow.load = function({ next }) {

    // Initialize Navbar
    navbar.init(next.namespace);

    // Remove Preloader
    removePreloader(loadTimer, 1);

    // Initialize Smooth Scroll
    scroll.init(next.container);

    // Initialize Footer
    footer.init(next.container, next.namespace);
    
    // Update Variable Declarations
    body = $('body');
    tl = gsap.timeline();
    
};


// 2. Executes Before Transition
flow.before = function({ next }) {
    slide = $.html('<div class="page-transition-slide"><div class="preloader__content"><svg><use xlink:href="img/icons.svg#logo"></use></svg><span class="preloader__spinner"></span></div></div>');
    body.append(slide);
};


// 3. Content Leaving Transitions
flow.leave = function() {
    tl.to('.page-transition-slide', { duration: .5, y: 0 });
};


// 4. In Between Leaving & Entering Transition
flow.middle = async function({ next }) {

    // Delay
    await $.delay(500);

    // Switch Body Classes
    body.clearClassList();
    body.addClass(`${next.namespace}-page`);

    // Update Navbar
    navbar.update(next.namespace);

    // Close Navbar
    navbar.close();

    // Initialize New Contact Form
    contactForm = null;

    // Initialize Footer
    footer.update(next.container, next.namespace)

    // Shut Down Scroll Events
    scroll.shutDown();

    // Delay
    await $.delay(500);

};


// 5. Content Entering Transition
flow.enter = function() {
    tl.to('.page-transition-slide .preloader__content', { duration: .5, opacity: 0 });
    tl.to('.page-transition-slide', { duration: .5, y: '-100vh' });
};


// 6. Executes After Page Transition Is Complete
flow.after = async function({ next }) {
    scroll.reboot(next.container);
    contactForm = new ContactForm('#contact-form', next.container);
    scroll.toTop(250);
    await $.delay(1000);
    slide.remove();
    await $.delay(1000);
    scroll.update();
};


// Initialize Page With Barba JS
barba.init({
    transitions: [{
        once: flow.load,
        before: flow.before,
        leave: flow.leave,
        beforeEnter: flow.middle,
        enter: flow.enter,
        after: flow.after
    }],
    views: [
        {
            namespace: 'home',
            afterEnter() {
                navbar.reset();
                new DraggableSlider('.reviews__carousel', 'dragging').init();
                new Typewriter('#typewrite');
            }
        },
        {
            namespace: 'services',
            afterEnter: () => navbar.reset()
        },
        {
            namespace: 'about',
            afterEnter: () => navbar.reset()
        },
        {
            namespace: 'fleet',
            afterEnter: () => navbar.reset()
        },
        {
            namespace: 'login',
            afterEnter({next}) {
                navbar.applyTheme([
                    { brand: 'jet' }, { media: 'mobile', brand: 'white' }
                ]);
                navbar.forceLayout('tablet');
                new AuthForm({
                    selector: '#login-form',
                    container: next.container,
                    navbar,
                    barba
                });
            }
        },
        {
            namespace: 'account',
            afterEnter({next}) {
                
                const container = $(next.container);
                const text = container.children('#referral-link').text();
                const target = container.children('#qr-code').e()
                
                new QRCode(target, {
                    text,
                    width: 200,
                    height: 200,
                    colorDark: '#333333',
                    colorLight: '#ffffff',
                    correctLevel : QRCode.CorrectLevel.H
                });

                new DraggableSlider('.reviews__carousel', 'dragging').init();
            }
        }
    ]
});
