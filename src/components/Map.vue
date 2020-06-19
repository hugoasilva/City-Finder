<template>
  <div id="map">
  </div>
</template>

<script>
import L from "leaflet"

export default {
  name: "Map",
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
      this.map= L.map('map').setView([this.lat, this.long],11);
      this.tileLayer= 
          L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png');  
      this.tileLayer.addTo(this.map); 
      L.circle([this.lat, this.long], {
          color: "red",
          fillColor: "#f03",
          fillOpacity: 0.5,
          radius: 5000.0
      }).addTo(this.map);       
    }
  },
  props: {
    lat: Number,
    long: Number
  }
};
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
