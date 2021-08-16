import React, { useRef, useEffect, useState } from 'react';

// Import Login Components
import Image from '../components/Image';
import LoginForm from '../components/LoginForm';
import Referral from '../components/Referral';

// Import Generic Components
import { Button } from '../../components/Buttons';
import Input from '../../components/Input';
import ImageUpload from '../../components/ImageUpload';

const Registration = ({ copy, authenticate, transition, update, state, validator, referral }) => {

    // Use That State
    const [isFetching, setIsFetching] = useState(false);

    // Create Refs
    const mainRef = useRef();

    // Check Email & Password
    const fullNameErrors = validator.checkName(state.fullName);
    const preferredNameErrors = validator.checkName(state.preferredName);

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
                onSubmit={async () => {

                    // Update Local State
                    setIsFetching(true);

                    // Start a timer
                    const timer = $.timer(1000).start();

                    // Make Request
                    const user = await authenticate('/auth/register', {
                        name: state.fullName,
                        preferredName: state.preferredName,
                        password: state.password,
                        email: state.email,
                        photo: state.profilePhoto,
                        referredBy: referral?.code
                    });

                    // Wait For Timer To Expire
                    await timer.hold();

                    // Update Global State
                    update('user')(user);

                    // Transition To Greeting
                    transition.to("greeting");

                }}
            >
                <div className="login__fieldset">
                    <Input
                        id="user-full-name"
                        type="name"
                        icon="person-circle"
                        label={copy.inputs.fullName.label}
                        placeholder={copy.inputs.fullName.placeholder}
                        value={state.fullName}
                        onChange={update('full_name')}
                        onBlur={() => {
                            if (state.preferredName || !state.fullName) return;
                            update('preferred_name')(state.fullName.split(" ")[0]);
                        }}
                        errors={fullNameErrors}
                    />
                    <Input
                        id="user-preferred-name"
                        type="name"
                        icon="person-circle"
                        label={copy.inputs.preferredName.label}
                        placeholder={copy.inputs.preferredName.placeholder}
                        value={state.preferredName}
                        onChange={update('preferred_name')}
                        errors={preferredNameErrors}
                    />
                    <ImageUpload
                        id="user-profile-photo-upload"
                        label={copy.inputs.profilePhoto.label}
                        placeholder={copy.inputs.profilePhoto.placeholder}
                        endpoint="/api/upload/profile-photo"
                        success={copy.inputs.profilePhoto.success}
                        onUpload={update('profile_photo')}
                        filename={state.fullName || 'user-photo'}
                    />
                    <Button
                        text={copy.button}
                        type="submit"
                        disabled={fullNameErrors.length || preferredNameErrors.length}
                        showLoader={isFetching}
                    />
                </div>
            </LoginForm>
        </div>
    )
}

export default Registration;