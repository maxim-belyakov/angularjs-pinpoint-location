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


const app = angular.module('app', ['ngStorage'])


app.controller('mapCtrl', function ($scope, $localStorage, $sessionStorage) {
    const ctrl = this;

    // $scope.saveToLocal = saveToLocal;

    $scope.$storage = $localStorage;

    ctrl.latitude = null;
    ctrl.longitude = null;

    ctrl.loadLocation = loadLocation;
    ctrl.saveLocation = saveLocation;
    ctrl.defineMyLocation = defineMyLocation;

    function defineMyLocation() {
        if (navigator.geolocation) {
            var getPosition = function (options) {
                return new Promise(function (resolve, reject) {
                    navigator.geolocation.getCurrentPosition(resolve, reject, options);
                });
            }

            getPosition()
                .then((position) => {
                    showPosition(position.coords.latitude, position.coords.longitude)
                })
                .catch((err) => {
                    console.error(err.message);
                    alert(err.message);
                });

        } else {
            x.innerHTML = "Geolocation is not supported by this browser.";
        }
    }

    function loadLocation() {
        if (ctrl.latitude && ctrl.longitude) {
            showPosition(ctrl.latitude, ctrl.longitude)
        } else {
            alert('Incorrect data')
        }
    }

    function saveLocation() {
        if (ctrl.latitude && ctrl.longitude) {
            $localStorage.latitude = ctrl.latitude;
            $localStorage.longitude = ctrl.longitude;
        } else {
            alert('Incorrect data')
        }
    }

    function showPosition(latitude, longitude) {
        ctrl.latitude = parseFloat(latitude).toFixed(4);
        ctrl.longitude = parseFloat(longitude).toFixed(4);
        map.setCenter({ lat: latitude, lng: longitude });
        map.setZoom(9);
        window.onload = function () {
            moveMapToBerlin(map);
        }
    }
})
