import anime from 'animejs';

export default class Transition {
    
    // Create Dispatcher
    constructor(dispatcher) {
        
        this.setStep = (step) => dispatcher("STEP", step);

    }


    set(container) {

        this.container = $(container);
        this.navbar = this.container.children(".animate-fade").e();
        this.targets = this.container.children(".animate-item").e();

    }


    async to(step, delay = 500) {

        await this.out();

        await $.delay(delay);

        this.setStep(step);

    }
    
    in() {

        // Create Timeline
        const tl = anime.timeline({
            easing: 'easeInOutQuad',
            duration: 250
        });


        // Add Default Animation
        tl.add({
            targets: this.targets,
            translateY: [anime.stagger([100, 25]), 0],
            opacity: [0, 1],
            delay: anime.stagger([0, 250])
        });

        // Fade Out Navbar
        tl.add({
            targets: this.navbar,
            opacity: [0, 1],
            delay: anime.stagger([0, 150])
        })

        // Return Promise to be awaited
        return tl.finished;

    }

    out() {

        // Create Timeline
        const tl = anime.timeline({
            easing: 'easeInOutQuad',
            duration: 250
        });


        // Fade In Navbar
        tl.add({
            targets: this.navbar,
            opacity: [1, 0],
            delay: anime.stagger([0, 150])
        })


        // Add Default Animation
        tl.add({
            targets: this.targets,
            translateY: anime.stagger([-25, -100]),
            opacity: 0,
            delay: anime.stagger([0, 250])
        }, '-=250');


        // Return Promise to be awaited
        return tl.finished;

    }

}