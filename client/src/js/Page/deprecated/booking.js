
import HelloWeek from '../vendor/HelloWeek';
import moment from 'moment';


class Map {

    constructor(searchBox, map) {

        this.apiKey = 'AIzaSyDoZ26XMBSKktL9yuvUapEO-X7lHzOZIlY';

        this.options = {
            zoomControl: false,
            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: false,
            rotateControl: false,
            fullscreenControl: false,
            center: {lat: 28.540791, lng: -81.380352},
            zoom: 13,
            mapTypeId: 'roadmap'
        };

        this.elems = {
            map,
            input: searchBox
        };

        this.state = 'origin';
        this.markers = [];

    }


    placeMarkers() {

        const places = [this.origin, this.destination].filter(loc => loc);

        console.log(places);


        places.forEach(place => {

            if (!place.geometry) return;

            const icon = {
                url: place.icon ? place.icon : 'https://maps.gstatic.com/mapfiles/place_api/icons/airport-71.png',
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };


            this.markers.push(new google.maps.Marker({
                title: place.name,
                position: place.geometry.location,
                animation: google.maps.Animation.DROP,
                map: this.map,
                icon
            }));

            if (place.geometry.viewport) this.bounds.union(place.geometry.viewport);
            else this.bounds.extend(place.geometry.location)

        });

    }


    onChange() {

        // 1. Save Location From Search Box
        this.dir.options[this.state]['placeId'] = this[this.state].place_id;
        // console.log(this.dir.options);


        // 2. Clear Markers
        this.markers.forEach(marker => marker.setMap(null));
        this.markers = [];


        // 3. Return if no Locations are set
        if (!this.origin && !this.destination) return;


        // 4. Create new Bounds
        this.bounds = new google.maps.LatLngBounds();


        // 5. Place Markers
        this.placeMarkers();


        // 6. Fit Bounds
        this.map.fitBounds(this.bounds);


        // 7. Map Route
        //this.calculateRoute();


    }


    calculateRoute() {

        if (!this.origin || !this.destination) return;

        this.dir.service.route(this.dir.options, (res, status) => {

            if (status === 'OK') this.dir.renderer.setDirections(res);
            else console.error('Something went really wrong...');

        });
        
    }


    listen() {

        this.searchBox.addListener('places_changed', () => {
            this[this.state] = this.searchBox.getPlaces()[0];
            this.onChange();
        });

    }


    setOptions(state, type, time) {

        this.state = state;

        this.dir.options.drivingOptions = {
            trafficModel: 'pessimistic'
        };

        if (type === 'arriving') this.dir.options.drivingOptions.departureTime = time;
        else this.dir.options.drivingOptions.arrivalTime = time;

    }


    async find(placeId) {

        let response;

        await new Promise(resolve => {

            this.geocoder.geocode({ placeId }, (res, status) => {
                response = status === 'OK' ? true : false;
                this[this.state] = res[0];
                resolve();
            });

        });
        

        this.onChange();

        return response;

    }


    async load() {

        await new Promise(resolve => {

            const id = 'google-maps-sdk';
            const ref = document.querySelectorAll('script')[0];

            if (document.getElementById(id)) return;

            const js = document.createElement('script');
            js.id = id;
            js.src = `https://maps.googleapis.com/maps/api/js?key=${this.apiKey}&libraries=places`;
            js.addEventListener('load', () => resolve());
            ref.parentNode.insertBefore(js, ref);

        });

        this.map = new google.maps.Map(this.elems.map, this.options);
        this.searchBox = new google.maps.places.SearchBox(this.elems.input);
        this.geocoder = new google.maps.Geocoder;

        // Configure Directions Settings
        this.dir = {
            service: new google.maps.DirectionsService,
            renderer: new google.maps.DirectionsRenderer,
            options: {
                origin: { 'placeId': null },
                destination: { 'placeId': null },
                travelMode: 'DRIVING',
                drivingOptions: {
                    departureTime: new Date('June 22 2020 12:30'),
                    trafficModel: 'pessimistic'
                }
            }
        };

        this.dir.renderer.setMap(this.map);

        return 'loaded map successfully'

    }

}


