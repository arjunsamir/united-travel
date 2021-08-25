import React from 'react';

// Import Molecules
import Field from '../../components/molecules/Field';

// Import Organisms
import AuthCard from '../../components/organisms/AuthCard';
import Input from '../../components/organisms/Input';

// Import Utils
import { validateEmail, validateName, validatePassword, lettersOnly } from '../../helpers/utils';
import axios from 'axios';

// Import Hooks
import useObjectState from '../hooks/useObjectState';

// Create Email Form
const GuestLogin = ({ login, navigate }) => {

    // Crate Local State
    const [state, setState] = useObjectState({
        email: '',
        name: '',
        isFetching: false
    });
    
    // Create State Dependant Values
    const valid = validateName(state.name) && validatePassword(state.email);

    // Create Submit Handler
    const onSubmit = () => {
        setState({ isFetching: true });
        axios.post('/auth/check-email', { email: state.email }).then((res) => {
            const { exists } = res.data || {};
            setState({
                view: exists ? 'login' : 'create',
                isFetching: false
            })
        })
    }

    return (
        <AuthCard
            title="Reset Password"
            text="Please choose a new password for your account. We reccomend a strong password, the longer the better."
        >

            <div className="booking-card__fieldset">

                <Input icon="person">
                    <Field
                        label="Full Name"
                        grow="1"
                    >
                        <input
                            type="text"
                            placeholder="Juan Pablo"
                            value={state.name}
                            onChange={e => setState({ name: lettersOnly(e.target.value) })}
                        />
                    </Field>
                </Input>

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

                <button type="submit" className={`btn wide filled icon-fill lt-dark lt-hover-primary dk-primary dk-hover-opacity-75${valid ? '' : ' disabled'}`} onClick={onSubmit}>Set Password</button>
                

            </div>

        </AuthCard>
    )

}

export default GuestLogin;