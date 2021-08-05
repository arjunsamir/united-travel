// Import Components
import Scroll from './Scroll';
import Navbar from './Navbar';
import Typewriter from './Typewriter';

// Import Apps
// import BookingApp from '../BookingApp';


const componentsRegistry = {
    Typewriter: (dta, ctn) => new Typewriter(dta ?? '#typewrite', ctn),
    // BookingApp: (dta, ctn) => new BookingApp(dta, ctn)
}


// Create Page Class
export default class Page {

    constructor({ barba, smoothScroll, container }) {

        this.options = {
            smoothScroll: smoothScroll ?? true
        }

        this.elements = {
            container: container ?? $('main').e(),
            body: $('body')
        }

        this.state = {
            namespace: this.elements.container.dataset.barbaNamespace,
            isMobile: null,
            menuIsOpen: false,
            url: barba.url.clean() ?? window.location.href
        }

        this.components = {
            registrar: [],
            mounted: {}
        };

        this.barba = barba;

    }


    init() {

        // Add Namespace Class to body
        this.elements.body.addClass(`${this.state.namespace}-page`);

        // Initialize Crucial Modules
        this.scroll = new Scroll(this);
        this.navbar = new Navbar(this);

        // Return Class Instance
        return this;

    }


    async destroy() {

        // Hide Page
        $(this.elements.container).css({ display: 'none' });

        // Remove Page Class From Body
        this.elements.body.removeClass(Array.from(this.elements.body.e().classList).filter(name => name.includes('page')).join(' '));

        // Add Fixed Class
        this.elements.body.addClass('fixed');

        // Destroy Scroll Instance
        this.scroll.destroy();

        // Return From Async Function
        return;

    }


    start() {

        this.scroll.init();
        this.navbar.init();

        // Mount Remaining Components
        this.components.registrar.forEach(component => {
            this.components.mounted[component.name].init();
        });
        
    }


    addComponent(...components) {

        components.forEach(component => {

            const comp = typeof component == 'string' ? { name: component } : component;
            
            this.components.registrar.push({ name: comp.name, data: comp.data });
            this.components.mounted[comp.name] = componentsRegistry[comp.name](comp.data, this.elements.container);

            if (this.components.mounted[comp.name].load) this.components.mounted[comp.name].load();

        });

    }



}