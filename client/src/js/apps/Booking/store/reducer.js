import Merger from '../helpers/Merger';

import initialState from './initialState';

import dayjs from 'dayjs';

// Set Current Steps
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
    return m.validate('ServiceType');

}


// Stet Current Port
const setServicePort = (m, PL, { portType, service }) => {

    const port = m.state.app[`${portType}s`].find(p => p.code === PL) ?? m.state.reservation[service][portType]

    // Destructure Properties
    const { placeId, address, name } = port;

    // Update Airport
    m.merge({ [portType]: { ...port } }, service)
    
    // Update Origin/Destination
    switch (m.state.reservation[service].type) {
        case 'departing':
            m.merge({ destination: { placeId, address, name }})
            m.merge({ origin: { ...initialState.reservation.origin } });
            break;

        default:
            m.merge({ origin: { placeId, address, name } })
            m.merge({ destination: { ...initialState.reservation.destination } });
    }

    return m.state;
}


const setServiceTime = (m, key) => {

    const { reservation } = m.state;
    const { type, time, buffer } = reservation[key];

    if (type === 'departing') {
        // Add Buffer
        if (!buffer) return;
        reservation.schedule.dropoff = dayjs(time, 'MM-DD-YYYY H:mm').subtract(buffer, 'hours').format('MM-DD-YYYY H:mm');
        reservation.schedule.pickup = null;
    }
    else {
        reservation.schedule.pickup = time;
        reservation.schedule.dropoff = null;
    }

}


const setRoute = (m, PL) => {

    const { pickup, dropoff } = m.state.reservation.schedule;

    const f = 'MM-DD-YYYY H:mm', u = 'second', k = 'schedule';

    if (PL?.eta?.value)  {
        if (!pickup) m.merge({ pickup: dayjs(dropoff, f).subtract(PL.eta.value, u).format(f) }, k);
        else m.merge({ dropoff: dayjs(pickup, f).add(PL.eta.value, u).format(f) }, k);
    }

    return m.merge({ route: { ...PL } });

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
                m.merge({ number: PL }, 'flight');
                return m.validate('FlightLocation');
            
            case 'cruise-ship': 
                m.merge({ ship: PL }, 'cruise');
                return m.validate('CruiseLocation');

            case 'flight-time':
                m.merge({time: PL}, 'flight');
                setServiceTime(m, 'flight');
                return m.validate('FlightSchedule');

            case 'cruise-time':
                m.merge({time: PL}, 'cruise');
                setServiceTime(m, 'cruise');
                return m.validate('CruiseSchedule');
    
            case 'airline': 
                m.merge({ airline: PL }, 'flight');
                return m.validate('FlightLocation');

            case 'cruise-line':
                m.merge({ line: PL }, 'cruise');
                return m.validate('CruiseLocation');
    
            case 'flight-type':
                m.merge({ type: PL }, 'flight')
                setServicePort(m, null, { portType: 'airport', service: 'flight' });
                return m.validate('FlightSchedule');

            case 'cruise-type':
                m.merge({ type: PL }, 'cruise');
                setServicePort(m, null, { portType: 'port', service: 'cruise' });
                return m.validate('CruiseSchedule');

            case 'flight-buffer':
                m.merge({ buffer: parseFloat(PL) }, 'flight');
                setServiceTime(m, 'flight')
                return m.validate('FlightSchedule');

            case 'cruise-buffer':
                m.merge({ buffer: parseFloat(PL) }, 'cruise');
                setServiceTime(m, 'cruise')
                return m.validate('CruiseSchedule');
    
            case 'airport':
                setServicePort(m, PL, { portType: 'airport', service: 'flight' });
                return m.validate('FlightLocation');

            case 'cruise-port':
                setServicePort(m, PL, { portType: 'port', service: 'cruise' });
                return m.validate('CruiseLocation');
    
            case 'origin':
            case 'destination':
                m.merge({ [type]: PL ? {
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
                return m.validate('Route');
    
            case 'pickup-time':
                m.merge({ pickup: PL }, 'schedule');
                return m.validate('PickupTime');
    
            case 'dropoff-time':
                return m.merge({ dropoff: PL }, 'schedule')
    
            case 'route':
                return setRoute(m, PL);
    
            case 'passengers':
                m.merge({ passengers: PL });
                return m.validate('Passengers');

            case 'child-seats':
                const [key, value] = PL;
                m.merge({ [key]: value }, 'childSeats');
                return m.validate('ChildSeats');
    
            case 'vehicle':
                m.merge({ vehicle: PL })
                return m.validate('Vehicle');

            case 'notes':
                m.merge({ notes: PL })
                return m.validate('Notes');

            case 'payment': 
                return m.merge({ payment: { ...PL } })
            default:
                return state
        }
    }

    else if (method === 'set') {
        switch(type) {
            case 'step':
                m.merge({ step: PL });
                return m.validate(PL);
            case 'airports':
                return m.merge({ airports: [ ...PL ] })
            case 'ports':
                return m.merge({ ports: [ ...PL ] })
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