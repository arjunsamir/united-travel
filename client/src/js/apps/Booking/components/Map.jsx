// Import Default React Stuff
import React, { useContext, useEffect } from 'react';

// Import Context
import AppContext from '../store/context';

// Import Google Maps
import useGoogleMaps from '../helpers/useGoogleMaps';


// Cteate Map Component
const Map = ({ update }) => {

    // Import Global State
    const { state } = useContext(AppContext);

    // Load Google Maps
    const mapElement = useGoogleMaps(update);

    // Create Map
    return (
        <div className="booking__map">
            <div id="google-map" ref={mapElement}></div>
        </div>
    )

}

export default Map;