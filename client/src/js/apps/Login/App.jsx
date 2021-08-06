import React, { useReducer } from "react";

// Import Steps
import Hello from './steps/Hello';
import Login from './steps/Login';
import Registration from './steps/Registration';
import RequestReset from './steps/RequestReset';
import Reset from './steps/Reset';
import Signup from './steps/Signup';

// Import Tools
import axios from 'axios';
import Validator from './helpers/Validator';
import Transition from './helpers/Transition';
import anime from 'animejs';

// Import Context
import { reducer, initialState } from './store';

const steps = {
    hello: Hello,
    login: Login,
    registration: Registration,
    requestReset: RequestReset,
    reset: Reset,
    signup: Signup
}

const getCopy = (copy, step) => {

    const { common, errors, referral } = copy;

    const stepCopy = copy[step];

    stepCopy.inputs = Object.assign({}, stepCopy.inputs, common);

    return {...stepCopy, errors, referral};


}

const LoginApp = ({ copy, back, onLogin }) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    const Step = steps[state.step] || <div>Something went wrong...</div>;

    return (
        <section className="login">
            <Step
                copy={getCopy(copy, state.step)}
                exit={back}
                authenticate={(endpoint, data) => {
                    const res = axios.post(endpoint, data);
                    if (!res?.data?.data?.user) return;
                    onLogin && onLogin(res.data.data.user)
                }}
                update={(field) => {
                    const type = `SET_${field.toUpperCase()}`;
                    return (data) => dispatch({ type, data })
                }}
                state={state}
                validator={new Validator(copy.errors)}
                transition={new Transition(dispatch)}
            />
        </section>
    )

}

export default LoginApp;


const transition = (ctn, selector, complete) => {

    anime({
        targets: $(ctn).children(`.${selector}`).e(),
        translateY: anime.stagger([-25, -100]),
        opacity: 0,
        easing: 'easeOutQuad',
        duration: 250,
        delay: anime.stagger([0, 250]),
        complete
    })


}