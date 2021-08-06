// Define initial state
export const initialState = {
    step: 'hello',
    email: 'me@arjunsamir.com',
    password: '',
    referral: '',
    fullName: '',
    preferredName: ''
}


// Create the reducer
export const reducer = (state = initialState, action) => {

    switch (action.type) {
        case 'SET_STEP':
            return Object.assign({}, state, {
                step: action.data
            });

        case 'SET_EMAIL':
            return Object.assign({}, state, {
                email: action.data
            });

        case 'SET_PASSWORD':
            return Object.assign({}, state, {
                password: action.data
            });

        case 'SET_REFERRAL':
            return Object.assign({}, state, {
                referral: action.data
            });
        
        case 'SET_FULL_NAME':
            return Object.assign({}, state, {
                fullName: action.data
            });

        case 'SET_PREFERRED_NAME':
            return Object.assign({}, state, {
                preferredName: action.data
            });
        
        default:
            return state;
    }

}