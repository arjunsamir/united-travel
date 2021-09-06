import React, { useRef, useEffect, useState } from 'react';

// Import Login Components
import Image from '../components/Image';
import LoginForm from '../components/LoginForm';
import Referral from '../components/Referral';

// Import Generic Components
import { Button } from '../../components/Buttons';
import Input from '../../components/Input';

// Import Front End Components
import Typewriter from '../../../main/Typewriter';
import useOAuth from '../helpers/useOAuth';
import axios from 'axios';

// Animation Class Shortcut
const aC = "animate-item";

const Hello = ({ copy, exit, authenticate, transition, update, state, validator, referral }) => {

    // Create Refs
    const typeRef = useRef();
    const mainRef = useRef();
    const typewriter = useRef();

    // Enable Third Party Login
    const { enabled, loaded, useAuthProvider } = useOAuth(async (endpoint, data) => {
        const user = await authenticate(endpoint, data);
        update('user')(user);
        transition.to("greeting");
    });

    // Use State
    const [isFetching, setIsFetching] = useState(false);
    const [rejections, setRejections] = useState([]);

    // Check Email
    const errors = [ ...(validator.checkEmail(state.email) || []), ...rejections ];


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

    const handleSubmit = async () => {

        // Fetching Animation
        const timer = $.timer(1000).start();
        setIsFetching(true);

        // Make Request
        const res = await axios.post('/auth/check-email', { email: state.email });

        // Destructure Response
        const { exists, loginAllowed } = res.data || {};

        // Create Errors
        if (exists && !loginAllowed) {
            setIsFetching(false);
            setRejections([copy.errors.fails.oauth]);
            return;
        }

        // Artificial Delay
        await timer.hold();

        // Destroy Typewwriter
        typewriter.current.destroy();

        // Update State & Navigate
        const loginType = exists ? 'login' : 'signup';
        update('login_type')(loginType);

        // Transition to next step
        transition.to(loginType);

    }


    return (
        <div className="login__container" ref={mainRef}>
            <Image>
                {referral && <Referral copy={copy.referral} {...referral} />}
            </Image>
            <LoginForm
                back={exit ? () => exit() : null}
                backText={copy.back}
                showLoader={!loaded}
                onSubmit={handleSubmit}
            >
                <div className="login__header">
                    <h2 className={aC}>
                        {copy.title}
                        <span ref={typeRef}></span>
                        <span className="blink">|</span>
                    </h2>
                </div>
                <fieldset className="login__fieldset">
                    {enabled ? (
                        <>
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
                        </>
                    ) : (
                        <p className="animate-item">We're sorry, third party sign in is not available in this browser. This can be caused by using incognito mode or private browsing mode. We are actively working to resolve this.</p>
                    )}
                    
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
                        onChange={(val) => {
                            update('email')(val);
                            if (rejections.length) setRejections([]);
                        }}
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