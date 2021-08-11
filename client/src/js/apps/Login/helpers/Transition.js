import anime from 'animejs';
import { time } from 'uniqid';

export default class Transition {

    constructor(dispatch) {

        this.dispatch = dispatch;

    }

    set(container, selector = "animate-item") {

        this.targets = $(container).children(`.${selector}`).e();
        this.image = $(container).children(`.login__visual`).e();
        this.container = $(container);

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

    getReferralTargets() {
        const ref = this.container.children('.referral');

        if (!ref.length) return;

        // ref.children('.referral__bg, .referral__content, .referral__photo').clearInlineStyles();
        ref.children('*').clearInlineStyles();

        return {
            bg: ref.children(".referral__bg").e(),
            content: ref.children(".referral__content").e(),
            photo: ref.children(".referral__bg, .referral__photo").e()
        }
    }

    async in() {

        const targets = this.getReferralTargets();

        const timeline = anime.timeline({
            easing: 'easeOutQuad',
            duration: 250,
        });

        timeline.add({
            targets: this.image,
            opacity: [0, 1],
            duration: 800
        })

        if (targets) {
            anime.set(targets.bg, {
                width: '10.4rem',
                opacity: 0
            })

            anime.set(targets.photo, {
                scale: 0
            });
        }

        timeline.add({
            targets: this.targets,
            translateY: [anime.stagger([100, 25]), 0],
            opacity: [0, 1],
            delay: anime.stagger([0, 250])
        })

        if (targets) {
            timeline.add({
                targets: targets.photo,
                scale: 1
            });
    
            timeline.add({
                targets: targets.bg,
                width: '100%',
                opacity: 1
            });
    
            timeline.add({
                targets: targets.content,
                opacity: [0, 1]
            });
        }

        return timeline.finished;

    }

    out() {

        const targets = this.getReferralTargets();

        const timeline = anime.timeline({
            easing: 'easeOutQuad',
            duration: 250,
        })

        if (targets) {
            timeline.add({
                targets: targets.content,
                opacity: [1, 0]
            });
    
            timeline.add({
                targets: targets.bg,
                width: '10.4rem'
            });
    
            timeline.add({
                targets: targets.photo,
                duration: 800,
                scale: [1, 0]
            });
        }

        timeline.add({
            targets: this.targets,
            translateY: anime.stagger([-25, -100]),
            opacity: 0,
            delay: anime.stagger([0, 250])
        });

        timeline.add({
            targets: this.image,
            opacity: [1, 0]
        }, "-=500")

        return timeline.finished;

    }


}