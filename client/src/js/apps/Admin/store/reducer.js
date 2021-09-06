import initialState from './initialState';


// Create Reducer
const reducer = (state = initialState, action) => {


    const merge = (field, payload, currentState = state) => {
        return Object.assign({}, currentState, {
            [field]: payload ?? action.data
        })
    }

    switch (action.type) {
        case 'SET_PAGE':
            return merge('page');

        case 'SET_VIEW':
            return merge('view');

        case 'SET_RESERVATIONS':
            return merge('reservations');

        case 'SET_CURRENT_RESERVATION':
        case 'SET_CURRENTRESERVATION':
            return merge('currentReservation');

        case 'SET_SETTINGS':
            return merge('settings');

        case 'SET_VEHICLES':
            return merge('vehicles');

        case 'SET_CURRENT_VEHICLE':
        case 'SET_CURRENTVEHICLE':
            return merge('currentVehicle');

        case 'SET_REVIEWS':
            return merge('reviews');

        case 'SET_CURRENT_REVIEW':
        case 'SET_CURRENTREVIEW':
            return merge('currentReview');

    }


}


export default reducer;