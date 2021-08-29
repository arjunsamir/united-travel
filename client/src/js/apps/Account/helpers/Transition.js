// Import Dependencies
import anime from 'animejs';

// Define Tranition Class
export default class Transition {

    constructor(dispatch) {

        // Create Dispatcher Reference
        this.setPage = (page) => dispatch({
            type: 'SET_PAGE',
            data: page
        }); 


        // Create View Dispatcher
        this.setView = (view) => dispatch({
            type: 'SET_VIEW',
            data: view
        });

        this.mounted = null;

        this.contentVisible = false;

    }

    set(container) {

        // Set Container
        this.container = $(container)

        return this.update();

    }

    update() {
        // Define Animation targets
        this.targets = this.container.children(".animate-item, .animate-children > *").e();

        // Return Instance
        return this;
    }


    async in(view) {

        if (!this.mounted) return this.mount(view);

        if (this.contentVisible) return;

        const tl = anime.timeline({
            easing: 'easeOutQuad',
            duration: 250
        });

        tl.add({
            targets: this.targets,
            translateY: [anime.stagger([100, 25]), 0],
            opacity: [0, 1],
            delay: anime.stagger([0, 250])
        });


        await tl.finished;

        this.contentVisible = true;

    }


    async out() {

        if (!this.contentVisible) return;

        const tl = anime.timeline({
            easing: 'easeOutQuad',
            duration: 250
        });

        tl.add({
            targets: this.targets,
            translateY: anime.stagger([-25, -100]),
            opacity: 0,
            delay: anime.stagger([0, 250])
        });

        await tl.finished;

        this.contentVisible = false;

    }

    async mount(view) {

        if (this.mounted === view) return this.in();

        const tl = anime.timeline({
            easing: 'easeOutQuad',
            duration: 250
        });

        tl.add({
            targets: this.container.children(".account__visual, .account__nav, .booking__map, .loader").e(),
            opacity: [0, 1],
            duration: 800
        })

        tl.add({
            targets: this.targets,
            translateY: [anime.stagger([100, 25]), 0],
            opacity: [0, 1],
            delay: anime.stagger([0, 250])
        });


        await tl.finished;

        this.mounted = view;
        this.contentVisible = true;
    }


    async unmount() {

        const tl = anime.timeline({
            easing: 'easeOutQuad',
            duration: 250
        });

        if (this.contentVisible) tl.add({
            targets: this.targets,
            translateY: anime.stagger([-25, -100]),
            opacity: 0,
            delay: anime.stagger([0, 250])
        });


        tl.add({
            targets: this.container.children(".account__visual, .account__nav, .booking__map, .loader").e(),
            opacity: 0,
            duration: 800
        })

        await tl.finished;

        this.contentVisible = false;

    }

    async changeView(view) {

        await this.unmount();

        this.setView(view);
        
    }

    async to(page, delay = 500) {

        await this.out();

        await $.delay(delay);

        this.setPage(page);

    }

}