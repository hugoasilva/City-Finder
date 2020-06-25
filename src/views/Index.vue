<template>
  <div class="index">
  <vue-title :title="'City Finder'"></vue-title>
    <div class="col-md-8 offset-md-2 text-center pt-4">
      <div class="jumbotron">
        <h1 class="display-4">City Finder</h1>
        <p class="lead">
          O City Finder ajuda-o a saber mais sobre a cidade ou país que procura!
          Calcule a distância entre cidades para orientar as suas
          viagens,consulte todas as informações sobre cidades e conheça as suas
          moedas.
        </p>
        <div class="text-center">
          <h2>Conheça as 10 cidades mais populosas</h2>
          <table class="table cityTable">
            <thead>
              <th class="bg-primary">Cidade</th>
            </thead>
            <tbody>
              <tr v-for="city in mostPopulated.data" :key="city.id">
                <th scope="row">
                  <a
                    v-bind:href="'/cities/' + city.id"
                    class="list-group-item-action"
                    >{{ city.city }}
                  </a>
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
      mostPopulated: []
    };
  },
  async created() {
    try {
      const res = await axios.get(
        "https://wft-geo-db.p.rapidapi.com/v1/geo/cities?limit=10&minPopulation=14220000",
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
      this.mostPopulated.data.sort((a, b) => a.name < b.name ? -1 : 1)

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
  width: 20%;
  border-width: 3px;
  border-style: solid;
}
</style>
