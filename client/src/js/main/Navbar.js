import anime from 'animejs';

import axios from 'axios';

export default class Navbar {

    constructor(page) {

        this.scroll = page.scroll;
        this.namespace = page.state.namespace;
        this.main = $('#navbar');
        this.menu = $('#nav-menu');

        this.state = {
            menu: false,
            lang: false,
            user: false,
            isAnimating: false
        }

    }

    init() {

        this.loggedIn = !!window.currentUser._id;

        this.main.children('[data-nav-namespace]').concat(this.menu.children('[data-nav-namespace]')).forEach(l => {
            const link = $(l);
            const ns = link.data('navNamespace');
            link.removeClass('active');
            if (ns == this.namespace) link.addClass('active');
        });

        // Update Selectors
        this.selectors = {
            account: `.navbar__profile .navbar__profile-menu`,
            lang: '.navbar__lang-menu'
        };

        // Handle Menu Open/Close
        this.menuBtn = this.main.children('.navbar__min');
        this.menuBtn.click(() => this.toggleMenu());
        this.main.children('.nb-clt').click(() => this.toggleDesktopMenu(this.selectors.account, 'user'));
        this.main.children('.nb-lng').click(() => this.toggleDesktopMenu(this.selectors.lang, 'lang'));
        this.escape = this.main.children('.nb-esc');
        this.escape.click(() => this.handleEscapeClick());
        
        // Update Active Language
        this.main.children('.navbar__lang-menu li').concat(this.menu.children('.nav-menu__lang li')).forEach(l => {
            const link = $(l);
            const lang = link.data('navLang');
            // if (lang == window.locale) link.addClass('active');
            link.click(() => this.changeLocale(lang));
        });

        
    }

    changeLocale(lang) {

        if (lang == window.locale) return this.toggleDesktopMenu(this.selectors.lang, 'lang');

        const path = window.location.pathname.split('/');
        const { origin, search } = window.location;

        if (lang === 'en') {
            path.splice(1, 1)
        }

        else if (lang === 'es') {
            path.splice(1, 0, 'es');
        }

        window.location.href = `${origin}${path.join('/')}${search}`

    }

    async handleEscapeClick(animate = true) {
        if (this.state.user) this.toggleDesktopMenu(this.selectors.account, 'user', animate);
        if (this.state.lang) this.toggleDesktopMenu(this.selectors.lang, 'lang', animate);
    }

    async toggleDesktopMenu(selector, target, animate = true) {

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

            if (animate) {
                tl.add({
                    targets: menu.e(),
                    opacity: [1, 0],
                });

                await tl.finished;
            }

            else {
                anime.set(menu.e(), {
                    opacity: 0
                });
            }

            menu.addClass('hidden');

            
        }

