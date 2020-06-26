<template>
  <div id="map">
  </div>
</template>

<script>
import L from "leaflet"

export default {
  name: "DistanceMap",
  data: function() {
    return {
      map: null,
      tileLayer: null
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      this.map = L.map("map").setView([38.7436056, -9.2304153], 13);
      console.log(this.map)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
      }).addTo(this.map);

      L.Path({
          waypoints: [
            L.latLng(38.7436056, -9.2304153),
            L.latLng(38.5334477, -0.1312811)
          ],
          router: new L.Routing.osrmv1({
            language: 'en',
            profile: 'car'
          }),
          geocoder: L.Control.Geocoder.nominatim({})
      }).addTo(this.map);
  }
  },
  props: {
    firstLat: String,
    firstLong: String,
    finalLat: String,
    finaltLong: String
  }
}
;
</script>

<style>
#map {
  width: 600px; 
  height: 400px;
  margin-bottom: 100px;
  margin-left: auto;
  margin-right: auto;
  border-width: 3px;
  border-style: solid;
}
</style>
