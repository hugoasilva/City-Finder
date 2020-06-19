<template>
  <div class="text-center">
    <div class="col-md-8 offset-md-2 text-center pt-4">
      <div class="jumbotron">
        <h1 class="display-4">{{ cityDetails.data.name }}</h1>
        <table class="table cityTable">
          <thead>
            <th class="bg-primary" colspan="2">{{ cityDetails.data.name }}</th>
          </thead>
          <tbody>
            <tr>
              <th scope="row">País</th>
              <td><a v-bind:href="'/countries/' + cityDetails.data.countryCode">{{ cityDetails.data.country }}</a></td>
            </tr>
            <tr>
              <th scope="row">Região</th>
              <td>{{ cityDetails.data.region }}</td>
            </tr>
            <tr>
              <th scope="row">População</th>
              <td>{{ cityDetails.data.population }}</td>
            </tr>
          </tbody>
        </table>
        <h2>{{ cityDetails.data.name }} no mapa</h2>
        <div id="map">
          <Map :lat="cityDetails.data.latitude" :long="cityDetails.data.longitude" />
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
      time: String
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
    } catch (e) {
      console.error(e);
    }
  },
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
