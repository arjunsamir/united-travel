// Define initial state
export const initialState = {
    step: 'hello',
    email: 'me@arjunsamir.com',
    password: 'password',
    fullName: 'Samir Patel',
    preferredName: 'Arjun',
    profilePhoto: '',
    code: '',
    loginType: '',
    user: {}
}


// Create the reducer
export const reducer = (state = initialState, action) => {

    const merge = (field) => {
        return Object.assign({}, state, {
            [field]: action.data
        });
    }

    switch (action.type) {
        case 'SET_STEP':
            return merge('step');

        case 'SET_EMAIL':
            return merge('email');

        case 'SET_PASSWORD':
            return merge('password');
        
        case 'SET_FULL_NAME':
            return merge('fullName');

        case 'SET_PREFERRED_NAME':
            return merge('preferredName');

        case 'SET_PROFILE_PHOTO':
            return merge('profilePhoto');

        case 'SET_CODE':
            return merge('code');

        case 'SET_USER':
            return merge('user');

        case 'SET_LOGIN_TYPE':
            return merge('loginType');
        
        default:
            return state;
    }

}