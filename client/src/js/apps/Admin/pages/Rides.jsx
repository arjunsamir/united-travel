import React, { useEffect, useContext, useState } from 'react';

// Import Context
import AppContext from '../store/AppContext';

// Import Components
import Dropdown from '../../components/Dropdown';
import AccountPage from '../components/AccountPage';
import Loader from '../../components/Loader';
import ReservationList from '../components/ReservationList';

// Import Helpers
import { useObjectState } from '../../helpers/hooks';
import axios from 'axios';
import dayjs from 'dayjs';

const sortFilter = (a, b) => a.timestamp - b.timestamp;
const getTimestamps = r => ({ ...r, timestamp: dayjs(r.schedule.pickup).unix() });


const dropdownOptions = [
    {
        text: "Upcoming",
        value: "ready"
    },
    {
        text: "Complete",
        value: "complete"
    },
    {
        text: "Cancelled",
        value: "cancelled"
    }
];

const Rides = () => {

    // Destructure State
    const { state: { reservations }, update, transition } = useContext(AppContext);


    // Create Local State
    const [isLoading, setIsLoading] = useState(!reservations);
    const [api, setApi] = useObjectState({
        status: 'ready',
        page: 1,
        limit: 5
    })


    // Get Reservations on Load
    useEffect(() => {

        // Get And Sort Reservations
        const fetchReservations = async () => {

            setIsLoading(true);

            const timer = $.timer(1000).start();

            const res = await axios(`/admin/reservations?page=${api.page}&limit=${api.limit}&status=${api.status}`);

            if (!res?.data?.reservations) return;

            let filtered = res.data.reservations.map(getTimestamps).sort(sortFilter);

            if (api.status !== 'ready') filtered = filtered.reverse();

            await timer.hold();

            if (api.page > 1) filtered = [...reservations, ...filtered];

            update("reservations")(filtered);

            setIsLoading(false);

            transition.update();

        }

        // Initialize Load
        fetchReservations();

    }, [api.status, api.page]);


    // Create Component
    return (
        <AccountPage>
            <div className="account__fields">
                <Dropdown
                    id="reservation-select"
                    label="Select Type"
                    placeholder="Reservation Status"
                    options={dropdownOptions}
                    selected={api.status}
                    onSelect={(selected) => setApi({ status: selected.value, page: 1 })}
                />
            </div>

            {isLoading ? (
                <Loader />
            ) : (
                reservations && reservations.length ? (
                    <>
                        <ReservationList
                            label="Reservations"
                            reservations={reservations}
                            fallback={"No upcoming reservations..."}
                            setLoader={setIsLoading}
                            api={api}
                            loadMore={() => setApi({ page: api.page + 1 })}
                        />
    
                    </>
                ) : (
                    <div className="animate-item">No Reservations Found</div>
                )
            )}
        </AccountPage>
    )

};


export default Rides;