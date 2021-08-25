import React, { useRef, useEffect } from 'react';

// Import Login Components
import Image from '../components/Image';
import LoginForm from '../components/LoginForm';

// Import Generic Components
import { Button, LinkButton } from '../../components/Buttons';
import Input from '../../components/Input';

// Import Helpers
import { useObjectState } from '../../helpers/hooks';


const Login = ({ copy, authenticate, transition, update, state, validator }) => {

    // Set Up Local State
    const [localState, setLocalState] = useObjectState({
        isFetching: false,
        errors: []
    });

    // Create Refs
    const mainRef = useRef();

    // Check Email & Password
    const emailErrors = validator.checkEmail(state.email);
    const passwordErrors = [...validator.checkPassword(state.password), ...localState.errors];

    useEffect(() => {
        transition.set(mainRef.current).in();
    }, []);

    return (
        <div className="login__container" ref={mainRef}>
            <Image />
            <LoginForm
                back={() => transition.to("hello")}
                backText={copy.back}
                title={copy.title}
                onSubmit={async () => {

                    // Set State
                    setLocalState({ isFetching: true });

                    // Start Timer
                    const timer = $.timer(1000).start();

                    // Fetch Data
                    const user = await authenticate('/auth/create-session', {
                        email: state.email,
                        password: state.password
                    });

                    // Hold For Timer
                    await timer.hold();

                    // Set Error
                    if (!user) return setLocalState({ errors: [copy.errors.fails.password] });

                    // Update Global State
                    update('user')(user);
            
                    // Update State
                    transition.to("greeting");

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
                    <Input
                        id="user-password"
                        type="password"
                        icon="lock"
                        label={copy.inputs.password.label}
                        placeholder={copy.inputs.password.placeholder}
                        value={state.password}
                        onChange={(val) => {
                            update('password')(val);
                            if (localState.errors.length) setLocalState({ errors: [] });
                        }}
                        errors={passwordErrors}
                    />
                    <Button
                        text={copy.button}
                        type="submit"
                        disabled={emailErrors.length || passwordErrors.length}
                        showLoader={localState.isFetching}
                    />
                    <LinkButton
                        text={copy.forgot}
                        onClick={() => transition.to("requestReset")}
                    />
                </div>
            </LoginForm>
        </div>
    )
}

export default Login;