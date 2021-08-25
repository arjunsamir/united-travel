import React from 'react';

// import Components
import Oopsie from '../components/Oopsie'


 // Create App
const App = ({}) => {

    return window.currentReservation ? (
        <div className="reservation">
            Reservation App
        </div>
    ) : (
        <Oopsie />
    )

};


export default App;