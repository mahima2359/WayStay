
import { Map, Marker, Popup } from '@maptiler/sdk/maptiler-sdk.umd.js';

const map = new Map({
    container: 'map',
    style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${mapToken}`,
    center: listing.geometry.coordinates,
    zoom: 9
});

const marker = new Marker({
    color: 'red',
    draggable: true
})
.setLngLat(listing.geometry.coordinates)
.setPopup(new Popup({offset: 25})
    .setHTML(`<h4>${listing.location}</h4><p><b>Exact Location Will Be Provided After Booking</b></p>`)
    .setMaxWidth("500px"))
.addTo(map);
