// Import Default React Stuff
import React from 'react';

// Import Google Maps
import useGoogleMaps from '../helpers/useGoogleMaps';


// Cteate Map Component
const Map = () => {

    // Enable Google Maps
    const mapElement = useGoogleMaps();

    // Create Map
    return (
        <div className="booking__map">
            <div id="google-map" ref={mapElement}></div>
        </div>
    )

}

export default Map;