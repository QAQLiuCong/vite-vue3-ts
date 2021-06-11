<template>
  <HelloWorld msg="你好，vue3" />
  <el-input v-model="searchVal" placeholder="请输入内容" @keyup.enter="search" />
  <el-button @click="search">搜索</el-button>
  <ul>
    <li v-for="item of lists" :key="item.objectID">
      <a :href="item.url">{{ item.title }}</a>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, getCurrentInstance } from 'vue'
import HelloWorld from '@/components/HelloWorld.vue'
import { getHitsList } from '@/request/index'
import useListData from './getListData'
export default defineComponent({
  name: 'Home',
  components: { HelloWorld },
  setup() {
    // const { appContext }: any = getCurrentInstance()
    // const $app = appContext.config.globalProperties
    // console.log($app);
    const searchVal = ref<string>('')
    const { getListData, lists }: any = useListData({
      url: getHitsList,
      params: {
        query: searchVal
      }
    })
    onMounted(() => {
      getListData()
    })
    return {
      searchVal,
      lists,
      search: getListData
    }
  }
})
</script>

<style lang="scss" scoped>
.el-input {
  width: 240px;
  margin-right: 20px;
}
.el-button {
  font-size: 14px;
}
</style>
