import React, { useEffect, useContext, useState } from 'react';

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
    const { state: { reservations }, update } = useContext(AppContext);


    // Create Local State
    const [isLoading, setIsLoading] = useState(!reservations);


    // Get Reservations on Load
    useEffect(() => {

        // Get And Sort Reservations
        const fetchReservations = async () => {

            const timer = $.timer(1000).start();

            const res = await axios('/api/booking/reservations/users/me');

            if (!res?.data?.reservations) return;

            const today = dayjs();

            const filtered = {
                all: res.data.reservations.map(getTimestamps).sort(sortFilter),
                upcoming: [],
                cancelled: [],
                past: []
            };

            filtered.all.forEach(r => {

                if (r.status === 'cancelled') filtered.cancelled.push(r);
                else if (dayjs(r.schedule.pickup, "MM-DD-YYYY H:mm").isBefore(today)) filtered.past.push(r);
                else filtered.upcoming.push(r);
                
            });

            await timer.hold();

            update("reservations")(filtered);

            setIsLoading(false);

        }

        // Initialize Load
        // if (!reservations) fetchReservations();

    }, []);


    // Create Component
    return (
        <AccountPage showLoader={isLoading} >
            {reservations && reservations.all.length ? (
                <>
                    <ReservationList
                        label="Upcoming Reservations"
                        reservations={reservations.upcoming}
                        fallback={"No upcoming reservations..."}
                        setLoader={setIsLoading}
                    />
                    
                    <ReservationList
                        label="Past Reservations"
                        reservations={reservations.past}
                        fallback={"No past reservations..."}
                        setLoader={setIsLoading}
                    />

                    <ReservationList
                        label="Cancelled Reservations"
                        reservations={reservations.cancelled}
                        fallback={"No cancelled reservations..."}
                        setLoader={setIsLoading}
                    />
                </>
            ) : (
                <div className="animate-item">You haven't made any reservations yet.</div>
            )}
        </AccountPage>
    )

};


export default Rides;