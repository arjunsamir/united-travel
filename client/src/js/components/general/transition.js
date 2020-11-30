import barba from '@barba/core';
import gsap from 'gsap';


const pageTransition = () => {

    const tl = gsap.timeline();

    tl.to('.page-transition-slide', { duration: .5, y: 0 });
    tl.to('.page-transition-slide', { duration: .5, y: '100vw' });

};


const contentAnimation = data => {

    console.log(data);

};



const enableTransition = () => {

    barba.init({
        sync: true,
        transitions: [{
            async leave() {
                const done = this.async();
                pageTransition();
                await $.delay(1500);
                done();
            },
            async enter(data) {
                contentAnimation(data);
            }
        }]
    });

};


export default enableTransition;