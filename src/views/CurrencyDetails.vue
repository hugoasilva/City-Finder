<template>
  <div class="text-center">
    <h1>ID: {{ this.$route.params.id }}</h1>
    {{ Currencies.data[this.$route.params.id].code }}
  </div>
</template>

<script>
import Currencies from "../assets/currencies.json"

export default {
  name: "app",
  data() {
    return {
      Currencies
    };
  }
};
</script>

<style>
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
</style>
