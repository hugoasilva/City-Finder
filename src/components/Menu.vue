<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary" style="background-color: #e3f2fd;">
      <router-link class="navbar-brand" to="/">
        <Logo />
      </router-link>
      <router-link class="navbar-brand" to="/">City Finder</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Início</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/countries">Países</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/cities">Cidades</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/routes">Rotas</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/currencies">Moedas</router-link>
          </li>
        </ul>
        <div class="search">
          <Search />
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import Logo from "./Logo.vue";
import Search from "./Search.vue";

export default {
  components: {
    Logo,
    Search
  }
};
</script>

<style scoped>
.image {
  display: block;
  height: 100px;
}
</style>
