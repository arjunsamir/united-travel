import anime from 'animejs';

export default class Transition {

    constructor(dispatch) {

        this.dispatch = dispatch;

    }

    set(container, selector = "animate-item") {

        this.targets = $(container).children(`.${selector}`).e()

        return this;

    }

    async to(step, delay = 500) {

        await this.out();

        await $.delay(delay);

        this.dispatch({
            type: "SET_STEP",
            data: step
        })
    }

    in() {

        const timeline = anime.timeline({
            easing: 'easeOutQuad',
            duration: 250,
        })

        timeline.add({
            targets: this.targets,
            translateY: [anime.stagger([100, 25]), 0],
            opacity: [0, 1],
            delay: anime.stagger([0, 250])
        })

        return timeline.finished;

    }

    out() {

        const timeline = anime.timeline({
            easing: 'easeOutQuad',
            duration: 250,
        })

        timeline.add({
            targets: this.targets,
            translateY: anime.stagger([-25, -100]),
            opacity: 0,
            delay: anime.stagger([0, 250])
        })

        return timeline.finished;
    }


}