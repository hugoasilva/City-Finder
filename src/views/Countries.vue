<template>
  <div class="countries">
  <vue-title title="Lista de Paíes"></vue-title>
    <div class="col-md-8 offset-md-2 text-center pt-4">
      <div class="jumbotron">
        <h1 class="display-4">Países</h1>
        <div class="text-center">
          <table class="table countryTable">
            <thead>
              <th class="bg-primary">País</th>
            </thead>
            <caption>País</caption>
            <tbody>
              <tr v-for="country in countries.data" v-bind:key="country.code">
                <th scope="row">
                  <router-link
                    :to="'/countries/' + country.code"
                    class="list-group-item-action"
                    >{{ country.name }}
                  </router-link>
                </th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "app",
  data() {
    return {
      countries: []
    };
  },
  async created() {
    try {
      const res = await axios.get(
        "https://wft-geo-db.p.rapidapi.com/v1/geo/countries?limit=10",
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
            "x-rapidapi-key":
              "7caeb4b0d3msh4ea7c1098d55578p1f43f7jsn8c4002ec36da"
          }
        }
      );
      this.countries = res.data;
    } catch (e) {
      console.error(e);
    }
  }
};
</script>

<style scoped>
.countryTable {
  margin: 20px;
  margin-left: auto;
  margin-right: auto;
  width: 20%;
  border-width: 3px;
  border-style: solid;
}

caption {
  visibility: hidden;
}
</style>
