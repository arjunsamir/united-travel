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
            airport: {}
        },
        origin: {
            placeId: '',
            coordinates: [],
            name: '',
            address: ''
        },
        destination: {
            placeId: '',
            coordinates: [],
            name: '',
            address: ''
        },
        schedule: {
            pickup: null,
            dropoff: null
        },
        route: {
            distance: 0,
            eta: ''
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
        payment: {
            method: '',
            appliedCredit: '',
            total: 0
        }
    },
    app: {
        // step: 'airport-ride',
        step: 'flight-schedule',
        airports: null
    }
}


//Create Reducer
export const reducer = (state, action) => {
    const [method, category, type] = action.type.toLowerCase().split('_');

    if (!state[category]) return state

    const m = new Merger(category, state)

    const PL = action.payload;

    // Helper Functions
    const setAirport = (newAirport) => {

        const airport = newAirport ?? state.reservation.flight.airport;

        // Destructure Properties
        const { placeId, coordinates, address, name } = airport;

        // Update Airport
        m.merge({ airport: { ...airport } }, 'flight')
        
        // Update Origin/Destination
        switch (m.state.reservation.flight.type) {
            case 'arriving':
                m.merge({ origin: { placeId, coordinates, address, name } })
                break;
            case 'departing':
                m.merge({ destination: { placeId, coordinates, address, name }})
                break;
        }

        return { ...m.state }
    }

    if (method === 'update') {
        switch(type) {
            case 'airport-ride':
                m.merge({ airportRide: PL })

                if (PL) setAirport()

                return m.state
    
            case 'flight-number':
                return m.merge({ number: PL }, 'flight')
    
            case 'airline': 
                return m.merge({ airline: PL }, 'flight')
    
            case 'flight-type':
                m.merge({ type: PL }, 'flight')
                return setAirport()
    
            case 'airport':
                return setAirport(state.app.airports.find(apt => apt.code === PL) ?? {})
    
            case 'origin':
                return m.merge({ origin: { ...PL } })
    
            case 'destination':
                return m.merge({ destination: { ...PL } })
    
            case 'pickup-time':
                return m.merge({ pickup: PL }, 'schedule')
    
            case 'dropoff-time':
                return m.merge({ dropoff: PL }, 'schedule')
    
            case 'route':
                return m.merge({ route: { ...PL } })
    
            case 'passengers':
                return m.merge({ passengers: { ...PL } })
    
            case 'luggage':
                return m.merge({ luggage: { ...PL } })
    
            case 'vehicle':
                return m.merge({ vehicle: PL })
    
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
            default:
                return state
        }
    }

    else return state

    
}