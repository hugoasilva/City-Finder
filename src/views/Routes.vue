<template>
  <div class="routes">
    <vue-title title="Rotas"></vue-title>
    <div class="col-md-8 offset-md-2 text-center pt-4">
      <div class="jumbotron">
        <h1 class="display-4">Rotas</h1>
        <div class="text-center">
          <div id="search1">
            <form class="form-inline my-2 my-lg-0 pt-4">
              <div class="autocomplete">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text">Partida</span>
                  </div>
                  <label for="first"></label>
                  <input
                    id="first"
                    class="form-control mr-sm-2"
                    type="text"
                    v-model="search1"
                    placeholder="Selecione uma cidade..."
                    aria-label="Search"
                    size="30"
                    @input="setBox(searchBox1)"
                  />
                  <ul
                    v-show="isOpen1"
                    class="autocomplete-results"
                    v-on-clickaway="away"
                  >
                    <li
                      v-for="(result, i) in results"
                      :key="i"
                      @click="setFirst(result.id)"
                      class="autocomplete-result pl-3"
                    >
                      {{ result.name + ", " + result.country }}
                    </li>
                  </ul>
                </div>
              </div>
            </form>
          </div>

          <div id="search2">
            <form class="form-inline my-2 my-lg-0 pt-4 pb-3">
              <div class="autocomplete">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text">Chegada</span>
                  </div>
                  <label for="first"></label>
                  <input
                    id="final"
                    class="form-control mr-sm-2"
                    type="text"
                    v-model="search2"
                    placeholder="Selecione uma cidade..."
                    aria-label="Search"
                    size="30"
                    @input="setBox(searchBox2)"
                  />
                  <ul
                    v-show="isOpen2"
                    class="autocomplete-results"
                    v-on-clickaway="away"
                  >
                    <li
                      v-for="(result, i) in results"
                      :key="i"
                      @click="setFinal(result.id)"
                      class="autocomplete-result pl-3"
                    >
                      {{ result.name + ", " + result.country }}
                    </li>
                  </ul>
                </div>
              </div>
            </form>
          </div>
          <router-link
            class="btn btn-secondary btn-light my-2 my-sm-0 mr-sm-2"
            :to="'/routes' + '?first=' + first + '&final=' + final"
            >Pesquisar</router-link
          >
          <table v-if="cityDistance.data" class="table distance mt-4">
            <caption>
              Distância
            </caption>
            <thead>
              <th class="bg-primary" colspan="2"></th>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Distância</th>
                <td>{{ cityDistance.data }} km</td>
              </tr>
            </tbody>
          </table>
          <DistanceMap
            v-if="cityDistance.data"
            firstLat="57.74"
            firstLong="11.94"
            finalLat="57.6792"
            finalLong="11.949"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import debounce from "lodash/debounce";
import { mixin as clickaway } from "vue-clickaway";

import DistanceMap from "../components/DistanceMap.vue";

export default {
  components: {
    DistanceMap,
  },
  mixins: [clickaway],
  data() {
    return {
      search1: "",
      search2: "",
      results: [],
      searchTerm: "",
      searchBox1: true,
      searchBox2: false,
      first: "",
      final: "",
      isAsync: {
        type: Boolean,
        default: false,
      },
      isLoading: false,
      arrowCounter: 0,
      isOpen1: false,
      isOpen2: false,
      cityDistance: [],
    };
  },
  async created() {
    this.getResults();
  },
  computed: {
    getFirst() {
      return this.$route.query.first ?? "";
    },
    getFinal() {
      return this.$route.query.final ?? "";
    },
    debounceMethod() {
      return debounce(this.onChange, 1000);
    },
  },
  watch: {
    $route() {
      this.getResults();
    },
  },
  methods: {
    async onChange() {
      this.isOpen1 = false;
      this.isOpen2 = false;
      if (this.searchBox == true) {
        this.searchTerm = this.search1;
      } else if (this.searchBox == false) {
        this.searchTerm = this.search2;
      }
      try {
        const search = await axios.get(
          "https://wft-geo-db.p.rapidapi.com/v1/geo/cities?limit=10&namePrefix=" +
            this.searchTerm,
          {
            method: "GET",
            headers: {
              "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
              "x-rapidapi-key":
                "7caeb4b0d3msh4ea7c1098d55578p1f43f7jsn8c4002ec36da",
            },
          }
        );
        this.results = search.data.data;
      } catch (e) {
        console.log(e);
      }
      if (this.searchBox == true) {
        this.isOpen1 = true;
        this.isOpen2 = false;
      } else if (this.searchBox == false) {
        this.isOpen1 = false;
        this.isOpen2 = true;
      } else {
        this.isOpen1 = false;
        this.isOpen2 = false;
      }
    },
    away: function() {
      this.isOpen1 = false;
      this.isOpen2 = false;
    },
    setBox: function(searchBox) {
      this.searchBox = searchBox;
      this.debounceMethod();
    },
    setFirst: function(id) {
      this.first = id;
    },
    setFinal: function(id) {
      this.final = id;
    },
    async getResults() {
      try {
        const res = await axios.get(
          "https://wft-geo-db.p.rapidapi.com/v1/geo/cities/" +
            this.getFirst +
            "/distance?distanceUnit=km&fromCityId=" +
            this.getFinal,
          {
            method: "GET",
            headers: {
              "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
              "x-rapidapi-key":
                "7caeb4b0d3msh4ea7c1098d55578p1f43f7jsn8c4002ec36da",
            },
          }
        );
        this.cityDistance = res.data;
        console.log(this.cityDistance.data);
      } catch (e) {
        console.error(e);
      }
    },
  },
};
</script>

<style scoped>
form {
  margin: 0 auto;
  width: 40%;
}

.autocomplete-results {
  position: absolute;
  z-index: 1000;
  cursor: default;
  padding: 0;
  margin-left: 90px;
  margin-top: 41px;
  list-style: none;
  background-color: #eeeeee;
  border: 1px solid #ccc;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 10px;
  -webkit-box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  width: 74%;
}

.autocomplete-result {
  list-style: none;
  text-align: left;
  padding: 4px 2px;
  cursor: pointer;
}

.autocomplete-result.is-active,
.autocomplete-result:hover {
  background-color: #2a60e0;
  color: white;
}

.distance {
  margin: 20px;
  margin-left: auto;
  margin-right: auto;
  width: 35%;
  border-width: 3px;
  border-style: solid;
}

caption {
  visibility: hidden;
}
</style>
