// Import base react stuff
import React, { useState } from 'react';

// Import Context
import AppContext from './AppContext';

// import Components
import Oopsie from '../components/Oopsie'
import Map from './components/Map';
import ReservationDetails from './components/ReservationDetails';


// Define Fallback Copy
const fallbackCopy = {
    en: "Sorry, we can't find your reservation.",
    es: "Lo sentimos, no podemos encontrar su reserva."
}

 // Create App
const App = ({ reservation, copy, back }) => {

    const [res, setReservation] = useState(reservation);

    return reservation ? (

        <AppContext.Provider value={{
            reservation: res,
            copy,
            back,
            updateApp: setReservation,
            user: (typeof reservation.user === 'object' ? reservation.user : window.currentUser) || {}
        }}>
            <section className="booking">
                <Map
                    origin={res.origin.placeId}
                    destination={res.destination.placeId}
                />
                <ReservationDetails />
            </section>
        </AppContext.Provider>

    ) : (

        <Oopsie
            src="https://storage.googleapis.com/utravel-site-content/img/not_found.png"
            copy={fallbackCopy[window.locale] || fallbackCopy.en}
        />

    )

};


export default App;