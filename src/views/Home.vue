<template>
  <div>
    <!--
    <h1 class="display-4">Hello, world!</h1>
    <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
    <hr class="my-4">
    <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
    <a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a>-->
    <section id="team" class="pb-5">
    <div class="container">
        <h5 class="section-title h1">FIND YOUR MATCH</h5>
        <div class="row">
            <!-- Team member -->
            <div v-for="user in users" :key="user.id" :info="user" class="col-xs-12 col-sm-6 col-md-4">
                <div class="image-flip">
                    <div class="mainflip flip-0">
                        <div class="frontside">
                            <div class="card">
                                <div class="card-body text-center">
                                    <p><img :src="user.image_url" class=" img-fluid" alt="card image"></p>
                                    <h4 class="card-title"> {{user.username}} </h4>
                                    <p class="card-text">{{user.about_you}}</p>
                                </div>
                            </div>
                        </div>
                        <div class="backside">
                            <div class="card">
                                <h4 class="card-title">{{user.username}}</h4>
                                <div class="card-body text-left mt-4">
                                    <p class="card-text">I like:</p>
                                    <p>{{user.nature}}</p>
                                    <p>{{user.animals}}</p>
                                    <p>{{user.reading_books}}</p>
                                    <p>{{user.watching_movies}}</p>
                                    <p>Searching for {{user.interests}}</p>
                                    <p style="font-size:20px;color:#1d8e1d">Do you like <span v-if="user.gender=='male'">him?</span><span v-else>her?</span></p>
                                    <button @click="match_person(user.username,user.about_you,user.nature,user.animals,user.reading_books,user.watching_movies,user.interests)" style="border:none"><img style="height:50px;width:50px" src="../assets/heart-icon.png"></button>
                                </div>
                                    
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- ./Team member -->

        </div>
    </div>
    
</section>
   

  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import { firebase, db } from '@/firebase'
import store from '@/store.js'
export default {
  name: 'home',
  components: {
    HelloWorld
  },
  data: function(){
    return{
        users:[],
        username:'',
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
  methods:{
    fetchUser() {
            db.collection("user")
            .get()
            .then((query) => {
                query.forEach((doc) => {
                    const data = doc.data();
                    console.log(data);
                    this.docs=data;
                   
                    this.users.push({
                        id: doc.id,
                        username: data.username,
                        image_url: data.image_url,
                        gender: data.gender,
                        interests: data.interests,
                        nature: data.nature,
                        animals: data.animals,
                        reading_books: data.reading_books,
                        watching_movies: data.watching_movies,
                        about_you: data.about_you
      
                    })
                    
                    
                });
            });
    },
    match_person(crush_username,crush_description,crush_nature,crush_animals,crush_reading_books,crush_watching_movies,crush_interests){
      try {
      db.collection("like_person")
        .doc()
        .set({
          username: store.userName,
          email: store.userEmail,
          /*image_url: this.image_url,
          gender: this.gender,
          interests: this.interests,
          nature: this.nature,
          animals: this.animals,
          reading_books: this.reading_books,
          watching_movies: this.watching_movies,
          about_you: this.about_you,*/

          crush_username: crush_username,
          crush_description: crush_description,
          crush_nature: crush_nature,
          crush_animals: crush_animals,
          crush_reading_books: crush_reading_books,
          crush_watching_movies: crush_watching_movies,
          crush_interests: crush_interests
        });
      
      //this.$router.replace({ name: 'home'});
    } 
    catch(error) {
      
    }
  }
    
  },
  mounted(){
        console.log("random message")
        this.fetchUser();
        console.log(this.users)
    }
}

</script>
<style scoped>
 @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap');  
 *{  
  margin: 0;  
  padding: 0;  
  box-sizing: border-box;  
  font-family: 'Poppins', sans-serif;  
 }  
 ::selection{  
  color: #fff;  
  background: #fff;  
 }  
 @import url('https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');
#team {
    background: #eee !important;
}

.btn-primary:hover,
.btn-primary:focus {
    background-color: #108d6f;
    border-color: #108d6f;
    box-shadow: none;
    outline: none;
}

.btn-primary {
    color: #fff;
    background-color: #007b5e;
    border-color: #007b5e;
}

section {
    padding: 60px 0;
}

section .section-title {
    text-align: center;
    color: #1d8e1d;
    margin-bottom: 50px;
    text-transform: uppercase;
}

#team .card {
    border: none;
    background: #ffffff;
}

.image-flip:hover .backside,
.image-flip.hover .backside {
    -webkit-transform: rotateY(0deg);
    -moz-transform: rotateY(0deg);
    -o-transform: rotateY(0deg);
    -ms-transform: rotateY(0deg);
    transform: rotateY(0deg);
    border-radius: .25rem;
}

.image-flip:hover .frontside,
.image-flip.hover .frontside {
    -webkit-transform: rotateY(180deg);
    -moz-transform: rotateY(180deg);
    -o-transform: rotateY(180deg);
    transform: rotateY(180deg);
}

.mainflip {
    -webkit-transition: 1s;
    -webkit-transform-style: preserve-3d;
    -ms-transition: 1s;
    -moz-transition: 1s;
    -moz-transform: perspective(1000px);
    -moz-transform-style: preserve-3d;
    -ms-transform-style: preserve-3d;
    transition: 1s;
    transform-style: preserve-3d;
    position: relative;
}

.frontside {
    position: relative;
    -webkit-transform: rotateY(0deg);
    -ms-transform: rotateY(0deg);
    z-index: 2;
    margin-bottom: 30px;
}

.backside {
    position: absolute;
    top: 0;
    left: 0;
    background: white;
    -webkit-transform: rotateY(-180deg);
    -moz-transform: rotateY(-180deg);
    -o-transform: rotateY(-180deg);
    -ms-transform: rotateY(-180deg);
    transform: rotateY(-180deg);
    -webkit-box-shadow: 5px 7px 9px -4px rgb(158, 158, 158);
    -moz-box-shadow: 5px 7px 9px -4px rgb(158, 158, 158);
    box-shadow: 5px 7px 9px -4px rgb(158, 158, 158);
}

.frontside,
.backside {
    -webkit-backface-visibility: hidden;
    -moz-backface-visibility: hidden;
    -ms-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-transition: 1s;
    -webkit-transform-style: preserve-3d;
    -moz-transition: 1s;
    -moz-transform-style: preserve-3d;
    -o-transition: 1s;
    -o-transform-style: preserve-3d;
    -ms-transition: 1s;
    -ms-transform-style: preserve-3d;
    transition: 1s;
    transform-style: preserve-3d;
}

.frontside .card,
.backside .card {
    min-height: 312px;
    min-width: 300px;
}

.backside .card a {
    font-size: 18px;
    color: #1d8e1d !important;
}

.frontside .card .card-title,
.backside .card .card-title {
    color: #1d8e1d !important;
}

.frontside .card .card-body img {
    width: 200px;
    height: 200px;
    border-radius: 50%;
}

.card {
    margin-left:20px;
}

/*like button*/

</style>
