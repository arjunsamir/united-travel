// Import Default React Stuff
import React from 'react';

// Import Google Maps
import useMaps from '../helpers/useMaps';


// Cteate Map Component
const Map = ({ origin, destination }) => {

    // Enable Google Maps
    const [ mapElement ] = useMaps(origin, destination);

    // Create Map
    return (
        <div className="booking__map min">
            <div id="google-map" ref={mapElement}></div>
        </div>
    )

}

export default Map;