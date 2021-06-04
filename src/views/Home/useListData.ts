import { toRefs, reactive, isRef } from 'vue'
import { getHitsList } from '../../request/index'
export default (options: any) => {
  const { searchVal } = options
  console.log(isRef(searchVal))
  const state = reactive({
    lists: <any>[]
  })
  const getData = async () => {
    try {
      const res = await getHitsList({ query: searchVal.value })
      state.lists = res
      console.log(2)
    } catch (e) {
      console.log(e)
    }
  }
  return {
    getData,
    ...toRefs(state)
  }
}
