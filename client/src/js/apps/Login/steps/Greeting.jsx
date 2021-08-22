import React, { useRef, useEffect } from 'react';

import anime from 'animejs';


const Greeting = ({ copy, state, callback }) => {

    // Create Refs
    const mainRef = useRef();

    // Animate Out of app
    useEffect(() => {

        const tl = anime.timeline({
            easing: 'easeOutQuad',
            duration: 800
        });

        tl.add({
            targets: mainRef.current,
            opacity: [0, 1],
        });

        tl.add({
            targets: mainRef.current,
            opacity: 0,
            delay: 1500,
        });

        tl.finished.then(() => callback(state.user));

    }, []);

    return (
        <div className="login__container">

            <div className="login__greeting">
                <h1 className="light" ref={mainRef}>{copy.titles[state.loginType] || copy.titles.default} <span>{state.user.preferredName}</span></h1>
            </div>
            
        </div>
    );
}

export default Greeting;