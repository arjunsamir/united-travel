
const API_KEY = 'AIzaSyDoZ26XMBSKktL9yuvUapEO-X7lHzOZIlY';


const loadMapScript = () => new Promise(resolve => {

    const scriptId = 'google-maps-sdk';
    const ref = document.querySelectorAll('script')[0];

    if (document.getElementById(scriptId)) return resolve();

    const js = document.createElement('script');
    js.id = scriptId;
    js.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`;
    js.addEventListener('load', resolve);

    ref.parentNode.insertBefore(js, ref);

});

const defaultMapOptions = {
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


export default class Map {

    constructor(options, container) {

        this.options = {
            map: options ?? defaultMapOptions,
            directions: {
                origin: { placeId: null },
                destination: { placeId: null },
                travelMode: 'DRIVING',
                drivingOptions: {
                    departureTime: new Date('June 22 2020 12:30'),
                    trafficModel: 'pessimistic'
                }
            }
        };

        this.state = {
            current: 'origin',
            markers: []
        };

        this.elements = {
            map: container.children('#booking-map'),
            searchBox: container.children('#booking-map-search-box')
        };

    }

    placeMarkers() {

        [this.origin, this.destination].filter(place => place).forEach(place => {

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

    async load() {

        await loadMapScript();

        // Initialize New Map Objects
        this.map = new google.maps.Map(this.elements.map, this.options.map);
        this.searchBox = new google.maps.places.SearchBox(this.elements.searchBox);
        this.geocoder = new google.maps.Geocoder;
        this.service = new google.maps.DirectionsService;
        this.renderer = new google.maps.DirectionsRenderer;


        this.dir.renderer.setMap(this.map);

        return 'loaded map successfully'

    }

}