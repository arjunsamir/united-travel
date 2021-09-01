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

    }


}


export default reducer;