<template>
  <div>
    <h1>Create an account</h1>
    <div class="container">
      <div class="row mt-5">
        <div class="col-sm">
        </div>
        <div class="col-sm">
          <form>
            <div class="form-group">
              <label for="emailField">Email address</label>
              <input v-model="email" type="text" class="form-control" id="emailField" aria-describedby="emailHelp" placeholder="Enter email">
            </div>
            <div class="form-group">
              <label for="usernameField">Username</label>
              <input v-model="username" type="text" class="form-control" id="usernameField" aria-describedby="emailHelp" placeholder="Enter email">
            </div>
            <div class="form-group">
              <label for="passwordField">Password</label>
              <input v-model="password" type="password" class="form-control" id="passwordField" placeholder="Password">
            </div>
            <div class="form-group">
              <label for="confirmPasswordField">Confirm Password</label>
              <input v-model="repeat_password" type="password" class="form-control" id="confirmPasswordField" placeholder="Confirm password">
            </div>
            <button @click="register_button()" type="submit" class="btn btn-primary mt-5">Submit</button>
          </form>
        </div>
        <div class="col-sm">
        </div>
      </div>
    </div>

  </div>
</template>

<script>

import { firebase, db } from '@/firebase.js'

export default {
  data: function () {
    return {
      email:'',
      username:'',
      password:'',
      repeat_password:''
    }
  },
  methods: {
    register_button(){
      try {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password);
      const id = this.email;
      db.collection("user")
        .doc(id)
        .set({
          username: this.username,
          email: this.email,
          password: this.password,
        });
      
      this.$router.replace({ name: 'home'});
    } 
    catch(error) {
      
    }
  }
    
  }
}
</script>
