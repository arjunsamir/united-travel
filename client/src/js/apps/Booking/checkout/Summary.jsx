import React, { useContext } from 'react';

// Import Context
import AppContext from '../store/context';

// Import Components
import BookingPage from '../components/BookingPage';

// Import Helpers
import dayjs from 'dayjs';
import { toHalf } from '../../helpers/utils';


const Summary = () => {

    // Destructure State and create shortcut variables
    const { state, appCopy } = useContext(AppContext);
    const copy = appCopy.steps[state.app.step];
    const r = state.reservation;
    const { childSeats: cs, vehicle: v } = r;
    const [csr, csf, csb] = appCopy.steps.ChildSeats.inputs;
    const cc = {
        seats: appCopy.steps.Vehicle.seats,
        passengers: appCopy.steps.Passengers.title
    }

    return (
        <BookingPage
            back="Notes"
            next={state.app.isLoggedIn  ? "Checkout" : "Login"}
        >
            <div className="booking-view__header">
                <div className="booking-view__res-total animate-children">
                    <h4>{copy.title}</h4>
                    <h5>${r.vehicle.cost.dollars}</h5>
                </div>
            </div>

            <div className="booking-view__route">
                <p className="animate-item">{dayjs(r.schedule.pickup).format('dddd MMMM D, YYYY')}</p>
                <div className="booking-view__route-container">
                    <div className="booking-view__route-icon animate-item">
                        <span></span>
                        <hr />
                        <span></span>
                    </div>
                    <div className="booking-view__route-details animate-children">
                        <p>{dayjs(r.schedule.pickup).format('h:mm A')}, {r.origin.name}</p>                            
                        <p>{dayjs(r.schedule.dropoff).format('h:mm A')}, {r.destination.name}</p>                            
                    </div>
                </div>
            </div>

            {r.serviceType !== 'general' && (
                <>
                    <hr className="booking-view__divider animate-item" />

                    <div className="booking-view__block animate-children">
                        <h6>{copy.services[r.serviceType]}</h6>
                        {r.serviceType === 'airport' ? (
                            <>
                                <p>{r.flight.airline}, {copy.airport.flight} {r.flight.number}</p>
                                <p>{copy.airport[r.flight.type]} {r.flight.type === 'departing' && copy.airport.buffer.replace('{h}', toHalf(r.flight.buffer))}</p>
                            </>
                        ) : (
                            <>
                                <p>{r.cruise.line}, {r.cruise.ship}</p>
                                <p>{copy.cruise[r.cruise.type]} {r.cruise.type === 'departing' && copy.cruise.buffer.replace('{h}', toHalf(r.cruise.buffer))}</p>
                            </>
                        )}
                    </div>
                </>
            )}

            <div className="booking-view__vehicle animate-item">
                <div>
                    <h6>{v[`info_${window.locale}`].name}</h6>
                    <p>{r.passengers} {cc.passengers}</p>
                    {!!cs.rear && <p>{cs.rear} × {csr.label} {cc.seats}</p>}
                    {!!cs.front && <p>{cs.front} × {csf.label} {cc.seats}</p>}
                    {!!cs.booster && <p>{cs.booster} × {csb.label} {cc.seats}</p>}
                </div>
                <div className="booking-view__vehicle-image">
                    <img src={v.image} alt="Vehicle image" />
                </div>
            </div>
            
            {r.notes && (
                <div className="booking-view__block animate-children">
                    <h6>{copy.notes}</h6>
                    <p>{r.notes}</p>
                </div>
            )}

            
        </BookingPage>
        
    )
};


export default Summary;