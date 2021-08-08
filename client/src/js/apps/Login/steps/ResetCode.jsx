import React, { useRef, useEffect, useState } from 'react';

// Import Login Components
import Image from '../components/Image';
import LoginForm from '../components/LoginForm';
import Referral from '../components/Referral';

// Import Generic Components
import { Button, LinkButton } from '../../components/Buttons';
import Input from '../../components/Input';

// Import Front End Components
import axios from 'axios';

const ResetCode = ({ copy, transition, update, state, validator, referral }) => {

    // Create Local State
    const [isFetching, setIsFetching] = useState(false);

    // Create Refs
    const mainRef = useRef();

    // Check Email 
    const emailErrors = validator.checkEmail(state.email);

    // Enable Typewriter Effect
    useEffect(() => {
        transition.set(mainRef.current).in();
    }, []);

    // Return Component
    return (
        <div className="login__container" ref={mainRef}>
            <Image>
                {referral && <Referral copy={copy.referral} {...referral} />}
            </Image>
            <LoginForm
                back={() => transition.to("requestReset")}
                backText={copy.back}
                title={copy.title}
                text={copy.copy.replace("{email}", state.email)}
                onSubmit={async () => {

                    // Update State
                    setIsFetching(true);

                    // Start Timer
                    const timer = $.timer(1000).start();

                    // Validate API Errors

                    // Await Timer
                    await timer.hold();
                    
                    // Transition To Next Page
                    transition.to("reset");
                    

                }}
            >
                <div className="login__fieldset">
                    <Input
                        id="reset-code"
                        icon="keypad"
                        label={copy.inputs.code.label}
                        placeholder={copy.inputs.code.placeholder}
                        value={state.code}
                        onChange={update('code')}
                        errors={emailErrors}
                    />
                    <Button
                        text={copy.button}
                        type="submit"
                        disabled={emailErrors.length}
                        showLoader={isFetching}
                    />
                    <p className="animate-item">
                        {copy.resend[0] + " "}
                        <LinkButton
                            text={copy.resend[1]}
                            onClick={() => transition.to("requestReset")}
                            animationClass="no-animate"
                        />
                    </p>
                    
                </div>
            </LoginForm>
        </div>
    )
}

export default ResetCode;