import Merger from '../helpers/Merger';

import initialState from './initialState';

const setSteps = (m) => {

    // Switch Merger To Aoo State
    m.switch().merge({ steps: { ...initialState.app.steps } });

    // Create Dynamic Steps
    let dynamicSteps;

    // Get Dynamic Steps
    switch (m.state.reservation.serviceType) {
        case 'airport':
            dynamicSteps = ['FlightLocation', 'FlightSchedule'];
            break;
        case 'cruise':
            dynamicSteps = ['CruiseLocation', 'CruiseSchedule'];
            break;
        default:
            dynamicSteps = ['PickupTime'];
    };

    // Fill in step objects
    m.merge({ dynamic: dynamicSteps.map((s, i) => ({
        name: s,
        active: false,
        complete: false,
        group: 'dynamic',
        index: i
    })) }, 'steps');

    // Finally, Validate and return new state
    return m.validate('ServiceType', m.state.reservation.serviceType)

}


const setAirport = (m, PL) => {

    const airport = m.state.app.airports.find(apt => apt.code === PL) ?? m.state.reservation.flight.airport

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

    return m.state;
}



const reducer = (state, action) => {
    const [method, category, type] = action.type.toLowerCase().split('_');

    if (!state[category]) return state

    const m = new Merger(category, { ...state });

    let PL = action.payload;

    // Update Reservation State
    if (method === 'update') {
        switch(type) {
            case 'service-type':
                m.merge({ serviceType: PL });
                return setSteps(m);
    
            case 'flight-number':
                return m.merge({ number: PL }, 'flight')

            case 'flight-time':
                return m.merge({time: PL}, 'flight')
    
            case 'airline': 
                return m.merge({ airline: PL }, 'flight')
    
            case 'flight-type':
                m.merge({ type: PL }, 'flight')
                return setAirport(m)

            case 'flight-buffer':
                return m.merge({ buffer: parseFloat(PL) }, 'flight')
    
            case 'airport':
                return setAirport(m, PL);
    
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
                return m.merge({ passengers: PL });
    
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
            case 'map':
                return m.merge({ map: PL })
            default:
                return state
        }
    }

    else return state

};

export default reducer;