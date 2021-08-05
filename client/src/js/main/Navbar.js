export default class Navbar {

    constructor(page) {

        // this.scroll = page.scroll;
        // this.namespace = page.state.namespace;

        // this.isOpen = false;

        // // Define Main Elements
        // this.main = $('#navbar');
        // this.links = this.main.children('a[href]');

        // // Define User Elements
        // this.userElems = {
        //     pics: this.main.children('.navbar-profile-pic'),
        //     name: this.main.children('.navbar-user-name'),
        //     email: this.main.children('.navbar-user-email')
        // };

        // // Define Navbar Elements
        // this.toggle = $('#nav-toggle');
        // this.checkbox = this.toggle.nodes();
        // this.icon = $('#nav-icon'); 
        // this.branding = $('#nav-brand');

        // this.links.forEach(link => {

        //     link.classList.remove('active');

        //     const ns = link.dataset.navNamespace;

        //     if (ns && ns == this.namespace) link.classList.add('active');

        // });

        // this.reset();

    }

    init() {

        // this.links = this.main.children('a[href]');

        // // Attach Event Listener For Navigation Toggle
        // this.toggle.on('change', e => this.toggleDrawer(e.target.checked));

    }

    open() {
        // if (this.isOpen) return;
        // this.checkbox.checked = true;
        // this.toggleDrawer(true);
    }


    async close() {
        // if (!this.isOpen) return;
        // this.checkbox.checked = false;
        // this.toggleDrawer(false);
    }

    
    toggleDrawer(open) {
        // if (open) {
        //     this.branding.hide();
        //     this.scroll.pause();
        // }

        // else {
        //     this.branding.show();
        //     this.scroll.resume();
        // }

        // this.icon.toggle('open', open);
        
        // this.isOpen = open;
    }


    applyThemeChange(themes) {

    }


    applyTheme(themes) {
    }


    forceLayout(device) {
    }


    resetLayout() {

    }


    resetTheme() {

    }


    reset() {

    }

    login(user) {

    }

    logout() {

    }

}
