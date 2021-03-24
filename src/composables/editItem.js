import { useStore } from 'vuex'
import { ref } from 'vue'

const editItem = () => {
  const store = useStore()

  const newItem = ref('')

  const addListItem = () => {
    store.commit('addListItem', newItem.value)
    newItem.value = ''
  }
  const selectEditListItem = (itemIndex) => {store.commit('selectEditListItem', itemIndex)}
  const editListItem = (itemIndex) => store.commit('editListItem', itemIndex)
  const deleteListItem = (itemIndex) => store.commit('deleteListItem', itemIndex)
  const changeStatus = (itemIndex) => store.commit('changeStatus', itemIndex)

  return { newItem, addListItem, selectEditListItem, editListItem, deleteListItem, changeStatus }
}
export default editItem