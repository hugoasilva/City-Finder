<template>
  <div class="cities">
    <vue-title :title="'Lista de cidades'"></vue-title>
    <div class="col-md-8 offset-md-2 text-center pt-4">
      <div class="jumbotron">
        <h1 class="display-4">Cidades</h1>
        <div class="text-center">
          <table class="table countryTable">
            <thead>
              <th class="bg-primary">Cidades</th>
            </thead>
            <caption>
              Cidades
            </caption>
            <tbody>
              <tr v-for="city in cities.data" v-bind:key="city.id">
                <th scope="row">
                  <router-link
                    :to="'/cities/' + city.id"
                    class="list-group-item-action"
                    >{{ city.name + ", " + city.country }}
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
      cities: [],
    };
  },
  async created() {
    this.getResults();
  },
  computed: {
    search() {
      return this.$route.query.search ?? "";
    },
  },
  watch: {
    $route() {
      this.getResults();
    },
  },
  methods: {
    async getResults() {
      try {
        const res = await axios.get(
          "https://wft-geo-db.p.rapidapi.com/v1/geo/cities?limit=10&namePrefix=" +
            this.search +
            "&languageCode=pt",
          {
            method: "GET",
            headers: {
              "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
              "x-rapidapi-key":
                "7caeb4b0d3msh4ea7c1098d55578p1f43f7jsn8c4002ec36da",
            },
          }
        );
        this.cities = res.data;
      } catch (e) {
        console.error(e);
      }
    },
  },
};
</script>

<style scoped>
.countryTable {
  margin: 20px;
  margin-left: auto;
  margin-right: auto;
  width: 30%;
  border-width: 3px;
  border-style: solid;
}
</style>
