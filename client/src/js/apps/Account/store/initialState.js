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
        credits,
        stripeID,
        passwordSet
    }
} = window;


// Create Initial State
const state = {
    // page: "Rides",
    page: "Profile",
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
    credits,
    stripeID,
    passwordSet
};


export default state;