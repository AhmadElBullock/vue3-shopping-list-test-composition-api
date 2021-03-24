<template>
  <div>
    <!-- ----- ADD A SHOPPING LIST ITEM ----- -->
    <div class="row">

      <p>
        <button class="btn btn-success" type="button" data-bs-toggle="collapse" data-bs-target="#collapseAdd" aria-expanded="false" aria-controls="collapseAdd">
          Add a shopping list item
        </button>
      </p>
      
      <div class="collapse" id="collapseAdd">
        <div class="card card-body">
          <div class="col-md-10">
            <div class="row">
              <div class="col-sm-4 col-form-label">
                <button class="btn btn-outline-success" @click="addListItem">Add</button>
              </div>
              <div class="col-sm-8">
                <input type="text" class="form-control" v-model="newItem">
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
    <!-- --- END: ADD A SHOPPING LIST ITEM --- -->

    <!-- ----- TABLE  ----- -->
    <table class="table table-striped">
        <!-- ----- TABLE HEADER ----- -->
        <thead>
            <tr>
            <th scope="col">#</th>
            <th scope="col">ID</th>
            <th scope="col">USER</th>
            <th scope="col">TITLE</th>
            <th scope="col">COMPLETED</th>
            <th scope="col"></th>
            <th scope="col"></th>
            </tr>
        </thead>

        <!-- ----- TABLE BODY ----- -->
        <tbody >  
            <tr v-for="(list, index) in pagedShoppingList"
            :key="list.id"
            >
                <!-- INDEX -->
                <th scope="row">{{calculation + index + 1}}</th>
                <!-- ID -->
                <td scope="row">{{list.id}}</td>
                <!-- USER ID -->
                <td>{{list.userId}}</td>

                <!-- TITLE / HIDDEN INPUT TITLE -->
                <td :class="[list.completed ? 'completed' : '', 'text-start']">
                    <div @dblclick="selectEditListItem(index)"
                    :class="[(calculation + index) != itemIndex ? '' : 'hide']"
                    >
                        {{list.title}}
                    </div>
                    <input 
                    type="text" class="edit-input text-start test"
                    :class="[(calculation + index) == itemIndex ? '' : 'hide', 'edit-input']"
                    v-model="list.title"
                    @keyup.enter="editListItem(list.title)"
                    @blur="editListItem(list.title)"
                    />
                </td> 

                <!-- STATUS -->
                <td>
                  <button
                  :class="[list.completed ? 'btn-success' : 'btn-secondary', 'btn']"
                  @click="changeStatus(index)"
                  >
                    {{list.completed}}
                  </button>
                </td>
                <!-- EDIT / DONE BUTTON  -->
                <td>
                    <button v-if="(calculation + index) !=
                    itemIndex &&
                    !shoppingList[(calculation + index)].completed"
                    class="btn btn-info no-padding" @click="selectEditListItem(index)"
                    >
                      Edit
                    </button>
                    <button
                    v-if="(calculation + index) == itemIndex"
                    class="btn btn-success no-padding"
                    @click="editListItem(list.title)"
                    >
                      Done
                    </button>
                </td>
                <!-- DELETE BUTTON -->
                <td>
                    <button class="btn btn-danger" @click="deleteListItem(index)">X</button>
                </td>
            </tr>
        </tbody>

    </table>
    <!-- --- END: TABLE  --- -->

    <!-- ----- PAGINATION ----- -->
    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-center">
        <!-- << ARROW -->
        <li v-show="page > 1" class="page-item" @click="pPage">
          <a class="page-link" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <!-- PAGE -->
        <li class="page-item"
        v-for="page in pages"
        :key="page"
        v-show="!(page >= pageActive + 5) && !(page <= pageActive - 5)"
        @click="selectPagedData(page)"
        >
            <a class="page-link" :class="pageActive == page && 'isActive' ">
              {{page}}
            </a>
        </li>
        <!-- >> ARROW -->
        <li v-show="page < pages" class="page-item" @click="nPage" >
          <a class="page-link" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
    <!-- --- END PAGINATION---  -->
  </div>
</template>

<script>
import { computed, onMounted, onUpdated } from 'vue'
import { useStore } from 'vuex'
import editItem from '../composables/editItem'
import editPage from '../composables/editPage'

export default {

  setup() {

    const store = useStore()
    const page = computed(() => store.state.page)
    const pages = computed(() => store.state.pages)
    const pageActive = computed(() => store.state.pageActive)
    const limit = computed(() => store.state.limit)
    const shoppingList = computed(() => store.state.shoppingList) 
    const pagedShoppingList = computed(() => store.state.pagedShoppingList) 

    const itemIndex = computed(() => store.state.itemIndex)

    const calculation = computed(() => (page.value - 1) * limit.value)

    const { newItem, addListItem, selectEditListItem, editListItem, deleteListItem, changeStatus } = editItem()
    const { pPage, nPage, selectPagedData } = editPage()

    onMounted(() => console.log('mounted'))
    onUpdated(() => console.log(calculation.value))
    
    return {
      store,
      page,
      pages,
      pageActive,
      limit,
      shoppingList,
      pagedShoppingList,
      itemIndex,
      calculation,
      newItem,

      addListItem,
      selectEditListItem,
      editListItem,
      deleteListItem,
      changeStatus,

      pPage,
      nPage,
      selectPagedData,
    }
  }
}
</script>

<style>
.page-link {
  color: black
}
.isActive {
  background-color: #247b6a;
  color: white
}
.isActive:hover {
  background-color: #247b6ab4;
  color: white
}
.completed {
  text-decoration:line-through !important;
  color: rgb(151, 151, 151) !important
}
.hide {
  display: none;
}
.show {
  display: block;
}
.edit-input {
  width: 100%;
  text-align: center;
  border: 1px solid rgba(128, 128, 128, 0.322);
  background-color: transparent;
}
tbody .btn {
  padding: .12rem .75rem
}
.btn-info {
  background-color: #afedfa;
}
</style>