<template>
  <div class="container">
      <div class="row">

          <div class="col-md-6">
              <h1>Shopping List App</h1>
              <p>Please enter your username and password</p>
              <button class="btn btn-outline-success bg" @click="back">Back</button>
          </div>

          <div class="col-md-6">
            <form>
                <div class="mb-3">
                    <label class="form-label">Name</label>
                    <input v-model="name" type="text" class="form-control">
                </div>
                <div class="mb-3">
                    <label class="form-label">Password</label>
                    <input v-model="password" type="password" class="form-control">
                </div>
                    <button @click="onSubmit" type="button" class="btn btn-success">Submit</button>
            </form>
            <button class="btn btn-outline-success mt-5 sm" @click="back">Back</button>
          </div>
            
      </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { onMounted, ref } from 'vue'

export default {
    setup() {
        const router = useRouter()
        const store = useStore()

        const name = ref('')
        const password = ref('')

        const onSubmit = () => {
            const userName = name.value.toLowerCase()
            console.log(userName)
            if((
                userName == 'admin' ||
                userName == 'ahmad' ||
                userName == 'zahlan' ||
                userName == 'ghandor'
                )
                && password.value == 'admin') {
                const user = {
                    name : userName.charAt(0).toUpperCase() + userName.slice(1),  //JUST TO CAPITALIZE THE FIRST LETTER
                    password : password.value
                }
                store.commit('isAuthed', user)
            } else {
               alert('Please enter a valid username and password')
               name.value = ''
               password.value = ''
            }
        }

        const back = () => router.push({ path: '/' })

        onMounted(() => {
            console.log('👋 👇')
            console.log('username: [admin, zahlan, ghandor, ahmad]')
            console.log('password: admin')
            console.log('Try different names to see different results! 😎')
        })

        return { name, password, back, onSubmit }
    }
}
</script>

<style scoped>
    @media (min-width: 768px) {
        .sm {
            display: none;
        }
        .bg {
            display: block !important;
        }
    }
     h1 {
        color: rgb(32 143 123) !important;
    }
    .row {
        margin-top: 6rem
    }
    .bg {
        display: none;
    }
</style>