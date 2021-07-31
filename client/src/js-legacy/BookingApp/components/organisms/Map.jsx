// Import Defaults
import React, { useState, useEffect, useRef, useContext } from 'react';

// Import Context
import { AppContext } from '../../store';

// Import Libraries
import axios from 'axios';

// Import Utilities
import { insertScript } from '../../helpers/utils';

// Import Config
import config from '../../data/config';

const Map = ({ onLoad, updateState }) => {

    const { state } = useContext(AppContext);

    // Create Local State
    const [scriptLoaded, setScriptLoaded] = useState(false);
    const [mapLoaded, setMapLoaded] = useState(false);
    
    // Create DOM Refs
    const element = useRef();

    // Create Map Refs
    const mapData = useRef(localStorage.getItem('map-data'))
    const map = useRef();
    const services = useRef();
    const markers = useRef([]);
    const bounds = useRef()
    const places = useRef({
        origin: {},
        destination: {}
    })

    // Register Shortcuts
    const { origin, destination, route } = state.reservation;

    // Define Helper Functions
    const placeMarker = async (o, d) => {

        // Create Pair
        const key = o ? 'origin' : 'destination';
        const id = o || d;

        // Create Object Shortcut
        let place = places.current[key];
        
        // Get Geolocation Data
        if (place.place_id != id || !place.geometry) {

            await new Promise(resolve => {
                services.current.geocoder.geocode({ placeId: id }, (res, status) => {
                    place = places.current[key] = res.length ? res[0] : {};
                    resolve();
                })
            })

        }

        // Return if No Location Found
        if (!place.geometry) return;

        markers.current.push(new google.maps.Marker({
            title: key,
            position: place.geometry.location,
            animation: google.maps.Animation.DROP,
            map: map.current
        }))

        if (place.geometry.viewport) bounds.current.union(place.geometry.viewport);
        else bounds.current.extend(place.geometry.location);

        map.current.fitBounds(bounds.current);

    }

    const calculateAndRenderRoute = (o, d) => {

        // Set Map
        services.current.renderer.setMap(map.current);

        // Render Directions
        services.current.directions.route({
            origin: { placeId: o },
            destination: { placeId: d },
            travelMode: 'DRIVING',
            drivingOptions: {
                departureTime: new Date(),
                trafficModel: 'pessimistic'
            }
        }, (res, status) => {

            console.log(res);

            // Check if valid response
            if (status !== 'OK' || !res) return;

            // Render Route To Map
            services.current.renderer.setDirections(res);

            // Update Route Information
            const info = res?.routes[0]?.legs[0] ?? {};
            const { distance, duration, duration_in_traffic } = info;

            // Update State To Show Duration
            updateState('ROUTE', {
                distance,
                duration,
                eta: duration_in_traffic
            })

        })

    }

    const resetMap = () => {

        // Destructure Original Map Data
        const { zoom, center } = mapData.current.options;

        // Reset Properties
        map.current.setZoom(zoom);
        map.current.setCenter(center);
        
    }

    const clearMap = () => {

        // Define new bounds
        bounds.current = new google.maps.LatLngBounds();

        // Clear Markers
        markers.current.forEach(marker => marker.setMap(null));
        markers.current = [];

        // Unset Map
        services.current.renderer.setMap(null);
        services.current.directions = null;

        // Initialize New Directions Service
        services.current.directions = new google.maps.DirectionsService();

        // Unset Current Directions if set
        if (route.eta) updateState('ROUTE', {
            distance: null,
            duration: null,
            eta: null
        })

    }

    // Load Map Data
    useEffect(() => {

        Promise.all([insertScript(`https://maps.googleapis.com/maps/api/js?key=${config.maps.api_key}&libraries=places`, 'google-maps-sdk'), new Promise((resolve, reject) => {

            if (mapData.current) return resolve();

            try {
                axios('/api/data/map').then(res => {
                    mapData.current = res.data;
                    resolve()
                });
                
            }
            catch (err) {
                reject();
            }

        })]).then(() => setScriptLoaded(true))
        

    }, [])

    // Initialize Map
    useEffect(() => {

        if (!scriptLoaded) return;

        // Destructure Options
        const { options, polylineOptions } = mapData.current;

        // Create Map
        map.current = new google.maps.Map(element.current, options)

        // Register Services
        services.current = {
            geocoder: new google.maps.Geocoder(),
            directions: new google.maps.DirectionsService(),
            renderer: new google.maps.DirectionsRenderer({
                polylineOptions: new google.maps.Polyline(polylineOptions)
            }),
            autoComplete: new google.maps.places.AutocompleteService()
        }

        onLoad({
            map: map.current,
            services: services.current
        })

        setMapLoaded(true);


    }, [scriptLoaded])

    // Place Markers on the map
    useEffect(() => {

        const updateMap = async () => {

            // Create Shortcuts
            const o = origin.placeId;
            const d = destination.placeId;

            // Clear Map
            clearMap();

            // Return if No Location Set
            if (!o && !d) resetMap();

            // Render Route
            else if (o && d) calculateAndRenderRoute(o, d);

            // Render Single Marker
            else placeMarker(o, d);
            
        }

        if (mapLoaded) updateMap();

    }, [mapLoaded, origin.placeId, destination.placeId])

    return (
        <div className="booking__map">
            <div id="google-map" ref={element}></div>
        </div>
    )

}

export default Map;