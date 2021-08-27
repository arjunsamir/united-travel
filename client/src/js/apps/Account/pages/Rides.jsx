import React, { useEffect, useContext } from 'react';

// Import Context
import AppContext from '../store/AppContext';

// Import Components
import Loader from '../../components/Loader';
import ReservationList from '../components/ReservationList';

// Import Helpers
import axios from 'axios';
import dayjs from 'dayjs';

const sortFilter = (a, b) => a.timestamp - b.timestamp;
const getTimestamps = r => ({ ...r, timestamp: dayjs(r.schedule.pickup).unix() });

const Rides = () => {

    // Destructure State
    const { state: { reservations, id }, update } = useContext(AppContext);


    // Get Reservations on Load
    useEffect(() => {

        // Get And Sort Reservations
        const fetchReservations = async () => {

            const timer = $.timer(1000).start();

            const res = await axios(`/api/booking/reservations/users/${id}`);

            if (!res?.data?.reservations) return;

            const today = dayjs();

            const filtered = {
                all: res.data.reservations.map(getTimestamps).sort(sortFilter),
                upcoming: [],
                past: []
            };

            filtered.all.forEach(r => {

                if (dayjs(r.schedule.pickup, "MM-DD-YYYY H:mm").isBefore(today)) filtered.past.push(r);
                else filtered.upcoming.push(r);
                
            });

            await timer.hold();

            update("reservations")(filtered);

        }

        // Initialize Load
        if (!reservations) fetchReservations();

    }, []);


    // Create component
    return reservations ? (
        <div className="account__content">
            <h2 className="account__title animate-item">Hello <span>Arjun</span></h2>

            {reservations.all.length ? (
                <>
                    <ReservationList
                        label="Upcoming Reservations"
                        reservations={reservations.upcoming}
                        fallback={"No upcoming reservations..."}
                    />
                    
                    <ReservationList
                        label="Past Reservations"
                        reservations={reservations.past}
                        fallback={"No past reservations..."}
                    />
                </>
            ) : (
                <div>You got no reservations you poor fuck</div>
            )}

            

        </div>
    ) : <Loader />

};


export default Rides;