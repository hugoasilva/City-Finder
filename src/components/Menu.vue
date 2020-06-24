<template>
  <div>
    <nav
      class="navbar navbar-expand-lg navbar-dark bg-primary"
      style="background-color: #e3f2fd;"
    >
      <a class="navbar-brand" href="/">
        <Logo />
      </a>
      <a class="navbar-brand" href="/">City Finder</a>
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
            <a class="nav-link" href="/">Início</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/countries">Países</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/cities">Cidades</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/routes">Rotas</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/currencies">Moedas</a>
          </li>
        </ul>
        <div class="search">
          <Search />
        </div>
        <div class="dropdown">
          <button
            class="btn btn-secondary btn-light dropdown-toggle"
            type="button"
            id="dropdownMenu"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Língua
          </button>
          <div
            class="dropdown-menu dropdown-menu-right"
            aria-labelledby="dropdownMenu"
          >
            <button class="dropdown-item" type="button">
              <img src="@/assets/en.png" alt="English" /> English
            </button>
            <button class="dropdown-item" type="button">
              <img src="@/assets/pt.png" alt="Português" /> Português
            </button>
          </div>
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
