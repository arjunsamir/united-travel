import initialState from './initialState';


// Create Reducer
const reducer = (state = initialState, action) => {


    const merge = (field) => {
        return Object.assign({}, state, {
            [field]: action.data
        })
    }

    switch (action.type) {
        case 'SET_PAGE':
            return merge('page');

        case 'SET_VIEW':
            return merge('view');

        case 'SET_CURRENT_RESERVATION':
        case 'SET_CURRENTRESERVATION':
            return merge('currentReservation');

        case 'SET_RESERVATIONS':
            return merge('reservations');

        case 'SET_PAYMENT_METHODS':
        case 'SET_PAYMENTMETHODS':
            return merge('paymentMethods');
        
        case 'SET_EMAIL':
            return merge('email');

        case 'SET_NAME':
            return merge('name');

        case 'SET_PREFERRED_NAME':
        case 'SET_PREFERREDNAME':
            return merge('preferredName');

        case 'SET_PREFERRED_LOCALE':
        case 'SET_PREFERREDLOCALE':
            return merge('preferredLocale');

        case 'SET_PHOTO':
            return merge('photo');
    }


}


export default reducer;