let url = 'https://api.wheretheiss.at/v1/satellites/25544';
let issLat = document.querySelector('#iss-lat');
let issLong = document.querySelector('#iss-long');
let time = document.querySelector('#time');

let issMarker;
let update = 10000;

let map = L.map('iss-map').setView([5, 5], 1); // Zoom all the way out
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 7,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1Ijoia2xvY2huZXIiLCJhIjoiY2s2bGg0ZW1lMDNxdDNxcGgxcHA3cXc5OCJ9.uJSahvjdbwopXFPk4_AYTA',
}).addTo(map);

let icon = L.icon({
    iconUrl: 'iss.png',
    iconSize: [50, 50],
    iconAnchor: [25, 25]
});

let max_failed_attempts = 2;
iss(max_failed_attempts);

function iss(attempts) {
    if (attempts <= 0) {
        console.log('Errors have occurred. Abandoning efforts to get ISS position');
        return // End the function due to failure
    }

    fetch(url)
        .then( res => res.json())
        .then( issData => {
            console.log(issData);           // Log the data
            let lat = issData.latitude;     // Set lat and long
            let long = issData.longitude;
            issLat.innerHTML = lat;
            issLong.innerHTML = long;

            if (!issMarker) {
                issMarker = L.marker([lat, long], {icon: icon}).addTo(map) // Adds the marker to the map
            } else {
                issMarker.setLatLng([lat, long]) // if the marker already exists
            }
            // Updating the time
            let date = Date();
            time.innerHTML = date;
        })
        .catch( err => {
            attempts--;
            console.log(err)
        })
        .finally( () => {
            setTimeout(iss, update, attempts)
        })
}