<template>
  <div>
    <Menu />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Menu from "@/components/Menu.vue";
import Footer from "@/components/Footer.vue";


export default {
  components: {
    Menu,
    Footer
  }
};
</script>

<style></style>
