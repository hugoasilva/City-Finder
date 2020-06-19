<template>
  <div class="text-center">
    <h2>{{ cityDetails.data.name }}</h2>
    <table class="table cityTable">
      <thead>
        <th class="bg-primary" colspan="2">{{ cityDetails.data.name }}</th>
      </thead>
      <tbody>
        <tr>
          <th scope="row">País</th>
          <td>{{ cityDetails.data.country }}</td>
        </tr>
        <tr>
          <th scope="row">Região</th>
          <td>{{ cityDetails.data.region }}</td>
        </tr>
        <tr>
          <th scope="row">População</th>
          <td>{{ cityDetails.data.population }}</td>
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
      cityDetails: []
    };
  },
  async created() {
    try {
      const res = await axios.get(
        "https://wft-geo-db.p.rapidapi.com/v1/geo/cities/" +
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
      this.cityDetails = res.data;
    } catch (e) {
      console.error(e);
    }
  }
};
</script>

<style scoped>
h2 {
  margin: 20px;
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
