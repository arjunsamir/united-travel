// Create Initial State
const state = {
    page: "Rides",
    view: "Settings",
    currentReservation: null,
    reservations: null, // Array
    settings: { ...window.fullSettings },
    vehicles: null,
    currentVehicle: null,
    reviews: null,
    currentReview: null,
    admin: { ...window.currentUser }
};


export default state;