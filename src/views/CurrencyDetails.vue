<template>
  <div class="text-center">
    <vue-title :title="'Currency Details - ' + currencyDetails.code"></vue-title>
    <div class="col-md-8 offset-md-2 text-center pt-4">
      <div class="jumbotron">
        <h1 class="display-4">{{ currencyDetails.code }}</h1>
        <p class="lead">
          Esta moeda é usada nos seguintes países:
        </p>
        <table class="table currencyTable">
          <thead>
            <th class="bg-primary" colspan="2"></th>
          </thead>
          <tbody>
            <tr v-for="country in currencyDetails.countryCodes" v-bind:key="country">
              <th scope="row">
                <a
                  v-bind:href="'/countries/' + country"
                  class="list-group-item-action"
                  >{{ country }}
                </a>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>   
  </div>
</template>

<script>
import Currencies from "../assets/currencies.json"

export default {
  name: "app",
  data() {
    return {
      Currencies,
      currencyDetails: []
    };
  },
  mounted() {
    let currencyId = this.$route.params.id;

    for (let i = 0; i < Currencies.data.length; i++){
      if (Currencies.data[i].code == currencyId){
        this.currencyDetails = Currencies.data[i];
      }
    }
    console.log(this.currencyDetails)
  }
};
</script>

<style scoped>
h2 {
  margin: 20px;
}

.currencyTable {
  margin: 20px;
  margin-left: auto;
  margin-right: auto;
  width: 20%;
  border-width: 3px;
  border-style: solid;
}
</style>
