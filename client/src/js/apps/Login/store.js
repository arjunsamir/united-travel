// Define initial state
export const initialState = {
    step: 'hello',
    email: '',
    password: '',
    fullName: '',
    preferredName: '',
    profilePhoto: '',
    code: '',
    loginType: '',
    token: '',
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

        case 'SET_TOKEN':
            return merge('token');
        
        default:
            return state;
    }

}