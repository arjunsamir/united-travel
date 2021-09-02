// Import Base React Shit
import React, { useContext } from 'react';

// Import Context
import AppContext from '../AppContext';

// Import Components
import Cancel from './Cancel';
import { BackButton } from '../../components/Buttons';

// Import Helpers
import dayjs from 'dayjs';
import { toHalf } from '../../helpers/utils';


const Wrapper = ({ children }) => (
    <div className="booking__container">
        <div className="booking-view">
            <div className="booking-view__content">
                {children}
            </div>
        </div>
    </div>
)


const format = "MM-DD-YYYY H:mm";


const canCancel = (date, status) => {

    if (!window.settings || !window.settings?.cancellation?.allowed) return false;

    if (status !== 'ready') return false;

    const time = dayjs(date, format).subtract(window.settings.cancellation.hoursBefore, 'hour');
    const now = dayjs();
    return now.isBefore(time);

}


// Crate Component
const ReservationDetails = () => {

    const { reservation: r, copy, back, user } = useContext(AppContext);

    console.log(copy);

    // Create Shortcuts
    const s = copy.steps.Summary;
    const p = r.payment;
    const sh = r.schedule;
    const [csr, csf, csb] = copy.steps.ChildSeats.inputs;
    const {
        passengers: cs,
        vehicle: v
    } = r;
    const cc = {
        seats: copy.steps.Vehicle.seats,
        passengers: copy.steps.Passengers.title
    }

    return (
        <Wrapper>

            {back && <BackButton onClick={back.onClick} text={back.text} />}

            <div className="booking-view__header animate-children">
                <h4>{s.title} <span>{r.code.toUpperCase()}</span></h4>
                {r.status !== "cancelled" ? (
                    <h5>${(p.total / 100).toFixed(2)} - {p.method.brand[0].toUpperCase() + p.method.brand.substring(1)} {p.method.last4}</h5>
                ) : (
                    <h5>${(p.total / 100).toFixed(2)} - Refunded</h5>
                )}
            </div>

            <div className="animate-children">
                <p>{user.name}</p>
                <p>{user.email}</p>
            </div>

            <hr className="booking-view__divider animate-item" />


            <div className="booking-view__route">
                <h6 className="animate-item bold">{dayjs(sh.pickup, format).format('dddd MMMM D, YYYY')}</h6>
                <div className="booking-view__route-container animate-item">
                    <div className="booking-view__route-icon">
                        <span />
                        <hr />
                        <span />
                    </div>
                    <div className="booking-view__route-details animate-children">
                        <p>{dayjs(sh.pickup, format).format("h:mm A")}, {r.origin.name}</p>
                        <p>{dayjs(sh.dropoff, format).format("h:mm A")}, {r.destination.name}</p>
                    </div>
                </div>
            </div>


            {r.service_type !== "general" && (
                <>

                    <div className="booking-view__block animate-children">
                        <h6>{s.services[r.service_type]}</h6>
                        {r.service_type === 'airport' ? (
                            <>
                                <p>{r.flight.airline}, {s.airport.flight} {r.flight.number}</p>
                                <p>{s.airport[r.flight.type]}, {dayjs(r.flight.time, format).format("h:mm A")} {r.flight.type === 'departing' && s.airport.buffer.replace('{h}', toHalf(r.flight.buffer))}</p>
                            </>
                        ) : (
                            <>
                                <p>{r.cruise.line}, {r.cruise.ship}</p>
                                <p>{s.cruise[r.cruise.type]}, {dayjs(r.cruise.time, format).format("h:mm A")} {r.cruise.type === 'departing' && s.cruise.buffer.replace('{h}', toHalf(r.cruise.buffer))}</p>
                            </>
                        )}
                    </div>
                </>
            )}


            <div className="booking-view__vehicle animate-item">
                <div>
                    <h6>{v[`info_${window.locale}`].name}</h6>
                    <p>{r.passengers.total} {cc.passengers}</p>
                    {!!cs.rearSeats && <p>{cs.rearSeats} × {csr.label} {cc.seats}</p>}
                    {!!cs.frontSeats && <p>{cs.frontSeats} × {csf.label} {cc.seats}</p>}
                    {!!cs.boosterSeats && <p>{cs.boosterSeats} × {csb.label} {cc.seats}</p>}
                </div>
                <div className="booking-view__vehicle-image">
                    <img src={v.image} alt="Vehicle image" />
                </div>
            </div>


            {r.notes && (
                <div className="booking-view__block animate-children">
                    <h6>{s.notes}</h6>
                    <p>{r.notes}</p>
                </div>
            )}

            {canCancel(sh.pickup, r.status) && <Cancel reservation={r} />}

        </Wrapper>
    )

};


export default ReservationDetails;