import anime from 'animejs';

export default class Navbar {

    constructor(page) {

        this.scroll = page.scroll;
        this.namespace = page.state.namespace;
        this.isOpen = false;
        this.main = $('#navbar');

        this.state = {
            menu: false,
            lang: false,
            user: false
        }

    }

    init() {

        this.loggedIn = !!window.currentUser._id;

        this.main.children('[data-nav-namespace]').forEach(l => {
            const link = $(l);
            const ns = link.data('navNamespace');
            link.removeClass('active');
            if (ns == this.namespace) console.log(link.addClass('active'));
        });

        // Update Selectors
        this.selectors = {
            account: `.navbar__profile.logged-${this.loggedIn ? "in" : "out"} .navbar__profile-menu`,
            lang: '.navbar__lang-menu'
        };

        // Handle Menu Open/Close
        this.main.children('.nb-clt').click(() => this.toggleDesktopMenu(this.selectors.account, 'user'));
        this.main.children('.nb-lng').click(() => this.toggleDesktopMenu(this.selectors.lang, 'lang'));
        this.escape = this.main.children('.nb-esc');
        this.escape.click(() => this.handleEscapeClick());

    }

    async handleEscapeClick() {
        if (this.state.user) this.toggleDesktopMenu(this.selectors.account, 'user');
        if (this.state.lang) this.toggleDesktopMenu(this.selectors.lang, 'lang');
    }

    async toggleDesktopMenu(selector, target) {

        // Close Menu
        const menu = this.main.children(selector);

        // Create Timeline
        const tl = anime.timeline({
            easing: 'easeOutQuad',
            duration: 250,
        });

        // Close Menu
        if (this.state[target]) {
            
            this.state[target] = false;
            this.escape.addClass('no-esc');

            tl.add({
                targets: menu.e(),
                opacity: [1, 0],
            });

            await tl.finished;

            menu.addClass('hidden');

            
        }

        // Open Menu
        else {

            await this.handleEscapeClick();

            menu.removeClass('hidden');
            this.state.user = true;
            this.escape.removeClass('no-esc');

            tl.add({
                targets: menu.e(),
                opacity: [0, 1],
            });

            await tl.finished;
        }

    }

    // toggleLangMenu() {
    //     const menu = this.main.children('.navbar__lang-menu');

    //     if (this.state.lang) {

    //         anime({
    //             targets: menu.e(),
    //             opacity: [1, 0],
    //             easing: 'easeOutQuad',
    //             duration: 250,
    //             complete: () => {
    //                 menu.addClass('hidden');
    //                 this.state.lang = false;
    //                 this.escape.addClass('no-esc');
    //             }
    //         });

    //     }
    //     else {

    //         this.handleEscapeClick();

    //         menu.removeClass('hidden');

    //         anime({
    //             targets: menu.e(),
    //             opacity: [0, 1],
    //             easing: 'easeOutQuad',
    //             duration: 250
    //         });
            
    //         this.state.lang = true;
    //         this.escape.removeClass('no-esc');
    //     }
    // }

    // toggleUserMenu() {

    //     const menu = this.main.children(`.navbar__profile.logged-${this.loggedIn ? "in" : "out"} .navbar__profile-menu`);

    //     // Close Menu
    //     if (this.state.user) {

    //         anime({
    //             targets: menu.e(),
    //             opacity: [1, 0],
    //             easing: 'easeOutQuad',
    //             duration: 250,
    //             complete: () => {
    //                 menu.addClass('hidden');
    //                 this.state.user = false;
    //                 this.escape.addClass('no-esc');
    //             }
    //         });

    //     }

    //     // Open Menu
    //     else {

    //         this.handleEscapeClick();
            
    //         menu.removeClass('hidden');

    //         anime({
    //             targets: menu.e(),
    //             opacity: [0, 1],
    //             easing: 'easeOutQuad',
    //             duration: 250
    //         });
            
    //         this.state.user = true;
    //         this.escape.removeClass('no-esc');
    //     }

    // }

    destroy() {
        this.main.kill();
    }

}
