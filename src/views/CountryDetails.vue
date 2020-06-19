<template>
  <div class="text-center">
    <h2 class="mt-2">{{ countryDetails.data.name }}</h2>
    <img id="flag" :src="countryDetails.data.flagImageUri" alt="Bandeira">
    <table class="table countryTable">
      <thead>
        <th class="bg-primary" colspan="2"></th>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Código</th>
          <td>{{ countryDetails.data.code }}</td>
        </tr>
        <tr>
          <th scope="row">Moeda</th>
          <td>{{ countryDetails.data.currencyCodes[0] }}</td>
        </tr>
        <tr>
          <th scope="row">Nr Regiões</th>
          <td>{{ countryDetails.data.numRegions }}</td>
        </tr>
      </tbody>
    </table>
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

<style>
.countryTable {
  margin: 20px;
  margin-left: auto;
  margin-right: auto;
  width: 20%;
  border-width: 3px;
  border-style: solid;
}

#flag {
  height: 100px;

}
</style>
