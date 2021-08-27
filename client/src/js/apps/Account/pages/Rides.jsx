import React, { useEffect, useContext } from 'react';

// Import Context
import AppContext from '../store/AppContext';

// Import Components
import AccountPage from '../components/AccountPage';
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


    // Create Component
    return (
        <AccountPage showLoader={!reservations} >
            {reservations && reservations.all.length ? (
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
                <div className="animate-item">You got no reservations you poor fuck</div>
            )}
        </AccountPage>
    )

};


export default Rides;