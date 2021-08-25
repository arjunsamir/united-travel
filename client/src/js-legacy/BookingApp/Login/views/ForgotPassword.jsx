import React from 'react';

// Import Molecules
import Field from '../../components/molecules/Field';

// Import Organisms
import AuthCard from '../../components/organisms/AuthCard';
import Input from '../../components/organisms/Input';

// Import Utils
import { validateEmail } from '../../helpers/utils';
import axios from 'axios';

// Import Hooks
import useObjectState from '../hooks/useObjectState';

// Create Email Form
const ForgotPassword = ({ login, navigate, initialState }) => {

    // Create Local State
    const [state, setState] = useObjectState(initialState || {
        email: ''
    })
    
    // Create State Dependant Values
    const valid = validateEmail(state.email);

    // Create Submit Handler
    const onSubmit = () => {
        set({ isFetching: true });
        axios.post('/auth/check-email', { email: state.email }).then((res) => {
            const { exists } = res.data || {};
            set({
                view: exists ? 'login' : 'create',
                isFetching: false
            })
        })
    }

    return (
        <AuthCard
            title="Forgot your password?"
            text="Enter your email address and we’ll send you a password reset link so that you can create a new password."
            back={() => navigate('providers')}
        >

            <div className="booking-card__fieldset">

                <Input icon="email">
                    <Field
                        label="Email Address"
                        grow="1"
                    >
                        <input
                            type="email"
                            placeholder="hello@mail.com"
                            value={state.email}
                            onChange={e => setState({ email: e.target.value })}
                        />
                    </Field>
                </Input>

                <button type="submit" className={`btn wide filled icon-fill lt-dark lt-hover-primary dk-primary dk-hover-opacity-75${valid ? '' : ' disabled'}`} onClick={onSubmit}>Get Reset Code</button>
                

            </div>

        </AuthCard>
    )

}

export default ForgotPassword;