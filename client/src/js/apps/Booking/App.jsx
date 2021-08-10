import React, { useReducer, useRef } from "react";

// // Import Steps
// import Hello from './steps/Hello';
// import Login from './steps/Login';
// import Registration from './steps/Registration';
// import RequestReset from './steps/RequestReset';
// import ResetCode from './steps/ResetCode';
// import Reset from './steps/Reset';
// import Signup from './steps/Signup';
// import Greeting from './steps/Greeting';

// // Import Tools
// import axios from 'axios';
// import Validator from './helpers/Validator';
// import Transition from './helpers/Transition';

// // Import Context
// import { reducer, initialState } from './store';

// const steps = {
//     hello: Hello,
//     login: Login,
//     registration: Registration,
//     requestReset: RequestReset,
//     reset: Reset,
//     signup: Signup,
//     resetCode: ResetCode,
//     greeting: Greeting
// }


const LoginApp = ({ copy  }) => {
    

    console.log(copy);

    // const [state, dispatch] = useReducer(reducer, initialState);

    // const Step = steps[state.step] || <div>Something went wrong...</div>;

    // const transition = useRef(new Transition(dispatch));

    return (
        <section className="booking">
            {/* <Step
                copy={getCopy(copy, state.step)}
                exit={back}
                authenticate={async (endpoint, data) => {
                    const res = await axios.post(endpoint, data);
                    console.log(res);
                    if (!res?.data?.data?.user) return;
                    return res.data.data.user;
                    // onLogin && onLogin(res.data.data.user)
                }}
                update={(field) => {
                    const type = `SET_${field.toUpperCase()}`;
                    return (data) => dispatch({ type, data })
                }}
                state={state}
                referral={referral}
                validator={new Validator(copy.errors)}
                transition={transition.current}
            /> */}
        </section>
    )

}

export default LoginApp;