import React, { useRef, useEffect, useState } from 'react';

// Import Login Components
import Image from '../components/Image';
import LoginForm from '../components/LoginForm';
import Referral from '../components/Referral';

// Import Generic Components
import { Button } from '../../components/Buttons';
import Input from '../../components/Input';

// Import Front End Components
import axios from 'axios';

const RequestReset = ({ copy, transition, update, state, validator, referral }) => {

    // Create State
    const [isFetching, setIsFetching] = useState(false)

    // Create Refs
    const mainRef = useRef();

    // Check Email 
    const emailErrors = validator.checkEmail(state.email);

    // Enable Typewriter Effect
    useEffect(() => {
        transition.set(mainRef.current).in();
    }, []);

    return (
        <div className="login__container" ref={mainRef}>
            <Image>
                {referral && <Referral copy={copy.referral} {...referral} />}
            </Image>
            <LoginForm
                back={() => transition.to("signup")}
                backText={copy.back}
                title={copy.title}
                text={copy.copy}
                onSubmit={async () => {

                    // Set Local State
                    setIsFetching(true);

                    // Create Timer
                    const timer = $.timer(1000).start();

                    // Request Reset Code From API

                    // Wait For Timer
                    await timer.hold();

                    // Transition To Next Screen
                    transition.to("resetCode");

                }}
            >
                <div className="login__fieldset">
                    <Input
                        id="user-email-2"
                        type="email"
                        icon="email"
                        label={copy.inputs.email.label}
                        placeholder={copy.inputs.email.placeholder}
                        value={state.email}
                        onChange={update('email')}
                        errors={emailErrors}
                    />
                    <Button
                        text={copy.button}
                        type="submit"
                        disabled={emailErrors.length}
                        showLoader={isFetching}
                    />
                </div>
            </LoginForm>
        </div>
    )
}

export default RequestReset;