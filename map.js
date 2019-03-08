'use strict'

console.log('Loaded map.js')

mapboxgl.accessToken = 'pk.eyJ1IjoiYWxmMjE4NiIsImEiOiJjanN6aXRlMXExZTRoNGFvZHNocmR2Y3R5In0.VTzDi-iHDYLSe-H86CGYZg'
let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v10',
    center: [-73.96024, 40.80877],
    zoom: 12
})

let navigation = new mapboxgl.NavigationControl({
    showCompass: false
})

map.addControl(navigation, 'top-left')

let scale = new mapboxgl.ScaleControl({
    maxWidth: 80,
    unit: 'imperial'
})

map.addControl(scale, 'bottom-right')

let geolocate = new mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    trackUserLocation: true,
    showUserLocation: true,
    fitBoundsOptions: {
    }
})

map.addControl(geolocate, 'top-left')

geolocate.on('geolocate', function(event) {

    let lng = event.coords.longitude
    let lat = event.coords.latitude

    console.log('geolocated:', lng, lat)

    document.getElementById('info').innerHTML = lng.toFixed(5) + "," + lat.toFixed(5)

})

map.on('click', function(event) {

    let lng = event.lngLat.lng
    let lat = event.lngLat.lat

    console.log("clicked:", lng, lat)

    document.getElementById('info').innerHTML = lng.toFixed(5) + "," + lat.toFixed(5)

})

let marker = new mapboxgl.Marker()
marker.setLngLat([-73.959060,40.807950])
marker.addTo(map)

let popup = new mapboxgl.Popup()
popup.setHTML('This is my house<br /><img src="https://maps.googleapis.com/maps/api/streetview?channel=rdc-ldp-streetview&client=gme-movesalesinc&location=417+W+118th+St%2CNew+York%2CNY%2C10027&size=640x480&signature=NZy-gRxaPHkRFMIEhR4CjFkdX0w=" />')
marker.setPopup(popup)

let data = [
    {
        location: [-73.9609658,40.8082284],
        content: 'I spend most of my days in Avery Hall'
    },
    {
        location: [-73.9530462026596,40.81044950130634],
        content: 'This deli makes the best bagel and cream cheese in NYC'
    },
    {
        location: [-73.9589692008384,40.80381019983477],
        content: 'This pond has dozens of turtles swimming in it'
    },
        {
        location: [-73.96188139915466,40.803837138479295],
        content: 'Look up! This church is half-finished'
    },
    ]

  data.forEach(function(d) {

    let marker = new mapboxgl.Marker()    
    marker.setLngLat(d.location)
    marker.addTo(map)  

    let popup = new mapboxgl.Popup()
    popup.setHTML(d.content)
    marker.setPopup(popup)

})  
