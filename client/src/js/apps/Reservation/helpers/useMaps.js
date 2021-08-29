import { useEffect, useRef, useState } from "react";

// Import Config
import config from '../../data/config';


// Import Helpers
import axios from "axios";
import { insertScript } from '../../helpers/utils';


// Create Class To Handle Map Changes
class AppMap {

    // Initialize Map
    constructor({ data, element, origin, destination }) {

        // Destructure Things
        const { options, polylineOptions } = data;

        // Google Mpas Services
        this.map = new google.maps.Map(element, options);
        this.directions = new google.maps.DirectionsService();
        this.renderer = new google.maps.DirectionsRenderer({
            polylineOptions: new google.maps.Polyline(polylineOptions)
        });

        // Set Origin and Destination
        this.origin = origin;
        this.destination = destination;

    }


    // Get Route From Google Maps
    getRoute() {

        // Set Map
        this.renderer.setMap(this.map);

        this.directions.route({
            origin: { placeId: this.origin },
            destination: { placeId: this.destination },
            travelMode: "DRIVING"
        }, (r, s) => this.renderRoute(r, s));

    }


    // Render Route To Map and update state
    renderRoute(res, status) {

        // Check if response is valid
        if (status !== 'OK' || !res) return;

        // Render Rout To map
        this.renderer.setDirections(res);

    }

}


// Create Custom Hook
const useGoogleMaps = (origin, destination) => {

    // Create Reference
    const e = useRef();
    const [map, setMap] = useState();


    // Load Map
    useEffect(() => {

        const load = async () => {

            let data;

            await Promise.all([
                insertScript(`https://maps.googleapis.com/maps/api/js?key=${config.maps.api_key}&libraries=places`, 'google-maps-sdk'),
                axios('/api/data/map').then(res => data = res.data)
            ]);

            setMap(new AppMap({ data, element: e.current, origin, destination }))

        }
        
        load();

    }, []);

    // Update Map
    useEffect(() => {

        if (map) map.getRoute()
    
    }, [map]);

    // Return Element
    return [e, map];

}


// Export Hook
export default useGoogleMaps;