// Import Components
import Preloader from './components/general/Preloader';
import Scroll from './components/general/Scroll';
import Navbar from './components/general/Navbar';
import Footer from './components/general/Footer';


const components = {
    scroll: opts => new Scroll(opts)
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
            initialPage: props.initialPage ?? false
        }

        this.components = [];

    }


    afterLoad() {



    }


    init() {

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
        this.footer = new Footer(this.scroll);

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
        this.footer.init(this.elements.container, this.state.namespace);
        
    }

    insertSlide() {
        this.elements.slide = $.html('<div class="page-transition-slide"><div class="preloader__content"><svg><use xlink:href="img/icons.svg#logo"></use></svg><span class="preloader__spinner"></span></div></div>');
        this.elements.body.append(this.elements.slide);
    }



}