<template>
  <HelloWorld msg="你好1，vue3" />
  <div class="container">
    <div v-for="(item, index) in itemlist" :key="index">{{ item }}</div>
  </div>
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
import { getHitsList } from '../../request/index'
import useListData from './getListData'
export default defineComponent({
  name: 'Home',
  components: { HelloWorld },
  setup() {
    // const { appContext }: any = getCurrentInstance()
    // const $app = appContext.config.globalProperties
    // console.log($app);
    const itemlist = ref<number>(9)
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
      itemlist,
      searchVal,
      lists,
      search: getListData
    }
  }
})
</script>

<style lang="scss" scoped>
.container {
  display: grid;
  grid-template-columns: repeat(3, 100px);
  grid-template-rows: repeat(3, 100px);
  div {
    margin: 1px;
    text-align: center;
    border: 1px solid #ccc;
  }
}

.el-input {
  margin-right: 20px;
  width: 240px;
}

.el-button {
  font-size: 14px;
}
</style>
