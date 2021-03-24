import { useStore } from 'vuex'

const editPage = () => {
  const store = useStore()
  const pPage = () => store.commit('pPage')
  const nPage = () => store.commit('nPage')
  const selectPagedData = (page) => {store.commit('selectPagedData', page)}

  return { pPage, nPage, selectPagedData}
}
export default editPage