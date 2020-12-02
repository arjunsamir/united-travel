export default class Footer {

    constructor(page) {

        this.page = page;

        console.log(this);
        
    }

    init() {
        
        this.namespace = this.page.state.namespace;
        this.links = $(this.page.elements.container).children('.footer__nav a');

        this.attachListeners();
    }

    // selectElements(container) {
    //     this.container = container ? $(container).children('footer.footer') : $('footer.footer');
    //     this.links = this.container.children('.footer__nav a');
    // }

    attachListeners() {

        this.links.children().css({ 'pointer-events': 'none' });
        this.links.prevent('click', e => {
            const page = this.namespace === 'home' ? '' : this.namespace;
            const target = e.target.href.split('/')[3];
            if (target === page) this.scroll.toTop();
        });
    }

}