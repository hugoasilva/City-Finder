import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import Title from "./components/Title.vue";

Vue.component("vue-title", Title);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
