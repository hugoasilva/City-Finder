<template>
  <div id="search">
    <form class="form-inline my-2 my-lg-0">
      <div class="form-group m-2">
        <label for="selector">Selecionar</label>
        <select
          id="selector"
          class="form-control"
          @change="onChange()"
          v-model="selected"
        >
          <option selected value="cities">Cidade</option>
          <option value="countries">País</option>
        </select>
      </div>
      <div class="autocomplete">
        <label for="searchInput"></label>
        <input
          id="searchInput"
          class="form-control mr-sm-2"
          type="text"
          v-model="search"
          placeholder="Pesquise um país ou cidade..."
          aria-label="Search"
          size="21"
          @input="debounceMethod"
        />
        <ul v-show="isOpen" class="autocomplete-results" v-on-clickaway="away">
          <li
            v-for="(result, i) in results"
            :key="i"
            @click="
              (isOpen = false),
                $router.push(
                  '/' +
                    selected +
                    '/' +
                    (selected == 'cities' ? result.id : result.code)
                )
            "
            class="autocomplete-result pl-3"
          >
            {{
              selected == "cities"
                ? result.name + ", " + result.country
                : result.name + ", " + result.code
            }}
          </li>
        </ul>
      </div>
      <a
        class="btn btn-secondary btn-light my-2 my-sm-0 mr-sm-2"
        :href="'/' + selected + '?search=' + search"
        >Pesquisar</a
      >
    </form>
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
      selected: "cities",
      isAsync: {
        type: Boolean,
        default: false,
      },
      isLoading: false,
      arrowCounter: 0,
      isOpen: false,
    };
  },
  computed: {
    debounceMethod() {
      return debounce(this.onChange, 1000);
    },
  },
  methods: {
    async onChange() {
      this.isOpen = false;
      try {
        const search = await axios.get(
          `https://wft-geo-db.p.rapidapi.com/v1/geo/${this.selected}?limit=10&namePrefix=` +
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
  },
};
</script>

<style scoped>
.autocomplete-results {
  position: absolute;
  z-index: 1000;
  cursor: default;
  padding: 0;
  margin-top: 0.5px;
  list-style: none;
  background-color: #eeeeee;
  border: 1px solid #ccc;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 10px;
  -webkit-box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  width: 15.5%;
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

label {
  visibility: hidden;
}
</style>
