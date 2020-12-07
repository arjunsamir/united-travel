export default {
    airportRide: false,
    schedule: {
        pickup: null,
        dropoff: null
    },
    origin: {
        placeId: '',
        coordinates: [],
        address: ''
    },
    destination: {
        placeId: '',
        coordinates: [],
        address: ''
    },
    route: {
        distance: 0,
        eta: ''
    },
    flight: {
        type: '',
        number: '',
        airline: '',
        airport: ''
    },
    passengers: {
        total: 0,
        adults: 0,
        children: 0,
        infants: 0
    },
    luggage: {
        total: 0,
        small: 0,
        medium: 0,
        large: 0
    },
    vehicle: ''
}