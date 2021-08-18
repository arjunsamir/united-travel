import anime from 'animejs';

// Define Animations
const animations = {

    async card(container, direction, delay) {

        const targets = container.children(".animate-item").e();
        const navbar = container.children(".animate-fade").e();

        const tl = anime.timeline({
            easing: 'easeInOutQuad',
            duration: 250
        });

        // Card Enter Animation
        if (direction === 'in' || direction === 'enter') {

            if (direction === 'enter') {
                tl.add({
                    targets: container.e(),
                    translateX: [-1000, 0],
                    duration: 750
                })
            }

            tl.add({
                targets: targets,
                translateY: [anime.stagger([100, 25]), 0],
                opacity: [0, 1],
                delay: anime.stagger([0, 250])
            });
    
            // Fade Out Navbar
            tl.add({
                targets: navbar,
                opacity: [0, 1],
                delay: anime.stagger([0, 150])
            })
        }
        
        else {
            // Fade Out Navbar
            tl.add({
                targets: navbar,
                opacity: [1, 0],
                delay: anime.stagger([0, 150])
            })


            // Add Default Animation
            tl.add({
                targets: targets,
                translateY: anime.stagger([-25, -100]),
                opacity: 0,
                delay: anime.stagger([0, 250])
            }, '-=250');


            // Fade Out Card On Exit
            if (direction === 'exit') {
                tl.add({
                    targets: container.e(),
                    translateX: [0, -1000],
                    duration: 750
                })
            }
        }

        tl.pause();

        await $.delay(delay);

        tl.play();

        await tl.finished;

    },
    async view(container, direction, delay) {

        const targets = container.children(".animate-item, .animate-children > *").e();

        const tl = anime.timeline({
            easing: 'easeInOutQuad',
            duration: 250
        });

        if (direction === 'in') {
            tl.add({
                targets: targets,
                translateY: [anime.stagger([100, 25]), 0],
                opacity: [0, 1],
                delay: anime.stagger([0, 250])
            });
        }

        else {

            tl.add({
                targets: targets,
                translateY: anime.stagger([-25, -100]),
                opacity: 0,
                delay: anime.stagger([0, 250])
            }, '-=250');

        }

        tl.pause();

        await $.delay(delay);

        tl.play();

        await tl.finished;

    }

}


export default class Transition {
    
    // Create Dispatcher
    constructor(dispatcher) {
        
        this.setStep = (step) => dispatcher("STEP", step);

    }


    set({ container, animation }) {

        this.animation = animation;
        this.container = $(container);

        this.navbar = this.container.children(".animate-fade").e();
        this.targets = this.container.children(".animate-item").e();

    }


    async to(step, direction, delay = 500) {

        await this.out(direction);

        await $.delay(delay);

        this.setStep(step);

    }
    
    in(direction = 'in', delay = 0) {

        return animations[this.animation](this.container, direction, delay);

    }

    out(direction = 'out') {

        return animations[this.animation](this.container, direction);

    }

}