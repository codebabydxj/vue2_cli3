<template>
  <main class="main-interface">
    <slot></slot>
  </main>
</template>

<script>
export default {

};
</script>

<style scoped>
  .main-interface {
    flex: 1 1 auto;
    display: flex;
    overflow: auto;
  }
</style>
