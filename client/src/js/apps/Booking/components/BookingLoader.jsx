import React from 'react';

// Import Components
import Loader from '../../components/Loader';

// Craete Wrapped Laoder
const BookingLoader = () => {

    return (
        <div className="booking__loader">
            <Loader />
        </div>
    );
    
}

export default BookingLoader;