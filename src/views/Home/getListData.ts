import { toRefs, reactive, isRef } from 'vue'

export default (options: any) => {
  const { url, params } = options
  let state = reactive({
    lists: []
  })
  const getListData = async () => {
    const query: any = {}
    Object.keys(params).forEach((key) => {
      const val = params[key]
      const value = isRef(val) ? val.value : val
      query[key] = value
    })
    try {
      const res = await url(query)
      console.log(res)
      state.lists = res.hits
    } catch (e) {
      console.log(e)
    }
  }
  return {
    getListData,
    ...toRefs(state)
  }
}
