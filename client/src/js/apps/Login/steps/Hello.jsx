import React, { useRef, useEffect, useState } from 'react';

// Import Login Components
import Image from '../components/Image';
import LoginForm from '../components/LoginForm';

// Import Generic Components
import { Button } from '../../components/Buttons';
import Input from '../../components/Input';

// Import Front End Components
import Typewriter from '../../../main/Typewriter';
import useOAuth from '../helpers/useOAuth';
import axios from 'axios';

// Animation Class Shortcut
const aC = "animate-item";

const Hello = ({ copy, exit, authenticate, transition, update, state, validator }) => {

    // Create Refs
    const typeRef = useRef();
    const mainRef = useRef();
    const typewriter = useRef();

    // Enable Third Party Login
    const { loaded, useAuthProvider } = useOAuth(authenticate);

    // Use State
    const [isFetching, setIsFetching] = useState(false);

    // Check Email
    const errors = validator.checkEmail(state.email);


    // Enable Typewriter Effect
    useEffect(() => {

        if (!loaded) return;

        transition.set(mainRef.current).in();

        if (typewriter.current) return;

        typewriter.current = new Typewriter(null, null, {
            element: typeRef.current,
            period: 2500,
            words: copy.words
        }).init();
        

    }, [loaded]);

    return (
        <div className="login__container" ref={mainRef}>
            <Image />
            <LoginForm
                back={exit ? () => exit() : null}
                backText={copy.back}
                showLoader={!loaded}
                onSubmit={() => {
                    const timer = $.timer(1000).start();
                    setIsFetching(true);
                    axios.post('/auth/check-email', { email: state.email }).then(async (res) => {
                        const { exists } = res.data || {};
                        await timer.hold();
                        typewriter.current.destroy();
                        transition.to(exists ? "login" : "signup");
                    })
                }}
            >
                <div className="login__header">
                    <h2 className={aC}>
                        {copy.title}
                        <span ref={typeRef}></span>
                        <span className="blink">|</span>
                    </h2>
                </div>
                <fieldset className="login__fieldset">
                    <h6 className={`bold ${aC}`}>{copy.continueWith}</h6>
                    <div className="login__inline">
                        <Button
                            text="Google"
                            icon="google"
                            theme="google"
                            onClick={loaded && useAuthProvider('google')}
                        />
                        <Button
                            text="Facebook"
                            icon="facebook"
                            theme="facebook"
                            onClick={loaded && useAuthProvider('facebook')}
                        />
                    </div>
                </fieldset>
                <div className="login__fieldset">
                    <h6 className={`bold ${aC}`}>{copy.alt}</h6>
                    <Input
                        id="user-email"
                        type="email"
                        icon="email"
                        label={copy.inputs.email.label}
                        placeholder={copy.inputs.email.placeholder}
                        value={state.email}
                        onChange={update('email')}
                        errors={errors}
                    />
                    <Button
                        text={copy.button}
                        type="submit"
                        disabled={errors.length}
                        showLoader={isFetching}
                    />
                </div>
            </LoginForm>
        </div>
    )
}

export default Hello;