// Get User Initial Data
const {
    currentUser: {
        name,
        preferredName,
        email,
        preferredLocale,
        photo,
        _id,
        referralCode,
        oAuth,
        credits
    }
} = window;


// Create Initial State
const state = {
    step: "Rides",
    reservations: null, // Array
    paymentMethods: null, // Array
    email,
    name,
    preferredName,
    preferredLocale,
    photo,
    id: _id,
    oAuth,
    referralCode,
    credits
};


export default state;