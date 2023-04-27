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
              <input v-model="username" type="text" class="form-control" id="usernameField" aria-describedby="emailHelp" placeholder="Enter username">
            </div>
            <div class="form-group">
              <label for="passwordField">Password</label>
              <input v-model="password" type="password" class="form-control" id="passwordField" placeholder="Password">
            </div>
            <div class="form-group">
              <label for="confirmPasswordField">Confirm Password</label>
              <input v-model="repeat_password" type="password" class="form-control" id="confirmPasswordField" placeholder="Confirm password">
            </div>
            <div class="form-group">
              <label for="confirmPasswordField">Add your photo</label>
              <input v-model="image_url" type="text" class="form-control" id="confirmPasswordField" placeholder="Image URL">
            </div>
            <label for="gender">What's your gender?</label>
            <select v-model="gender" name="cars" id="cars">
              <option value="male">male</option>
              <option value="female">female</option>
            </select>
            <br><br>
            <label for="interests">Why are you here?</label>
            <select v-model="interests" name="cars" id="cars">
              <option value="friends">Looking for friends</option>
              <option value="relationship">Looking for long term relationship</option>
              <option value="person to talk to">Find out what will happen</option>
            </select>
            <br><br>
            <label for="interests">What do you like?</label>
            <label class="container">Walking in nature
              <input v-model="nature" type="checkbox">
              <span class="checkmark"></span>
            </label>
            <label class="container">Animals
              <input v-model="animals" type="checkbox">
              <span class="checkmark"></span>
            </label>
            <label class="container">Reading books
              <input v-model="reading_books" type="checkbox">
              <span class="checkmark"></span>
            </label>
            <label class="container">Watching movies
              <input v-model="watching_movies" type="checkbox">
              <span class="checkmark"></span>
            </label>
            <label for="story">Tell us something about you:</label>
            <textarea v-model="about_you" id="story" name="story"
                      rows="5" cols="33">
            </textarea>
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
      repeat_password:'',
      image_url:'',
      gender:'',
      interests:'',
      nature:'',
      animals:'',
      reading_books:'',
      watching_movies:'',
      about_you:''
    }
  },
  methods: {
    register_button(){
      try {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password);
      const id = this.email;
      if(this.nature==true) this.nature = "walking in nature";
      if(this.animals==true) this.animals = "animals";
      if(this.reading_books==true) this.reading_books = "reading books";
      if(this.watching_movies==true) this.watching_movies = "watching movies";
      db.collection("user")
        .doc(id)
        .set({
          username: this.username,
          email: this.email,
          password: this.password,
          image_url: this.image_url,
          gender: this.gender,
          interests: this.interests,
          nature: this.nature,
          animals: this.animals,
          reading_books: this.reading_books,
          watching_movies: this.watching_movies,
          about_you: this.about_you
        });
      
      this.$router.replace({ name: 'home'});
    } 
    catch(error) {
      
    }
  }
    
  }
}
</script>
