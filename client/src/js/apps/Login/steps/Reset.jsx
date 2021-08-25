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

const RequestReset = ({ copy, transition, update, state, validator, referral, authenticate }) => {

    // Create Local State
    const [isFetching, setIsFetching] = useState(false);
    const [passwordErrors, setPasswordErrors] = useState([]);

    // Create Refs
    const mainRef = useRef();

    // Check Email 
    const errors = [ ...(validator.checkPassword(state.password) ?? []), ...passwordErrors ];

    // Enable Typewriter Effect
    useEffect(() => {

        // Set Transition Target
        transition.set(mainRef.current).in();

        // Clear Previous Passwords
        update("password")("");

    }, []);

    return (
        <div className="login__container" ref={mainRef}>
            <Image>
                {referral && <Referral copy={copy.referral} {...referral} />}
            </Image>
            <LoginForm
                back={() => transition.to("login")}
                backText={copy.back}
                title={copy.title}
                text={copy.copy}
                onSubmit={async () => {

                    // Set Local State
                    setIsFetching(true);

                    // Start timer
                    const timer = $.timer(1000).start();

                    // Validate Reset
                    const user = await authenticate('/auth/reset-password', {
                        token: state.token,
                        password: state.password
                    })

                    // Hold For Timer
                    await timer.hold();

                    // Set Errors
                    if (!user) {
                        setPasswordErrors([copy.errors.fails.password]);
                        setIsFetching(false);
                        return;
                    }

                    // Update State
                    update("user")(user)

                    // Transition to next view
                    transition.to("greeting");

                }}
            >
                <div className="login__fieldset">
                    <Input
                        id="user-password"
                        type="password"
                        icon="lock"
                        label={copy.inputs.password.label}
                        placeholder={copy.inputs.password.placeholder}
                        value={state.password}
                        onChange={update('password')}
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

export default RequestReset;