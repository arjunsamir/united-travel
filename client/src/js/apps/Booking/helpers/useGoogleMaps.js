import { useEffect, useRef } from "react";

// Import Config
import config from '../../data/config';

// Import Helpers
import axios from "axios";
import { insertScript } from '../../helpers/utils';

// Create Custom Hook
const useGoogleMaps = (updateState) => {

    const element = useRef();

    useEffect(() => {

        const load = async () => {

            let data;

            await Promise.all([
                insertScript(`https://maps.googleapis.com/maps/api/js?key=${config.maps.api_key}&libraries=places`, 'google-maps-sdk'),
                axios('/api/data/map').then(res => data = res.data)
            ]);

            const { options, polylineOptions } = data;

            updateState("MAP", {
                map: new google.maps.Map(element.current, options),
                geocoder: new google.maps.Geocoder(),
                directions: new google.maps.DirectionsService(),
                renderer: new google.maps.DirectionsRenderer({
                    polylineOptions: new google.maps.Polyline(polylineOptions)
                }),
                autoComplete: new google.maps.places.AutocompleteService()
            });

        }
        
        load();

    }, []);

    return element;

}

export default useGoogleMaps;