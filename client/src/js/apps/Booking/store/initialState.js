const commonSteps = ['Route', 'Passengers', 'Vehicle', 'ChildSeats', 'Notes', 'Summary']

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
        passengers: 1,
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
        user: window.currentUser ? { ...window.currentUser } : {},
        map: null
    }
};

export default state;