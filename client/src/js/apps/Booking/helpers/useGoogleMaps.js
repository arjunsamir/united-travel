import { useEffect, useRef, useContext } from "react";

// Import Config
import config from '../../data/config';

// Import Context
import AppContext from '../store/context';

// Import Helpers
import axios from "axios";
import { insertScript } from '../../helpers/utils';


// Create Class To Handle Map Changes
class AppMap {

    // Initialize Map
    constructor(data, element, dispatcher) {

        // Destructure Things
        const { options, polylineOptions } = data;

        // Google Mpas Services
        this.map = new google.maps.Map(element, options);
        this.geocoder = new google.maps.Geocoder();
        this.directions = new google.maps.DirectionsService();
        this.renderer = new google.maps.DirectionsRenderer({
            polylineOptions: new google.maps.Polyline(polylineOptions)
        });
        this.autoComplete =  new google.maps.places.AutocompleteService()

        // Class Used Properties
        this.dispatcher = dispatcher;
        this.element = element;
        this.bounds = null;
        this.markers = [];
        this.data = data
        this.places = {
            origin: {},
            destination: {}
        }

    }


    // Place Map Markers
    async placeMarker(origin, destination) {

        // Create Key Value Pair
        const key = origin ? "origin" : "destination";
        const placeId = origin || destination;
        let place = this.places[key];

        if (place.place_id != placeId || !place.geometry) {

            await new Promise(resolve => {
                this.geocoder.geocode({ placeId }, (res) => {
                    place = this.places[key] = res.length ? res[0] : {};
                    resolve();
                })
            })

        }

        // Return if no location found
        if (!place.geometry) return;

        // Push Markers
        this.markers.push(new google.maps.Marker({
            title: key,
            position: place.geometry.location,
            animation: google.maps.Animation.DROP,
            map: this.map
        }));

        // Create Bounds
        if (place.geometry.viewport) this.bounds.union(place.geometry.viewport);
        else this.bounds.extend(place.geometry.location);

        // Apply bounds
        this.map.fitBounds(this.bounds);

    }


    // Get Route From Google Maps
    getRoute(origin, destination) {

        // Set Map
        this.renderer.setMap(this.map);


        this.directions.route({
            origin,
            destination,
            travelMode: "DRIVING",
            drivingOptions: {
                departureTime: new Date(),
                trafficModel: "pessimistic"
            }
        }, (r, s) => this.renderRoute(r, s));

    }


    // Render Route To Map and update state
    renderRoute(res, status) {
        
        // Check if response is valid
        if (status !== 'OK' || !res) return;

        // Render Rout To map
        this.renderer.setDirections(res);

        // Get Route Information
        const info = res?.routes[0]?.legs[0] ?? {};
        const { distance, duration, duration_in_traffic: eta } = info;

        // Update App State
        this.dispatcher("ROUTE", {
            distance,
            duration,
            eta
        })

    }


    // Reset Map
    reset() {

        // Get Original Map Options
        const { zoom, center } = this.data.options;

        // Reset Map
        this.map.setZoom(zoom);
        this.map.setCenter(center);

    }


    // Clear Previous Route & Markers
    clear(route) {

        // Define New Bounds
        this.bounds = new google.maps.LatLngBounds();

        // Clear Markers
        this.markers.forEach(marker => marker.setMap(null));
        this.markers = [];

        // Unset Map
        this.renderer.setMap(null);
        this.directions = null;

        // Initiaize New Directions Service
        this.directions = new google.maps.DirectionsService();

        // Update App State
        if (route.eta) this.dispatcher("ROUTE", {
            distance: null,
            duration: null,
            eta: null,
        })

    }


    // Update Map on Change
    update(origin, destination, route) {

        // Clear The Map
        this.clear(route);

        // Reset Map if No Locations Set
        if (!origin && !destination) this.reset();

        // Render Route if Both Set
        else if (origin && destination) this.getRoute({ placeId: origin }, { placeId: destination });

        // Render Single Marker
        else this.placeMarker(origin, destination);

    }

}


// Create Custom Hook
const useGoogleMaps = () => {

    // Destructure State
    const {
        state: {
            app: { map },
            reservation: { origin, destination, route }
        },
        update,
        updateApp
    } = useContext(AppContext);


    // Create Reference
    const e = useRef();


    // Load Map
    useEffect(() => {

        const load = async () => {

            let data;

            await Promise.all([
                insertScript(`https://maps.googleapis.com/maps/api/js?key=${config.maps.api_key}&libraries=places`, 'google-maps-sdk'),
                axios('/api/data/map').then(res => data = res.data)
            ]);

            updateApp("MAP", new AppMap(data, e.current, update));

        }
        
        load();

    }, []);

    // Update Map
    useEffect(() => {

        if (map) map.update(origin.placeId, destination.placeId, route)
    
    }, [map, origin.placeId, destination.placeId]);

    // Return Element
    return e;

}


// Export Hook
export default useGoogleMaps;