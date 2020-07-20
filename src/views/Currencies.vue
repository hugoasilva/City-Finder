<template>
  <div class="currencies">
    <vue-title :title="'Lista de Moedas'"></vue-title>
    <div class="col-md-8 offset-md-2 text-center pt-4">
      <div class="jumbotron">
        <h1 class="display-4">Moedas</h1>
        <div class="text-center">
          <table class="table currencyTable">
            <thead>
              <th class="bg-primary">Moedas</th>
            </thead>
            <caption>
              Moedas
            </caption>
            <tbody>
              <tr
                v-for="currency in Currencies.data.slice(0, 10)"
                v-bind:key="currency.code"
              >
                <th scope="row">
                  <router-link
                    :to="'/currencies/' + currency.code"
                    class="list-group-item-action"
                    >{{ currency.code }}
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
import Currencies from "../assets/currencies.json";

export default {
  name: "app",
  data() {
    return {
      Currencies,
    };
  },
};
</script>

<style>
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

caption {
  visibility: hidden;
}
</style>
