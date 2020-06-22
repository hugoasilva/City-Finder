<template>
  <div class="text-center">
    <vue-title :title="'City Details - ' + this.cityDetails.data.name"></vue-title>
    <div class="col-md-8 offset-md-2 text-center pt-4">
      <div class="jumbotron">
        <h1 v-if="this.cityDetails.data" class="display-4">{{ this.cityDetails.data.name }}</h1>
        <table class="table cityTable">
          <thead>
            <th v-if="this.cityDetails.data" class="bg-primary" colspan="2">{{ this.cityDetails.data.name }}</th>
          </thead>
          <tbody>
            <tr>
              <th scope="row">País</th>
              <td v-if="this.cityDetails.data"><a v-bind:href="'/countries/' + this.cityDetails.data.countryCode">{{ this.cityDetails.data.country }}</a></td>
            </tr>
            <tr>
              <th scope="row">Região</th>
              <td v-if="this.cityDetails.data">{{ this.cityDetails.data.region }}</td>
            </tr>
            <tr>
              <th scope="row">População</th>
              <td v-if="this.cityDetails.data">{{ this.cityDetails.data.population }}</td>
            </tr>
            <tr>
              <th scope="row">Hora Local</th>
              <td v-if="this.time.localTime">{{ this.time.localTime }}</td>
            </tr>
            <tr>
              <th scope="row">Temperatura</th>
              <td v-if="this.weather.data">{{ this.weather.data }} ºC</td>
            </tr>
          </tbody>
        </table>
        <h2 v-if="this.cityDetails.data">{{ this.cityDetails.data.name }} no mapa</h2>
        <div id="map">
          <Map  v-if="this.cityDetails.data" :lat="this.cityDetails.data.latitude" :long="this.cityDetails.data.longitude" />
        </div>
      </div>
    </div>    
  </div>
</template>

<script>
import axios from "axios";
import Map from "../components/Map.vue"

export default {
  name: "app",
  components: {
    Map
  },
  data() {
    return {
      cityDetails: [],
      time: [],
      weather: []
    };
  },
  async created() {
    try {
      const city = await axios.get(
        "https://wft-geo-db.p.rapidapi.com/v1/geo/cities/" + 
          this.$route.params.id,
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
            "x-rapidapi-key":
              "7caeb4b0d3msh4ea7c1098d55578p1f43f7jsn8c4002ec36da"
          }
        }
      );
      this.cityDetails = city.data;
      
      const weather = await axios.get("https://api.openweathermap.org/data/2.5/weather?q=" +
        this.cityDetails.data.name + "," + this.cityDetails.data.countryCode + "&appid=70d3a999d3c296c94f63808ba7d299e5&units=metric")
      this.weather.data = weather.data.main.temp;

      this.sleep(800)
        .then(async () => {
      const time = await axios.get(
        "https://wft-geo-db.p.rapidapi.com/v1/geo/cities/" +
          this.$route.params.id + "/time",
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
            "x-rapidapi-key":
              "7caeb4b0d3msh4ea7c1098d55578p1f43f7jsn8c4002ec36da"
          }
        }
      );
      this.time = time.data.data.split(".");
      this.time.localTime = this.time[0]
      })
    } catch (e) {
      console.error(e);
    }
    
  },
  methods: {
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
  }
};
</script>

<style scoped>
h2 {
  margin: 20px;
}

.cityTable {
  margin: 20px;
  margin-left: auto;
  margin-right: auto;
  width: 35%;
  border-width: 3px;
  border-style: solid;
}
</style>
