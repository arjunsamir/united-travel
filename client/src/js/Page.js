// Import Components
import Preloader from './components/general/Preloader';
import Scroll from './components/general/Scroll';
import Navbar from './components/general/Navbar';
import Footer from './components/general/Footer';
import Typewriter from './components/general/Typewriter';
import DraggableSlider from './components/general/DraggableSlider';
import ContactForm from './components/general/ContactForm';


const componentsRegistry = {
    Typewriter: d => new Typewriter(d),
    DraggableSlider: d => new DraggableSlider(d),
    ContactForm: d => new ContactForm(d),
    Footer: d => new Footer(d)
}


// Create Page Class
export default class Page {

    constructor(props) {

        this.options = {
            smoothScroll: props.smoothScroll ?? true
        }

        this.elements = {
            container: props.container ?? $('main').e(),
            body: $('body')
        }

        this.state = {
            namespace: this.elements.container.dataset.barbaNamespace,
            isMobile: null,
            menuIsOpen: false,
            initialPage: props.initialPage ?? false,
            url: window.location.href
        }

        this.components = {
            registrar: [],
            mounted: {}
        };

        this.barba = props.barba;

    }


    afterLoad() {



    }


    init() {

        // Update URL
        this.state.url = this.barba.url.clean();


        if (this.state.initialPage) {

            // 1. Create Preloader
            const preloader = new Preloader();

            // 1. Subscribe to Preloader Events
            preloader.subscribe('after', () => this.start());
    
            // 2. Initialize Preloader
            preloader.init();

        }

        // Initialize Crucial Modules
        this.scroll = new Scroll(this);
        this.navbar = new Navbar(this.scroll);

        return this;

    }


    freeze() {

        return new Promise(resolve => {

            this.scroll.pause();

            resolve();

        })

    }


    destroy() {

    }


    refresh(next) {

        this.destroy();

        return new Page({ container: next.container });

    }


    start() {

        this.scroll.init();
        this.navbar.init(this.state.namespace);

        // Mount Remaining Components
        this.mountComponents();
        
    }


    insertSlide() {
        this.elements.slide = $.html('<div class="page-transition-slide"><div class="preloader__content"><svg><use xlink:href="img/icons.svg#logo"></use></svg><span class="preloader__spinner"></span></div></div>');
        this.elements.body.append(this.elements.slide);
    }


    addComponent(...components) {

        components.forEach(c => {
            this.components.registrar.push({ name: c.name, data: c.data });
            this.components.mounted[c.name] = componentsRegistry[c.name](c.data);
        });

        console.log(this.components);
    }

    mountComponents() {

        this.components.registrar.forEach(component => {
            this.components.mounted[component.name].init();
        })
    }

}