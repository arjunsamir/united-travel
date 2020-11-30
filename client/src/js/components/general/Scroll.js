import LocomotiveScroll from 'locomotive-scroll';

export default class Scroll {

    constructor(page) {

        this.setInitialValues();

        this.page = page;

    }


    init(container) {

        this.locomotive = new LocomotiveScroll({
            el: container ?? this.page.elements.container,
            smooth: true,
            lerp: .2
        });

        // ~~ instead of Math.floor();
        this.locomotive.on('scroll', e => this.onScroll(~~e.scroll.y));

        // Set Position & Threshold
        this.position = this.locomotive.scroll.instance.scroll.y;
        this.threshold = this.anchor.top() - this.navbar.height();

    }


    setInitialValues() {
        this.navbar = $('#navbar');
        this.anchor = $('#navbar-collapse');
        this.hidden = false;
        this.opacity = 0;
        this.position = window.pageXOffset;
        this.threshold = 250;
    }

    pause() {
        this.locomotive.stop();
    }

    resume() {
        this.locomotive.start();
    }

    shutDown() {
        this.navbar.toggle('opaque', false);
        this.navbar.toggle('hidden', false);
        this.locomotive.stop();
        this.locomotive.destroy();
        $('.c-scrollbar').remove();
    }

    reboot(container) {
        this.setInitialValues();
        this.init(container);
    }

    update() {
        this.locomotive.update();
    }

    onScroll(y) {

        if (y === this.position) return;

        const opaque = y > this.threshold;
        const hide = opaque && y > this.position;
    
        if (hide && !this.hidden) {
            this.navbar.toggle('hidden', true);
            this.hidden = true;
        }

        else if (!hide && this.hidden) {
            this.navbar.toggle('hidden', false);
            this.hidden = false;
        }

        if (opaque && !this.opacity) {
            this.navbar.toggle('opaque', true);
            this.opacity = 1;
        }

        else if (!opaque && this.opacity) {
            this.navbar.toggle('opaque', false);
            this.opacity = 0;
        }

        this.position = y;

    }

    toTop(duration) {
        this.locomotive.scrollTo('top', 0, duration || 800);
    }

}