// Import React for Create Context
import React from "react"

// Import Merger
import Merger from './helpers/Merger';

// Create Context Object
export const AppContext = React.createContext();

// Create Initial Applicaiton State
export const initialState = {
    reservation: {
        airportRide: null,
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
        luggage: {
            total: 0,
            small: 0,
            medium: 0,
            large: 0
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
        // step: 'airport-ride',
        step: 'checkout',
        airports: null,
        user: null
    }
}


//Create Reducer
export const reducer = (state, action) => {
    const [method, category, type] = action.type.toLowerCase().split('_');

    if (!state[category]) return state

    const m = new Merger(category, state)

    let PL = action.payload;

    // Helper Functions
    const setAirport = (newAirport) => {

        const airport = newAirport ?? state.reservation.flight.airport;

        // Destructure Properties
        const { placeId, address, name } = airport;

        // Update Airport
        m.merge({ airport: { ...airport } }, 'flight')
        
        // Update Origin/Destination
        switch (m.state.reservation.flight.type) {
            case 'arriving':
                m.merge({ origin: { placeId, address, name } })
                break;
            case 'departing':
                m.merge({ destination: { placeId, address, name }})
                break;
        }

        return { ...m.state }
    }

    const setPassengersOrLuggage = (a, b, c) => {

        m.merge({ [PL.key]: PL.value }, type)
    
        const p = m.state.reservation[type];

        return m.merge({
            total: (p[a]|| 0) + (p[b] || 0) + (p[c] || 0)
        }, type)
    }

    // Update Reservation State
    if (method === 'update') {
        switch(type) {
            case 'airport-ride':
                m.merge({ airportRide: PL })

                if (PL) setAirport()

                return m.state
    
            case 'flight-number':
                return m.merge({ number: PL }, 'flight')

            case 'flight-time':
                return m.merge({time: PL}, 'flight')
    
            case 'airline': 
                return m.merge({ airline: PL }, 'flight')
    
            case 'flight-type':
                m.merge({ type: PL }, 'flight')
                return setAirport()

            case 'flight-buffer':
                return m.merge({ buffer: parseFloat(PL) }, 'flight')
    
            case 'airport':
                return setAirport(state.app.airports.find(apt => apt.code === PL) ?? {})
    
            case 'origin':
            case 'destination':
                return m.merge({ [type]: PL ? {
                    selected: { ...PL },
                    placeId: PL.place_id,
                    name: PL.structured_formatting.main_text,
                    address: PL.description
                } : {
                    selected: null,
                    placeId: '',
                    name: '',
                    address: ''
                }});
    
            case 'pickup-time':
                return m.merge({ pickup: PL }, 'schedule')
    
            case 'dropoff-time':
                return m.merge({ dropoff: PL }, 'schedule')
    
            case 'route':
                return m.merge({ route: { ...PL } })
    
            case 'passengers':
                return setPassengersOrLuggage('adults', 'children', 'infants')
    
            case 'luggage':
                return setPassengersOrLuggage('small', 'medium', 'large')
    
            case 'vehicle':
                return m.merge({ vehicle: PL })

            case 'notes':
                return m.merge({ notes: PL })

            case 'quote':
                return m.merge({ quote: { ...PL } })
    
            case 'payment': 
                return m.merge({ payment: { ...PL } })
            default:
                return state
        }
    }

    else if (method === 'set') {
        switch(type) {
            case 'step':
                return m.merge({ step: PL })
            case 'airports':
                return m.merge({ airports: [ ...PL ] })
            case 'user':
                return m.merge({ user: { ... PL } })
            default:
                return state
        }
    }

    else return state

    
}