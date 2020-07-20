<template>
  <div class="cities">
    <vue-title :title="'Lista de cidades'"></vue-title>
    <div class="col-md-8 offset-md-2 text-center pt-4">
      <div class="jumbotron">
        <h1 class="display-4">Cidades</h1>
        <div class="text-center">
          <table class="table cityTable">
            <thead>
              <th class="bg-primary">Cidades Mais Populosas</th>
            </thead>
            <caption>Cidades Mais Populosas</caption>
            <tbody>
              <tr v-for="city in mostPopulated.data" :key="city.id">
                <th scope="row">
                  <router-link
                    :to="'/cities/' + city.id"
                    class="list-group-item-action"
                  >{{ city.city }}</router-link>
                </th>
              </tr>
            </tbody>
          </table>
          <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-center">
              <li v-for="i in this.totalCount" v-bind:key="i" class="page-item">
                <a class="page-link disabled" :href="'/mostpopulated?page=' + i">{{ i }}</a>
              </li>
            </ul>
          </nav>
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
      mostPopulated: [],
      totalCount: 0
    };
  },
  computed: {
    getOffset() {
      if (this.$route.query.page) {
        return (this.$route.query.page - 1) * 10;
      } else {
        return 0;
      }
    }
  },
  watch: {
    $route() {
      this.created();
    }
  },
  async created() {
    try {
      const res = await axios.get(
        "https://wft-geo-db.p.rapidapi.com/v1/geo/cities?limit=10&minPopulation=6555555&languageCode=pt&offset=" +
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
      this.mostPopulated = res.data;
      this.totalCount =
        Math.ceil(this.mostPopulated.metadata.totalCount / 10) - 1;
    } catch (e) {
      console.error(e);
    }
  }
};
</script>

<style scoped>
.cityTable {
  margin: 20px;
  margin-left: auto;
  margin-right: auto;
  width: 30%;
  border-width: 3px;
  border-style: solid;
}

caption {
  visibility: hidden;
}
</style>
