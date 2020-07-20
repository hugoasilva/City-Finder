<template>
  <div class="citiesnearcity">
    <vue-title :title="'Cidades Próximas de uma Cidade'"></vue-title>
    <div class="col-md-8 offset-md-2 text-center pt-4">
      <div class="jumbotron">
        <h1 class="display-4">Cidades Próximas de uma Cidade</h1>
        <div class="text-center">
          <div id="search">
            <form class="form-inline my-2 my-lg-0 pt-4">
              <div class="autocomplete">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text">Cidade:</span>
                  </div>
                  <label for="first"></label>
                  <input
                    id="first"
                    class="form-control mr-sm-2"
                    type="text"
                    v-model="search"
                    placeholder="Selecione uma cidade..."
                    aria-label="Search"
                    size="30"
                    @input="setBox(searchBox)"
                  />
                  <ul v-show="isOpen" class="autocomplete-results" v-on-clickaway="away">
                    <li
                      v-for="(result, i) in results"
                      :key="i"
                      @click="setCity(result.id)"
                      class="autocomplete-result pl-3"
                    >{{ result.name + ", " + result.country }}</li>
                  </ul>
                </div>
              </div>
            </form>
          </div>
          <router-link
            class="btn btn-secondary btn-light my-2 my-sm-0 mr-sm-2"
            :to="'/citiesnearcity' + '?city=' + city"
          >Pesquisar</router-link>
        </div>
        <table v-if="citiesNearCity.data" class="table cityTable mt-4">
          <caption>Cidades Próximas</caption>
          <thead>
            <th class="bg-primary" colspan="2"></th>
          </thead>
          <tbody>
            <tr v-for="city in citiesNearCity.data" v-bind:key="city.id">
              <th scope="row">
                <router-link
                  :to="'/cities/' + city.id"
                  class="list-group-item-action"
                >{{ city.city }}</router-link>
              </th>
            </tr>
          </tbody>
        </table>
        <nav v-if="citiesNearCity.data" aria-label="Page navigation example">
          <ul class="pagination justify-content-center">
            <li v-for="i in this.totalCount" v-bind:key="i" class="page-item">
              <a
                class="page-link disabled"
                :href="'/citiesnearcity' + '?city=' + getCity + '&page=' + i"
              >{{ i }}</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import debounce from "lodash/debounce";
import { mixin as clickaway } from "vue-clickaway";

export default {
  mixins: [clickaway],
  data() {
    return {
      search: "",
      results: [],
      city: "",
      isAsync: {
        type: Boolean,
        default: false
      },
      isLoading: false,
      arrowCounter: 0,
      isOpen: false,
      citiesNearCity: [],
      totalCount: 0
    };
  },
  async created() {
    this.getResults();
  },
  computed: {
    getCity() {
      return this.$route.query.city ?? "";
    },
    getOffset() {
      if (this.$route.query.page) {
        return (this.$route.query.page - 1) * 10;
      } else {
        return 0;
      }
    },
    debounceMethod() {
      return debounce(this.onChange, 1000);
    }
  },
  watch: {
    $route() {
      this.getResults();
    }
  },
  methods: {
    async onChange() {
      this.isOpen = false;
      try {
        const search = await axios.get(
          "https://wft-geo-db.p.rapidapi.com/v1/geo/cities?limit=10&languageCode=pt&namePrefix=" +
            this.search,
          {
            method: "GET",
            headers: {
              "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
              "x-rapidapi-key":
                "7caeb4b0d3msh4ea7c1098d55578p1f43f7jsn8c4002ec36da"
            }
          }
        );
        this.results = search.data.data;
      } catch (e) {
        console.log(e);
      }
      this.isOpen = true;
      if (this.search == "") {
        this.isOpen = false;
      }
    },
    away: function() {
      this.isOpen = false;
    },
    setBox: function(searchBox) {
      this.searchBox = searchBox;
      this.debounceMethod();
    },
    setCity: function(id) {
      this.city = id;
      this.isOpen = false;
    },
    async getResults() {
      try {
        const res = await axios.get(
          "https://wft-geo-db.p.rapidapi.com/v1/geo/cities/" +
            this.getCity +
            "/nearbyCities/?radius=15&limit=10&languageCode=pt&offset=" +
            this.getOffset,
          {
            method: "GET",
            headers: {
              "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
              "x-rapidapi-key":
                "7caeb4b0d3msh4ea7c1098d55578p1f43f7jsn8c4002ec36da"
            }
          }
        );
        this.citiesNearCity = res.data;
        this.totalCount =
          Math.ceil(this.citiesNearCity.metadata.totalCount / 10) - 1;
      } catch (e) {
        console.error(e);
      }
    }
  }
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

.cityTable {
  margin: 20px;
  margin-left: auto;
  margin-right: auto;
  width: 35%;
  border-width: 3px;
  border-style: solid;
}
</style>
