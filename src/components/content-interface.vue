<template>
  <div class="content-interface" :class="{'is-collapse': isCollapse}">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    isCollapse: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
  div.content-interface {
    flex: 1 1 auto;
    width: calc(100% - 64px);
    display: flex;
    flex-direction: column;
  }
  div.content-interface.is-collapse {
    width: calc(100% - 200px);
  }
</style>
