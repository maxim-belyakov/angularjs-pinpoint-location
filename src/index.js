import angular from "angular";
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/scss/main.scss'
import './js'

const _ = require('lodash');

// Here Map init
const platform = new H.service.Platform({ // Initialize the platform object:
    'apikey': 'rDM61hP-F7GsXZCliciC3qklmKpIXTXvlBqzjhoHA30'
});

const defaultLayers = platform.createDefaultLayers(); // Obtain the default map types from the platform object:

var map = new H.Map(document.getElementById('map'), // Step 2: initialize a map - this map is centered over Europe
    defaultLayers.vector.normal.map, {
    center: { lat: 50, lng: 5 },
    zoom: 4,
    pixelRatio: window.devicePixelRatio || 1
});

window.addEventListener('resize', () => map.getViewPort().resize()); // add a resize listener to make sure that the map occupies the whole container

//Step 3: make the map interactive
// MapEvents enables the event system
// Behavior implements default interactions for pan/zoom (also on mobile touch environments)
var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

// Create the default UI components
var ui = H.ui.UI.createDefault(map, defaultLayers);


// function moveMapToBerlin(map) {
//     map.setCenter({ lat: 52.5159, lng: 13.3777 });
//     map.setZoom(7);
// }
// // Now use the map as required...
// window.onload = function () {
//     moveMapToBerlin(map);
// }