import anime from 'animejs';

export default class Preloader {

    constructor() {

        this.pageState = 'loading';

        this.callbacks = [];

        this.preloader = $('#preloader');

    }

    init() {

        $(document).on('readystatechange', () => {
            this.pageState = document.readyState;
            if (this.pageState == 'complete') this.onPageLoad();
        });

        return this;

    }


    onPageLoad() {

        // 1. Fire Before Events
        this.fire('before');

        // 2. Create Timeline 
        const tl = anime.timeline({
            easing: 'easeOutQuad'
        });

        // 4. Fade Out Logo
        tl.add({
            targets: this.preloader.children('.preloader__content').e(),
            opacity: 0,
            delay: 0.5,
            duration: 750
        });

        // 5. Fade Out Preloader
        tl.add({
            targets: this.preloader.e(),
            // opacity: 0,
            translateY: '100%',
            duration: 1000,
            delay: 250
        });

        // 6. Subscribe To Completed Animation Callback
        tl.finished.then(() => this.onComplete());

    }


    onComplete() {


        // 1. Execute Callback Functions
        this.fire('after');

        // 2. Remove Preloader Element
        $.delay(500).then(() => {
            if (this.preloader) this.preloader.remove();
            this.preloader = null;
        });


    }

    subscribe(event, callback) {
        this.callbacks.push({ event, callback })
    }

    fire(event) {
        this.callbacks.forEach(item => {
            if (item.event === event) item.callback();
        });
    }

    after(callback) {
        this.subscribe('after', callback);
        return this;
    }

}