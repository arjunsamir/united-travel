const state = {
    reservation: {
        serviceType: '',
        flight: {
            number: '',
            airline: '',
            type: '',
            time: null,
            buffer: null,
            airport: {}
        },
        origin: {
            selected: null,
            placeId: '',
            name: '',
            address: ''
        },
        destination: {
            selected: null,
            placeId: '',
            name: '',
            address: ''
        },
        schedule: {
            pickup: null,
            dropoff: null
        },
        route: {
            distance: null,
            duration: null,
            eta: null
        },
        passengers: {
            total: 1,
            adults: 1,
            children: 0,
            infants: 0
        },
        vehicle: null,
        quote: {
            id: '',
            cost: 0,
            origin: '',
            destination: '',
            vehicle: ''
        },
        payment: {
            method: '',
            appliedCredit: '',
            total: 0
        },
        notes: ''
    },
    app: {
        step: 'ServiceType',
        steps: [],
        airports: null,
        user: window.currentUser ? { ...window.currentUser } : {},
        map: null
    }
};

export default state;