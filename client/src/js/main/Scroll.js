import LocomotiveScroll from 'locomotive-scroll';

export default class Scroll {

    constructor(page) {

        const isMac = navigator.platform.toUpperCase().indexOf('MAC')>=0;
        const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

        this.scrollMultiplier = isMac && isFirefox ? 1.6 : 1.2;
        this.smoothScrollMultiplier = .18;
        this.scrollEase = [0.00, 0.28, 1.00, 0.69];
        this.lerp = .2;

        this.page = page;

    }
    

    init() {

        // Define Elements
        this.body = this.page.elements.body;
        this.container = this.page.elements.container;
        

        // Attach Scroll Events
        this.attachEvents();
        this.locomotive.on('scroll', e => this.onScroll(~~e.scroll.y));


        // Define Initial Values
        this.hidden = false;
        this.opacity = 0;
        this.position = window.pageXOffset;


        // Define Scroll Limits
        this.limits = {
            top: 0,
            bottom: this.locomotive?.scroll?.instance?.limit || document.body.scrollHeight
        }


        // Update Values
        this.position = this.locomotive.scroll.instance.scroll.y;


        // Determine If Mobile
        this.isMobile = this.page.state.isMobile = this.locomotive.scroll.isMobile;


        // Remove Fixed Class If Mobile
        if (this.isMobile || !this.page.options.smooth) this.body.removeClass('fixed');


    }


    destroy() {
        this.locomotive.destroy();
    }


    attachEvents() {

        // Create New Locomotive Scroll Instance
        this.locomotive = new LocomotiveScroll({
            el: this.container,
            smooth: this.page.options.smooth,
            multiplier: this.scrollMultiplier,
            lerp: this.lerp,
            scrollFromAnywhere: true
        });

        // Define Links
        this.links = $(this.container).children('a[href]').concat($('#navbar a, #nav-menu a').kill());


        // Filter Out Relative Links
        this.links.filter(link => {

            // Remove Prevent Class From All Links
            link.classList.remove('prevent');

            // Get Href and strip off ending Slash
            let href = link.href;
            if (href.endsWith('/')) href = href.slice(0, -1);

            // Determine if href matches url
            const match = {
                exact: this.page.state.url == href,
                hash: href.includes('#') && !href.split('#')[1]
            }

            // If There is no match then filter out link
            if (!match.exact && !match.hash) return null;

            // Add Prevent class to remaining links
            link.classList.add('prevent');


            // Add Event Listener To Link
            link.addEventListener('click', async (e) => {
                e.preventDefault();
                this.to('top');
            })

            // Return Link To Filtered array
            return link;

        });


    }


    onScroll(y) {

        if (y === this.position) return;

        this.position = y;

    }


    update() {
        this.locomotive && this.locomotive.update();

        this.limits = {
            top: 0,
            bottom: this.locomotive?.scroll?.instance?.limit || document.body.scrollHeight
        }

        return this;
    }


    pause() {
        this.locomotive.stop();
        // if (this.isMobile) this.body.addClass('fixed');
    }


    resume() {
        this.locomotive.start();
        if (this.isMobile) this.body.removeClass('fixed');
    }


    async to(target, options = {}, callback) {

        let t = target;
        let duration = options.duration ?? 1000;
        //const easing = this.scrollEase;
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

        await this.page.navbar.closeMenu();
        
        if (!!this.locomotive) this.locomotive.scrollTo(t, { offset, duration, callback });
        else window.scrollTo(0, t)

        await $.delay(duration);

        return 'Scrolling Complete';

    }

}