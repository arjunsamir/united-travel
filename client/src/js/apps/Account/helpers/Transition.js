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


    }

    set(container) {

        // Set Container
        this.container = $(container)

        // Define Animation targets
        this.targets = this.container.children(".animate-item, .animate-children > *").e();

        // Return Instance
        return this;

    }


    async in() {

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

    }


    async out() {

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

    }

    async to(page, delay = 500) {

        await this.out();

        await $.delay(delay);

        this.setPage(page);

    }

}