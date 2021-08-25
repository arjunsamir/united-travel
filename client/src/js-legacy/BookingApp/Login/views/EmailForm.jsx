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
const EmailForm = ({ login, navigate }) => {

    // Crate Local State
    const [state, setState] = useObjectState({
        email: '',
        password: '',
        name: '',
        view: 'email',
        isFetching: false
    });
    
    // Create State Dependant Values
    let valid;
    let title = <>What's your <span>email</span> address?</>;
    let text = "";
    let btnText = "Sumbit";
    let onSubmit = () => {
        setState({ isFetching: true });
        axios.post('/auth/check-email', { email: state.email }).then((res) => {
            const { exists } = res.data || {};
            setState({
                view: exists ? 'login' : 'create',
                isFetching: false
            })
        })
    }

    const renderFields = () => {
        switch(state.view) {
            case 'email':
                valid = validateEmail(state.email);
                return (<>
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
                </>)
    
            case 'login':
                title = <>Enter your <span>password.</span></>
                text = "Enter the password for " + state.email;
                btnText = "Login";
                valid = validatePassword(state.password);
                return (<>
                    <Input icon="key">
                        <Field
                            label="Password"
                            grow="1"
                        >
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={state.password}
                                onChange={e => setState({ password: e.target.value })}
                            />
                        </Field>
                    </Input>
                    <a href="#" onClick={e => {
                        e.preventDefault();
                        navigate('forgot', {
                            email: state.email
                        })
                    }}>Forgot your password?</a>
                </>)
            case 'create':
                title = <>Create an <span>account.</span></>
                text = state.email;
                btnText = "Create Account";
                valid = validateName(state.name) && validatePassword(state.password);
                return (<>
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
                    
                    <Input icon="key">
                        <Field
                            label="Password"
                            grow="1"
                        >
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={state.password}
                                onChange={e => setState({ password: e.target.value })}
                            />
                        </Field>
                    </Input>
                </>)
        }
    }

    const fields = renderFields();

    return (
        <AuthCard
            title={title}
            text={text}
            back={() => {
                if (state.view === 'email') navigate('providers');
                else setState({
                    view: 'email',
                    password: '',
                    name: ''
                })
            }}
        >

            <div className="booking-card__fieldset">

                {fields}

                <button type="submit" className={`btn wide filled icon-fill lt-dark lt-hover-primary dk-primary dk-hover-opacity-75${valid ? '' : ' disabled'}`} onClick={onSubmit}>{btnText}</button>
                

            </div>

        </AuthCard>
    )

}

export default EmailForm;