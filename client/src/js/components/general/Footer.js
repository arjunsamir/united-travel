export default class Footer {

    constructor(scroll) {

        this.scroll = scroll;
        
    }

    init(container, namespace) {
        this.namespace = namespace;
        this.selectElements(container);
        this.attachListeners();
    }

    update(container, namespace) {
        this.init(container, namespace);
    }

    selectElements(container) {
        this.container = container ? $(container).children('footer.footer') : $('footer.footer');
        this.links = this.container.children('.footer__nav a');
    }

    attachListeners() {

        this.links.children().css({ 'pointer-events': 'none' });
        this.links.prevent('click', e => {
            const page = this.namespace === 'home' ? '' : this.namespace;
            const target = e.target.href.split('/')[3];
            if (target === page) this.scroll.toTop();
        });
    }

}