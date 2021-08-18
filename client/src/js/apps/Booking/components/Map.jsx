// Import Default React Stuff
import React from 'react';

// Import Google Maps
import useGoogleMaps from '../helpers/useGoogleMaps';


// Cteate Map Component
const Map = () => {

    // Enable Google Maps
    const [mapElement, mapClass] = useGoogleMaps();

    // Create Map
    return (
        <div className={$.join("booking__map", [mapClass])}>
            <div id="google-map" ref={mapElement}></div>
        </div>
    )

}

export default Map;