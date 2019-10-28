<template>
  <main-interface>
    <router-view v-if="loadSuccess" :key="key"></router-view>
  </main-interface>
</template>

<script>
import mainInterface from '@/components/main-interface';

export default {
  components: {
    mainInterface,
  },
  data() {
    return {
      loadSuccess: false,
      user: '',
    };
  },
  computed: {
    key() {
      return this.$route.fullPath;
    },
  },
  created() {
    this.getInit();
  },
  methods: {
    getInit() {
      this.loadSuccess = true;
      // const loading = this.$loading(({ lock: true })
      // this.getUserInfo()
      //   .then(this.user)
      //   .catch(() => {})
      //   .finally(() => {
      //     this.loadSuccess = true;
      //     loading.close();
      //   });
    },
    getUserInfo() {
      this.user = 'admin';
    },
  },
};
</script>

<style scoped>

</style>
