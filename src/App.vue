<template>
  <div id="app">

    <nav class="navbar navbar-expand-lg navbar-light bg-light mb-5">
      <router-link class="navbar-brand" to="/"><h2 class="logo-color">Finder</h2></router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    
      <div class="collapse navbar-collapse navbar-right" id="navbarSupportedContent">
        
        <router-link v-if="!authenticated" class="btn btn-color my-2 my-sm-0 mr-2" to="/login">Login</router-link>
        <span class="user-border" v-if="authenticated">
          {{ userName }}
        </span>
        <span v-if="authenticated">
          <a @click="logout" class="btn btn-info my-2 my-sm-0 mr-2" href="#">Logout</a>
        </span>
        <router-link v-if="!authenticated" class="btn btn-outline my-2 my-sm-0 mr-2" to="/signup">Signup</router-link>
        <router-link v-if="authenticated" class="btn btn-color my-2 my-sm-0 mr-2" to="/crushes">Mutual sympathies</router-link>
      
      </div>
    </nav>

    <router-view/>
  </div>
</template>

<script>
import store from '@/store.js'
import { firebase, db } from '@/firebase.js'
import router from '@/router';

export default {
  data () {
    return store;
  },

  methods: {
    logout() {
			firebase.auth().signOut().then(() =>{
				this.$router.replace({name: 'home'});
			})
    }
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("Hello user", user.email)
        db.collection("user")
          .doc(user.email)
          .get()
          .then(function(doc) {
              if (doc.exists) {
                  const data = doc.data();
                  console.log(data)
                  store.userName = data.username
                  store.userEmail = data.email
                  store.userImg = data.image_url
                  store.userGender = data.gender
              } 
              else {
                  console.log("Document does not exist!");
              }
              })
              .catch(function(error) {
                  console.log("Error getting document:", error);
              });
              store.userEmail = user.email;
              store.authenticated = true;
      } 
      else {
          console.log("No user");
          store.userEmail = null;
          store.authenticated = false;
    }
  }
    )}
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.btn-color{
  background-color:greenyellow;
}
.logo-color{
  font-size:30px;
  color:rgb(29, 142, 29);
}
.navbar-right{
  margin-left:900px;
}
.btn-info{
  background-color: #1d8e1d;
}
.btn-info:hover{
  background-color: rgb(13, 87, 13);
}
.user-border{
  background-color:#1d8e1d;
  margin: 8px;
  padding: 7px 4px;
  border-radius:5px;
  color:white;
}
</style>
