<template>
  <div class="text-center">
    <vue-title
      :title="'Detalhes de País - ' + countryDetails.data.name"
    ></vue-title>
    <div class="col-md-8 offset-md-2 text-center pt-4">
      <div class="jumbotron">
        <h1 v-if="this.countryDetails.data" class="display-4">
          {{ countryDetails.data.name }}
        </h1>
        <br />
        <img
          v-if="this.countryDetails.data"
          id="flag"
          :src="countryDetails.data.flagImageUri"
          alt="Bandeira"
        />
        <table class="table countryTable">
          <thead>
            <th v-if="this.countryDetails.data" class="bg-primary" colspan="2">
              {{ countryDetails.data.name }}
            </th>
          </thead>
          <caption>
            Países
          </caption>
          <tbody>
            <tr>
              <td scope="row">Código</td>
              <td v-if="this.countryDetails.data">
                {{ countryDetails.data.code }}
              </td>
            </tr>
            <tr>
              <td scope="row">Moeda</td>
              <td v-if="this.countryDetails.data">
                <router-link
                  :to="'/currencies/' + countryDetails.data.currencyCodes[0]"
                  class="list-group-item-action"
                >
                  {{ countryDetails.data.currencyCodes[0] }}
                </router-link>
              </td>
            </tr>
            <tr>
              <td scope="row">Nr Regiões</td>
              <td v-if="this.countryDetails.data">
                {{ countryDetails.data.numRegions }}
              </td>
            </tr>
          </tbody>
        </table>
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
      countryDetails: [],
    };
  },
  async created() {
    try {
      const res = await axios.get(
        "https://wft-geo-db.p.rapidapi.com/v1/geo/countries/" +
          this.$route.params.id +
          "?languageCode=pt",
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
            "x-rapidapi-key":
              "7caeb4b0d3msh4ea7c1098d55578p1f43f7jsn8c4002ec36da",
          },
        }
      );
      this.countryDetails = res.data;
    } catch (e) {
      console.error(e);
      this.$router.push("/404");
    }
  },
};
</script>

<style scoped>
h2 {
  margin: 20px;
}

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
  border-width: 3px;
  border-style: solid;
}

caption {
  visibility: hidden;
}
</style>
