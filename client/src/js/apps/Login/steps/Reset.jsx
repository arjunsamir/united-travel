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

    // Create Local State
    const [isFetching, setIsFetching] = useState(false);

    // Create Refs
    const mainRef = useRef();

    // Check Email 
    const errors = validator.checkPassword(state.password);

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
                    
                    
                    // Hold For Timer
                    await timer.hold();

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