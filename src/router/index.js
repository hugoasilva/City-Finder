import Vue from "vue";
import VueRouter from "vue-router";
import Index from "../views/Index.vue";
import Cities from "../views/Cities.vue";
import CityDetails from "../views/CityDetails.vue";
import Countries from "../views/Countries.vue";
import CountryDetails from "../views/CountryDetails.vue";
import Currencies from "../views/Currencies.vue";
import CurrencyDetails from "../views/CurrencyDetails.vue"
import Routes from "../views/Routes.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "",
    component: Index,
  },
  {
    path: "/cities",
    name: "Cities",
    component: Cities,
  },
  {
    path: "/cities/:id",
    name: "City Details",
    component: CityDetails,
  },
  {
    path: "/countries",
    name: "Countries",
    component: Countries,
  },
  {
    path: "/countries/:id",
    name: "Country Details",
    component: CountryDetails,
  },
  {
    path: "/currencies",
    name: "Currencies",
    component: Currencies,
  },
  {
    path: "/currencies/:id",
    name: "Currency Details",
    component: CurrencyDetails,
  },
  {
    path: "/routes",
    name: "Routes",
    component: Routes,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});



export default router;
