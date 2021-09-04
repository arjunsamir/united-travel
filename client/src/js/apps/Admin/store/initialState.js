// Create Initial State
const state = {
    page: "Rides",
    view: "Settings",
    currentReservation: null,
    reservations: null, // Array
    settings: { ...window.fullSettings },
    admin: { ...window.currentUser }
};


export default state;