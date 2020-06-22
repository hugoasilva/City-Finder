<template>
  <div>

  </div>
</template>

<script>
export default {
  name: 'vue-title',
  props: ['title'],
  watch: {
    title: {
      immediate: true,
      handler() {
        document.title = this.title;
      }
    }
  },
}
</script>

<style>

</style>