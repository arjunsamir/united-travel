//import { dream as $ } from '../vendor/Dreams';


export default class Navbar {

    constructor(scroll) {

        this.main = $('#navbar');
        this.links = this.main.children('a[href]');

        this.userElems = {
            pics: this.main.children('.navbar-profile-pic'),
            name: this.main.children('.navbar-user-name'),
            email: this.main.children('.navbar-user-email')
        };

        this.toggle = $('#nav-toggle');
        this.checkbox = this.toggle.nodes();
        this.icon = $('#nav-icon'); 
        this.branding = $('#nav-brand');

        this.scroll = scroll;

        this.isOpen = false;

    }

    init(namespace) {

        this.toggle.on('change', e => this.toggleDrawer(e.target.checked));

        this.namespace = namespace;
        this.setActive();

        this.links.children().css({'pointer-events': 'none'})
        this.links.prevent('click', e => {
            const page = this.namespace === 'home' ? '' : this.namespace;
            const target = e.target.href.split('/')[3];
            if (target === page) this.scroll.toTop();
        });

    }

    open() {
        if (this.isOpen) return;
        this.checkbox.checked = true;
        this.toggleDrawer(true);
    }


    async close() {
        if (!this.isOpen) return;
        this.checkbox.checked = false;
        this.toggleDrawer(false);
    }

    
    toggleDrawer(open) {
        if (open) {
            this.branding.hide();
            this.scroll.pause();
        }

        else {
            this.branding.show();
            this.scroll.resume();
        }

        this.icon.toggle('open', open);
        
        this.isOpen = open;
    }


    update(namespace) {
        this.namespace = namespace;
        this.setActive();
    }

    setActive() {

        this.links.removeClass('active');

        this.links.forEach(link => {
            if (link.href.split('/')[3] === this.namespace) link.classList.add('active');
        });

    }


    applyThemeChange(themes) {

        const navbar = this.main.e();

        themes.forEach(theme => {

            const media = theme.media || 'default'

            navbar.style.setProperty(`--color-brand-${media}`, `var(--${theme.brand || 'white'})`);
            navbar.style.setProperty(`--color-links-${media}`, `var(--${theme.text || 'white'})`);

        });

    }


    applyTheme(themes) {
        this.resetTheme()
        this.applyThemeChange(themes);
    }


    forceLayout(device) {
        this.resetLayout();
        this.main.addClass(`${device || 'mobile'}-layout`);
    }


    resetLayout() {
        this.main.removeClass('mobile-layout tablet-layout');
    }


    resetTheme() {
        this.applyThemeChange([
            {}, { media: 'dark' },
            { media: 'tablet', brand: 'color-brand-default', text: 'color-links-default' },
            { media: 'mobile', brand: 'color-brand-tablet', text: 'color-links-tablet' }
        ]);
    }


    reset() {
        this.resetTheme();
        this.resetLayout();
    }

    login(user) {

        // Update Navbar Information
        this.userElems.pics.set('src', user.photo);
        this.userElems.name.text(user.name);
        this.userElems.email.text(user.email);

        // Set Logged In State
        this.main.addClass('logged-in');

    }

    logout() {

        // Unset Logged In State Class
        this.main.removeClass('logged-in');

        // Update Navbar Information
        this.userElems.pics.set('src', '');
        this.userElems.name.text('United Travel');
        this.userElems.email.text('hello@unitedtravelflorida.com');

    }

}
