<template>
  <div>
    <nav
      class="navbar navbar-expand-lg navbar-dark bg-primary"
      style="background-color: #e3f2fd;"
    >
      <a class="navbar-brand" href="/"><Logo /></a>
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
            <a class="nav-link" href="/currencies">Símbolos Monetários</a>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <div class="btn-group btn-group-toggle mr-sm-2" data-toggle="buttons">
            <label class="btn btn-secondary btn-light active">
              <input
                type="radio"
                name="options"
                id="option1"
                autocomplete="off"
                checked
              />
              Cidade
            </label>
            <label class="btn btn-secondary btn-light">
              <input
                type="radio"
                name="options"
                id="option2"
                autocomplete="off"
              />
              País
            </label>
          </div>
          <input
            class="form-control mr-sm-2"
            type="search"
            placeholder="Pesquise um país ou cidade..."
            aria-label="Search"
            size="21"
          />
          <button
            class="btn btn-secondary btn-light my-2 my-sm-0 mr-sm-2"
            type="submit"
          >
            Pesquisar
          </button>
        </form>
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
            <button class="dropdown-item " type="button">
              <img src="@/assets/en.png" alt="English" /> English
            </button>
            <button class="dropdown-item " type="button">
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

export default {
  components: {
    Logo
  },
  data() {
    return {
      selected: "radio1",
      options: [
        { text: "Cidade", value: "radio1" },
        { text: "País", value: "radio2" }
      ]
    };
  }
};
</script>

<style scoped>
.image {
  display: block;
  height: 100px;
}
</style>
