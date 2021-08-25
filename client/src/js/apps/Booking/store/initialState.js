const commonSteps = ['Route', 'Passengers', 'Vehicle', 'ChildSeats', 'Notes']

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
        cruise: {
            ship: '',
            line: '',
            type: '',
            time: null,
            buffer: null,
            port: {}
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
        passengers: '',
        childSeats: {
            rear: 0,
            front: 0,
            booster: 0
        },
        vehicle: null,
        payment: {
            method: '',
            appliedCredit: '',
            total: 0
        },
        notes: '',
        quote: '',
        code: ''
    },
    app: {
        step: 'ServiceType',
        // step: 'Checkout',
        // step: 'Confirmation',
        previousStep: '',
        steps: {
            first: [{
                name: 'ServiceType',
                active: true,
                complete: false,
                group: 'first',
                index: 0
            }],
            dynamic: [],
            last: commonSteps.map((s, i) => ({
                name: s,
                active: false,
                complete: false,
                group: 'last',
                index: i
            }))
        },
        airports: null,
        ports: null,
        user: window.currentUser ? { ...window.currentUser } : {},
        isLoggedIn: !!window.currentUser.name,
        map: null
    }
};

export default state;