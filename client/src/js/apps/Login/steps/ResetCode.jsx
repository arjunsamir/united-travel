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
    const [enableResend, setEnableResend] = useState(true);
    const [codeErrors, setCodeErrors] = useState([])

    // Create Refs
    const mainRef = useRef();

    // Enable Typewriter Effect
    useEffect(() => {
        transition.set(mainRef.current).in();
    }, []);

    // Disable Resend Button
    useEffect(() => {

        if (enableResend) return;

        const timeout = setTimeout(() => setEnableResend(true), 25000)

        return () => clearTimeout(timeout);

    }, [enableResend]);

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
                    const res = await axios.post('/auth/validate-reset-code', {
                        email: state.email,
                        code: state.code
                    });

                    // Await Timer
                    await timer.hold();

                    // Apply Errors
                    if (!res?.data?.status || res.data.status === "fail") {
                        setCodeErrors([copy.invalid]);
                        setIsFetching(false);
                        return;
                    }

                    // Update State
                    update("token")(res.data.token)
                    
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
                        errors={codeErrors}
                    />
                    <Button
                        text={copy.button}
                        type="submit"
                        disabled={state.code.length < 6}
                        showLoader={isFetching}
                    />
                    {enableResend ? (
                        <p className="animate-item">
                            {copy.resend[0] + " "}
                            <LinkButton
                                text={copy.resend[1]}
                                onClick={() => {
                                    if (!enableResend) return;
                                    axios.post('auth/request-reset-token', {
                                        email: state.email
                                    });
                                    setEnableResend(false);
                                }}
                                animationClass="no-animate"
                            />
                        </p>
                    ) : (
                        <p className="animate-item">{copy.sent}</p>
                    )}
                    
                </div>
            </LoginForm>
        </div>
    )
}

export default ResetCode;