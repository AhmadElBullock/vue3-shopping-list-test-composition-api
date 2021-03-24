<template>
    <div class="container">
      <h3 v-if="$store.state.user == 'admin' || $store.state.user.length < 1">My Shopping List</h3>
      <h3 v-else-if="$store.state.user.length > 0">{{$store.state.user}}'s Shopping List</h3>
      <ShoppingList />
    </div>
</template>

<script>
import { onMounted } from 'vue'
import { useStore } from 'vuex'
import ShoppingList from '../../components/ShoppingList'

export default {
    components: { ShoppingList },

    setup() {
        const store = useStore()

        onMounted(() => {
          store.dispatch('getWifeData')
        })
    }
}
</script>

<style>
  h3 {
    margin: 0.7rem auto;
  }
  li {
    cursor: pointer;
  }
</style>