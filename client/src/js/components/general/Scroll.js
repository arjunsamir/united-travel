import LocomotiveScroll from 'locomotive-scroll';


export default class Scroll {

    constructor(page) {

        const isMac = navigator.platform.toUpperCase().indexOf('MAC')>=0;
        const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

        this.scrollMultiplier = isMac && isFirefox ? 4.8 : 1.2;
        this.smoothScrollMultiplier = .25;
        this.scrollEase = [0.00, 0.28, 1.00, 0.69];
        this.lerp = .2;

        this.page = page;

    }


    setValues() {

        // Define Initial Values
        this.navbar = $('#navbar');
        this.anchor = $('#navbar-collapse');
        this.hidden = false;
        this.opacity = 0;
        this.position = window.pageXOffset;
        this.threshold = 250;

        this.limits = {
            top: 0,
            bottom: this.locomotive.scroll.instance.limit
        }

    }
    

    init(container) {

        // Define Elements
        this.body = $('body');
        this.container = container ?? $('main').e();


        // Define Links
        this.links = $(this.container).children('a[href]').concat($('#navbar a').kill());
        

        // Attach Scroll Events
        this.attachEvents();
        this.locomotive.on('scroll', e => this.onScroll(~~e.scroll.y));


        // Set Initial Values
        this.setValues();


        // Update Values
        this.position = this.locomotive.scroll.instance.scroll.y;
        this.threshold = this.anchor.top() - this.navbar.height();


        // Determine If Mobile
        this.isMobile = this.locomotive.scroll.isMobile;


        // Remove Fixed Class If Mobile
        if (this.isMobile) this.body.removeClass('fixed');


    }


    refresh(container) {

        this.locomotive.destroy();

        this.init(container);

    }


    attachEvents() {

        // Create New Locomotive Scroll Instance
        this.locomotive = new LocomotiveScroll({
            el: this.container,
            smooth: true,
            multiplier: this.scrollMultiplier,
            lerp: this.lerp,
            scrollFromAnywhere: true
        });


        // Filter Out Relative Links
        this.links.filter(link => {

            if (this.page.state.url == link.href) return link;
            else if (link.href.includes('#') && !link.href.split('#')[1]) return link;
            else return null;

        });

        this.links.prevent('click', e => {
            console.log(e);
        })

        console.log(this.links);
        

        // Attach Scroll Event Listeners
        // this.links.filter(link => link.href.includes('#')).prevent('click', e => {

        //     const href = e.target.closest('a').href.split('#')[1];
        //     const target = href ? `#${href}` : 'top';

        //     // const currentPosition = this.locomotive.scroll.instance.scroll.y;
        //     // const targetPosition = href ? $(target).position().top : 0;
        //     // const delta = Math.abs(currentPosition - targetPosition);
        //     // const duration = Math.floor(delta * this.smoothScrollMultiplier);

        //     // this.page.navbar.close(200).then(() => this.to(target, duration));
            
        //     this.to(target);
        // });

 
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


    update() {
        this.locomotive.update();
    }


    pause() {
        this.locomotive.stop();
        if (this.isMobile) this.body.addClass('fixed');
    }

    resume() {
        this.locomotive.start();
        if (this.isMobile) this.body.removeClass('fixed');
    }


    async to(target, options, callback) {

        let t = target;
        let duration = options.duration ?? 1000;
        const easing = this.scrollEase;
        const offset = options.offset ?? 0;

        if (typeof t == 'string') {

            if (t === 'top') t = 0;
            else if (t === 'bottom') t = this.limits.bottom;
            else t = $(t).position().top ?? 0;

        }

        else if (typeof t == 'object') {
            if ($.dreaming(t)) t = t.position().top;
            else t = $(t).position().top;
        }

        else if (typeof t == 'number') {
            if (t < 0) t = 0;
            else if (t > this.limits.bottom) t = this.limits.bottom;
        }

        duration = Math.floor(Math.abs(this.position - t) * this.smoothScrollMultiplier) ?? 1000;

        await this.page.navbar.close();

        this.locomotive.scrollTo(t, { offset, duration, easing, callback });

        await $.delay(duration);

        return 'Scrolling Complete';

    }

}



// class ScrollyBitch {

//     constructor(page) {

//         this.setInitialValues();

//         this.page = page;

//     }


//     init(container) {

//         this.locomotive = new LocomotiveScroll({
//             el: container ?? this.page.elements.container,
//             smooth: true,
//             lerp: .2
//         });

//         // ~~ instead of Math.floor();
//         this.locomotive.on('scroll', e => this.onScroll(~~e.scroll.y));

//         // Set Position & Threshold
//         this.position = this.locomotive.scroll.instance.scroll.y;
//         this.threshold = this.anchor.top() - this.navbar.height();

//     }


//     setInitialValues() {
//         this.navbar = $('#navbar');
//         this.anchor = $('#navbar-collapse');
//         this.hidden = false;
//         this.opacity = 0;
//         this.position = window.pageXOffset;
//         this.threshold = 250;
//     }

//     pause() {
//         this.locomotive.stop();
//     }

//     resume() {
//         this.locomotive.start();
//     }

//     shutDown() {
//         this.navbar.toggle('opaque', false);
//         this.navbar.toggle('hidden', false);
//         this.locomotive.stop();
//         this.locomotive.destroy();
//         $('.c-scrollbar').remove();
//     }

//     reboot(container) {
//         this.setInitialValues();
//         this.init(container);
//     }

//     update() {
//         this.locomotive.update();
//     }

//     onScroll(y) {

//         if (y === this.position) return;

//         const opaque = y > this.threshold;
//         const hide = opaque && y > this.position;
    
//         if (hide && !this.hidden) {
//             this.navbar.toggle('hidden', true);
//             this.hidden = true;
//         }

//         else if (!hide && this.hidden) {
//             this.navbar.toggle('hidden', false);
//             this.hidden = false;
//         }

//         if (opaque && !this.opacity) {
//             this.navbar.toggle('opaque', true);
//             this.opacity = 1;
//         }

//         else if (!opaque && this.opacity) {
//             this.navbar.toggle('opaque', false);
//             this.opacity = 0;
//         }

//         this.position = y;

//     }

//     toTop(duration) {
//         this.locomotive.scrollTo('top', 0, duration || 800);
//     }

// }
