import React, { useRef, useEffect } from 'react';

import anime from 'animejs';

const Greeting = ({ copy, state, callback }) => {

    // Create Refs
    const mainRef = useRef();


    useEffect(() => {

        // Animate Title in
        anime({
            targets: mainRef.current,
            opacity: [0, 1],
            easing: 'easeOutQuad',
            duration: 800,
            complete: () => $.delay(1000).then(() => {
                callback(state.user);
            })
        })

    }, []);

    return (
        <div className="login__container">

            <div className="login__greeting">
                <h1 className="light" ref={mainRef}>{copy.titles[state.loginType]} <span>{state.user.preferredName}</span></h1>
            </div>
            
        </div>
    )
}

export default Greeting;