class BookingForm {

    constructor() {

        this.form = $('#booking-form');

        this.groups = {
            flight: $('#flight-fields')
        };

        this.toggles = {
            location: $('input[name="location-toggle"]'),
            flight: $('#airport-toggle'),
            flightType: $('input[name="flight-type"]')
        };

        this.inputs = {
            search: $('#search-box'),
            flight: {
                airport: $('#flight-airport'),
                airline: $('#flight-airline'),
                number: $('#flight-number'),
                time: $('#flight-time'),
                cushion: $('#flight-cushion')
            },
            passengers: {
                adults: $('#passengers-adults'),
                children: $('#passengers-children'),
                infants: $('#passengers-infants')
            },
            luggage: {
                large: $('#luggage-large'),
                medium: $('#luggage-medium'),
                small: $('#luggage-small')
            }
        };

        this.buttons = {
            flight: $('#confirm-flight'),
            submit: $('button[type="submit"]')
        }

        this.data = {
            flight: {
                include: false
            },
            origin: {},
            destination: {},
            passengers: {},
            luggage: {},
            vehicle: {},
            details: {},
            schedule: {
                pickup: {},
                dropoff: {}
            }
        };

        this.temp = {};

    }


    async load() {

        this.map = new Map(this.inputs.search.e(), $('#map').e());

        this.calendar = new HelloWeek({
            langFolder: '/langs/hello-week/',
            lang: 'en',
            selector: '#booking-calendar',
            weekStart: 0,
            weekShort: false,
            monthShort: false,
            multiplePick: false,
            todayHighlight: true,
            onSelect: () => this.updateSchedule()
        });

        await this.map.load();
    }


    async updateFlightInformation() {

        // 1. Create Refrence Shortcut
        const i = this.inputs.flight;


        // 2. Get Airport Information
        const airport = i.airport.val().split(" ");


        // 3. Get Flight Type (Arriving or Departing)
        const type = this.toggles.flightType.map(radio => radio.checked ? radio.value : null).filter(val => val)[0];


        // 4. Update Flight Information
        this.data.flight = {
            type, 
            include: true,
            airport: airport[0],
            airline: i.airline.val(),
            number: i.number.val(),
            time: i.time.val(),
            cushion: i.cushion.val()
        };


        // 5. Define State & Time Variables
        const state = type === 'arriving' ? 'origin' : 'destination';
        const time = type === 'arriving' ? this.schedule.pickup : this.schedule.dropoff;


        // 6. Update Booking Schedule
        this.updateSchedule();


        // 7. Update Map Class For Navigation Estimates
        this.map.setOptions(state, type, time);


        // 8. Update Map With Marker and Calculate Directions
        const status = await this.map.find(airport[1]);
        if (!status) return console.error('GOOGLE API ERROR!!!');


        // 9. Update Booking Information
        this.data[state] = this.map[state];
        console.log(this.data);

    }


    updateSchedule(time) {

        this.temp.date = this.calendar.daysSelected[0] || moment.format('YYYY-MM-DD');
        this.temp.time = time;

        if (this.data.flight.include) {
            this.temp.date = this.calendar.daysSelected[0];
        }

        else {

        }



        this.time = '16:20';
        this.date = new Date(`${this.calendar.daysSelected[0]}T${this.time}:00`);

    }


    toggleSearchMode(e) {
        if (e.target.checked) this.map.state = e.target.value;
        console.log(this.map.state);
        this.inputs.search.setVal("");
    }

    listen() {
        this.map.listen();
        this.toggles.flight.on('change', e => this.groups.flight.css({ display: e.target.checked ? 'block' : 'none' }));
        this.toggles.flightType.on('change', e => this.inputs.flight.cushion.css({ display: e.target.checked && e.target.value === 'departing' ? 'block' : 'none' }));
        this.toggles.location.on('change', e => this.toggleSearchMode(e));
        this.buttons.flight.click(() => this.updateFlightInformation());
    }

}



export const initBooking = async () => {

    const form = new BookingForm();
    await form.load();
    form.listen();
    
};