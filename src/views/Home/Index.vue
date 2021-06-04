<template>
  <HelloWorld msg="你好，vue3" />
  <el-input v-model="searchVal" placeholder="请输入内容" @keyup.enter="search" />
  <el-button @click="search">搜索</el-button>
  <ul>
    <li v-for="item of lists.hits" :key="item.objectID">
      <a :href="item.url">{{ item.title }}</a>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, getCurrentInstance } from 'vue'
import HelloWorld from '@/components/HelloWorld.vue'
import useListData from './useListData'
export default defineComponent({
  name: 'Home',
  components: { HelloWorld },
  setup() {
    // const { appContext }: any = getCurrentInstance()
    // const $app = appContext.config.globalProperties
    // console.log($app);
    const searchVal = ref<string>('')
    const { getData, lists }: any = useListData({searchVal})
    console.log(1)
    onMounted(() => {
      getData()
    })
    return {
      searchVal,
      lists,
      search: getData
    }
  }
})
</script>

<style lang="scss" scoped>
.el-input {
  width: 200px;
  margin-right: 20px;
}
.el-button {
  font-size: 14px;
}
</style>
