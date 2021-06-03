<template>
  <HelloWorld />
  <img v-show="show" src="../../assets/logo.png" alt="" />
  <el-button v-on:click="show = !show">点击显示/隐藏</el-button>
  <ul>
    <li v-for="item of lists" :key="item.objectID">
      <a :href="item.url">{{ item.title }}</a>
    </li>
  </ul>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  onMounted,
  getCurrentInstance
} from "vue"
import HelloWorld from "../../components/HelloWorld";
export default defineComponent({
  name: "Home",
  components: { HelloWorld },
  setup() {
    // const { appContext }: any = getCurrentInstance()
    // const $app = appContext.config.globalProperties
    // console.log($app);
    const show = ref<boolean>(true)
    return {
      show
    }
  }
});
</script>

<style lang="scss" scoped>
.el-button {
  padding: 15px;
}
</style>