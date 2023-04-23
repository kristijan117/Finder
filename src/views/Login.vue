<template>
  <div>
    <h1>Login</h1>
    <div class="container">
      <div class="row">
        <div class="col-sm">
        </div>
        <div class="col-sm">
          <form @submit.prevent="onSubmit">
            <div class="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input v-model="email" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input v-model="password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
            </div>
            <button type="submit" class="btn btn-primary mt-5">Submit</button>
          </form>
        </div>
        <div class="col-sm">
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import store from '@/store.js'
import { firebase } from '@/firebase.js'

export default {
  data () {
    return {
      email: '',
      password: '',
   }
  },
  methods: {
    onSubmit () {
      console.log('login: '+ this.email);
      firebase.auth().signInWithEmailAndPassword(this.email, this.password) .then( (result) => {
        console.log('Login success: ', result);
        this.$router.replace({ name: 'home'})
      })
      .catch(function (e) {
        console.error('Error',e);
      });
      store.authenticated = true
    }
  }
}
</script>
