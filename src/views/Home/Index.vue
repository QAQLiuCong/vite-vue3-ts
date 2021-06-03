<template>
  <img v-show="show" src="../../assets/logo.png" alt="" />
  <el-button v-on:click="show = !show">点击显示/隐藏</el-button>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  getCurrentInstance,
} from "vue";

export default defineComponent({
  name: "Home",
  setup() {
    const { appContext }: any = getCurrentInstance();
    const $app = appContext.config.globalProperties;
    console.log($app);
    const show = ref<boolean>(true);
    return {
      show
    };
  }
});
</script>

<style lang="scss" scoped>
</style>