        // Open Menu
        else {

            await this.handleEscapeClick();

            menu.removeClass('hidden');
            this.state[target] = true;
            this.escape.removeClass('no-esc');

            if (animate) {
                tl.add({
                    targets: menu.e(),
                    opacity: [0, 1],
                });

                await tl.finished;
            }
            else {
                anime.set(menu.e(), {
                    opacity: 1
                });
            }
        }

    }

    async closeMenu() {
        if (this.state.menu) await this.toggleMenu();
    }

    async toggleMenu() {

        // Prevent Double Click
        if (this.state.isAnimating) return;
        this.state.isAnimating = true;

        // Pause Scroll
        this.scroll.pause();

        // Select Elements
        const desktop = this.menu.children('.nav-menu__desktop');
        const mobile = this.menu.children('.nav-menu__mobile');

        // Get Styles
        const styles = {
            desktop: window.getComputedStyle(desktop.e()).getPropertyValue('display'),
            mobile: window.getComputedStyle(mobile.e()).getPropertyValue('display')
        }

        // Determine Which Menu To Open
        const isDesktop = styles.desktop !== 'none';

        // Define Variables
        let targets;

        // Cretate Timeline
        const tl = anime.timeline({
            easing: 'easeOutQuad'
        });

        // Assign Desktop Targets
        if (isDesktop) {

            const ref = desktop.children(".user-acct");

            ref.children('*').clearInlineStyles();

            targets = {
                bg: ref.children(".user-acct__bg").e(),
                content: ref.children(".user-acct__content").e(),
                photo: ref.children(".user-acct__bg, .user-acct__photo, .user-acct__icon").e(),
                brand: desktop.children('.nav-menu__brand').e(),
                lines: this.menuBtn.children('span').e()
            }

        }

        // Open The Menu
        if (!this.state.menu) {

            // Animate Menu Icon
            tl.add({
                targets: targets.lines[0],
                translateY: [0, 4],
                duration: 200
            })
            
            tl.add({
                targets: targets.lines[1],
                translateY: [0, -5],
                duration: 200
            }, '-=200');
            
            tl.add({
                targets: targets.lines[0],
                rotate: [0, '45deg'],
                duration: 200
            })
            
            tl.add({
                targets: targets.lines[1],
                rotate: [0, '-45deg'],
                duration: 200
            }, '-=200');

            // Open Desktop Menu
            if (isDesktop) {

                // Hide Menu
                this.menu.removeClass('hidden');

                tl.add({
                    targets: this.menu.children(".nav-menu__bg").e(),
                    scale: [1, 200],
                    diration: 1200
                }, '-=400');

                tl.add({
                    targets: desktop.children('.nav-menu__image').e(),
                    opacity: [0, 1],
                    duration: 250
                }, "-=300")

                tl.add({
                    targets: desktop.children('.nav-menu__image img').e(),
                    scale: [1.2, 1],
                    duration: 900
                }, "-=250");

                tl.add({
                    targets: targets.photo,
                    scale: [0, 1],
                    duration: 250
                }, "-=900");

                tl.add({
                    targets: targets.bg,
                    width: ['10.4rem', '100%'],
                    opacity: [0, 1],
                    duration: 350
                }, "-=450")

                tl.add({
                    targets: targets.content,
                    opacity: [0, 1],
                    translateY: [15, 0],
                    duration: 250
                })

                tl.add({
                    targets: targets.brand,
                    opacity: [0, 1],
                    duration: 250
                }, "-=250")

                tl.add({
                    targets: desktop.children(".animate-item").e(),
                    translateY: [anime.stagger([100, 25]), 0],
                    opacity: [0, 1],
                    delay: anime.stagger([0, 250]),
                    duration: 250
                }, "-=600");


            }

            // Open Mobile Menu
            else {
                
            }

            // Wait for Animations to complete
            await tl.finished;

            // Update Menu State
            this.state.menu = true;

        }

        // Close The Menu
        else {

            // Animate Menu Icon
            tl.add({
                targets: targets.lines[0],
                rotate: 0,
                duration: 200
            })
            
            tl.add({
                targets: targets.lines[1],
                rotate: 0,
                duration: 200
            }, '-=200');
            
            tl.add({
                targets: targets.lines[0],
                translateY: 0,
                duration: 200
            })
            
            tl.add({
                targets: targets.lines[1],
                translateY: 0,
                duration: 200
            }, '-=200');
            
            
            // Close Desktop Menu
            if (isDesktop) {

                tl.add({
                    targets: targets.brand,
                    opacity: 0,
                    duration: 250
                }, "-=400")

                tl.add({
                    targets: targets.content,
                    opacity: 0,
                    translateY: 15,
                    duration: 250
                }, '-=250')

                tl.add({
                    targets: targets.bg,
                    width: '10.4rem',
                    duration: 300
                })

                tl.add({
                    targets: targets.photo,
                    scale: 0,
                    duration: 250
                });

                tl.add({
                    targets: desktop.children('.nav-menu__image img').e(),
                    scale: 1.2,
                    duration: 900
                }, "-=500");

                tl.add({
                    targets: desktop.children('.nav-menu__image').e(),
                    opacity: 0,
                    duration: 250
                }, "-=500")

                tl.add({
                    targets: desktop.children(".animate-item").e(),
                    translateY: anime.stagger([-25, -100]),
                    opacity: 0,
                    delay: anime.stagger([0, 250]),
                    duration: 250
                }, "-=1000");

                tl.add({
                    targets: this.menu.children(".nav-menu__bg").e(),
                    scale: 1,
                    diration: 800,
                    easing: 'easeInQuad'
                }, '-=400');

            }

            // Close Mobile Menu
            else {}

            // Wait for Animations to complete
            await tl.finished;

            // Update Menu State
            this.state.menu = false;

            // Hide Menu
            this.menu.addClass('hidden');

        }

        this.state.isAnimating = false;

        // Resume Scroll
        this.scroll.resume();
            
    }

    applyView(view) {
        this.main.removeClass("full min")
        this.main.addClass(view);
    }

    async refresh() {

        // Make Request
        const res = await axios('/book');
        const { data } = res;

        // Parse Elements
        const nav = $.html(data.split("<!--NBCTN-->")[1]);
        const navbarItems = nav.children("#navbar > *");
        const menuItems = nav.children("#nav-menu > *");

        // Update Elements
        this.main.clear().append(navbarItems);
        this.menu.clear().append(menuItems);

    }

    destroy() {
        this.handleEscapeClick(false);
        this.main.kill();
    }

}
