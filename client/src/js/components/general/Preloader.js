import gsap from 'gsap';

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
        const tl = gsap.timeline(gsapDefaults);


        // 3. Add Load Complete Class
        this.preloader.addClass('load-complete');

        // 4. Fade Out Logo
        tl.to(this.preloader.children('.preloader__content').e(), { opacity: 0, duration: .75, delay: .5 });

        // 5. Fade Out Preloader
        tl.to(this.preloader.e(), { opacity: 0, duration: .5 });

        // 6. Subscribe To Completed Animation Callback
        tl.eventCallback('onComplete', () => this.onComplete());

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