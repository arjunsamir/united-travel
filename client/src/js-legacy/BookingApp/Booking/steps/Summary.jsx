// Import Defaults
import React, { useContext, useEffect, useState } from 'react';

// Import Context
import { AppContext } from '../../store';

// Import Organizms
import BookingCard from '../../components/organisms/BookingCard';

// Utilities
import axios from 'axios';
import { bemify, toUSD } from '../../helpers/utils';
const bc = bemify('booking-card');


const Summary = ({ navigateTo, updateState, map }) => {

    // Import State & Dispatch
    const { state } = useContext(AppContext);

    // Destructure State
    const { origin, destination, quote } = state.reservation;
    const { user } = state.app;

    // Create Local State
    const [error, setError] = useState();

    useEffect(() => {

        const getQuote = async () => {

            try {
                const res = await axios.post('/api/booking/quote', {
                    distance: 28478,
                    vehicle: 'upsize_md',
                    origin: 'ChIJ85K0xidj54gRbeERlDa5Sq0',
                    destination: 'ChIJ-0qgNoF_3YgRg3Lh7xHDooU'
                })

                if (!res?.data?.quote || !res.data.quote.cost) return setError('Something is wrong...')

                const { _id, vehicle, origin, destination, cost } = res.data.quote;
                
                updateState('QUOTE', { id: _id, vehicle, origin, destination, cost });
            }

            catch (err) {
                setError(err);
            }

        }

        if (!quote.cost) getQuote()
        else if (quote.origin !== origin.placeId || quote.destination !== destination.placeId) getQuote();

    }, [])

    return (
        <BookingCard
            title={<>Booking <span>summary</span></>}
            allowed={['previous', 'next']}
            showError={error}
            previous={() => navigateTo('notes')}
            showLoader={!map}
            next={() => navigateTo(user ? 'checkout' : 'login')}
            nextLabel="Continue To Payment"
        >
            <div className={bc("summary")}>

                <div className={bc("schedule")}>

                    <div>
                        <h5>Pick Up</h5>
                        <p>Orlando Internationl Airport</p>
                        <hr />
                        <h6>Wed Jun 23, 2021</h6>
                        <h4>10:30am</h4>
                    </div>
                    
                    <div>
                        <h5>Drop Off</h5>
                        <p>Disney Springs</p>
                        <hr />
                        <h6>Wed Jun 23, 2021</h6>
                        <h4>11:00am</h4>
                    </div>

                </div>

                <div className={bc("info")}>

                    <div>
                        <p>JetBlue Airways</p>
                        <p>Flight 2206</p>
                        <p>3 Passengers, 4 Bags</p>
                    </div>

                    <img src="/img/vehicles/thumbs/small.webp" alt="vehicle chosen" />

                </div>

                <h3 className={bc("price")}>
                    {toUSD(quote.cost)}
                </h3>


            </div>

        </BookingCard>
    )

}

export default Summary;
