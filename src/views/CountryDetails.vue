<template>
  <div class="text-center">
    <h1>City ID: {{ countryDetails.data.code }}</h1>
    <h2>Currency: {{ countryDetails.data.currencyCodes[0] }}</h2>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "app",
  data() {
    return {
      countryDetails: []
    };
  },
  async created() {
    try {
      const res = await axios.get(
        "https://wft-geo-db.p.rapidapi.com/v1/geo/countries/" +
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
      this.countryDetails = res.data;
    } catch (e) {
      console.error(e);
    }
  }
};
</script>

<style></style>
