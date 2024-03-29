import React, { useRef, useEffect } from 'react';

// Import Login Components
import Image from '../components/Image';
import LoginForm from '../components/LoginForm';
import Referral from '../components/Referral';

// Import Generic Components
import { Button } from '../../components/Buttons';
import Input from '../../components/Input';


const Signup = ({ copy, transition, update, state, validator, referral }) => {

    // Create Refs
    const mainRef = useRef();

    // Check Email & Password
    const emailErrors = validator.checkEmail(state.email);
    const passwordErrors = validator.checkPassword(state.password);


    useEffect(() => {
        // Transition Into View
        transition.set(mainRef.current).in();
    }, []);

    return (
        <div className="login__container" ref={mainRef}>
            <Image>
                {referral && <Referral copy={copy.referral} {...referral} />}
            </Image>
            <LoginForm
                back={() => transition.to("hello")}
                backText={copy.back}
                title={copy.title}
                onSubmit={() => transition.to("registration")}
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
                    <Input
                        id="user-password"
                        type="password"
                        icon="lock"
                        label={copy.inputs.password.label}
                        placeholder={copy.inputs.password.placeholder}
                        value={state.password}
                        onChange={update('password')}
                        errors={passwordErrors}
                    />
                    <Button
                        text={copy.button}
                        type="submit"
                        disabled={emailErrors.length || passwordErrors.length}
                    />
                </div>
            </LoginForm>
        </div>
    )
}

export default Signup;