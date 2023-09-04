<template>
    <div>
      <!--
      <h1 class="display-4">Hello, world!</h1>
      <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
      <hr class="my-4">
      <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
      <a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a>-->
      <span style="">Hi {{globalUsername}}!
              <img :src="globalImage" style="width:50px;height:50px;border-radius:25px;"></span><br>
    <section v-for="match in matches" :key="match.id" :info="match" class="msger">
    <div v-if="match.crush_username===globalUsername || match.match_crush_username===globalUsername">
        <header class="msger-header">
            <div class="msger-header-title">
            <i class="fas fa-comment-alt"></i> Conversation with <span v-if="match.match_crush_username===globalUsername">{{match.crush_username}}</span><span v-else>{{match.match_crush_username}}</span>
            </div>
            <div class="msger-header-options">
            <span><i class="fas fa-cog"></i></span>
            </div>
        </header>

        <main class="msger-chat">
            <div class="msg left-msg">

            <div class="msg-bubble">
                <div class="msg-info">
                <div class="msg-info-name"></div>
                </div>

              <div v-for="chat in chat" :key="chat.id" :info="chat">
                <div v-if="chat.sympathy === match.crush_username && chat.currentUser === globalUsername">
                  <h4 style="margin-left:20px;text-align: initial;">{{chat.currentUser}}</h4>
                  <div style="text-align:initial"><img src="@/assets/user_icon.png" style="width:50px;height:50px;border-radius:25px"></div>
                  <p style="text-align: initial;">{{chat.message}}</p>
                  <div class="msg-info-time"> <p style="text-align: initial;">{{formatDate(chat.date_time)}}</p></div>
                </div>
                <div v-if="chat.sympathy === match.match_crush_username && chat.currentUser === globalUsername">
                  <h4 style="margin-left:20px;text-align: initial;">{{chat.currentUser}}</h4>
                  <div style="text-align:initial"><img src="@/assets/user_icon.png" style="width:50px;height:50px;border-radius:25px"></div>
                  <p style="text-align: initial;">{{chat.message}}</p>
                  <div class="msg-info-time"> <p style="text-align: initial;">{{formatDate(chat.date_time)}}</p></div>
                </div>
                <div v-if="chat.sympathy === globalUsername && chat.currentUser === match.crush_username">
                  <h4 style="margin-left:20px;text-align: initial;">{{chat.currentUser}}</h4>
                  <div style="text-align:initial"><img src="@/assets/user_icon.png" style="width:50px;height:50px;border-radius:25px"></div>
                  <p style="text-align: initial;">{{chat.message}}</p>
                  <div class="msg-info-time"> <p style="text-align: initial;">{{formatDate(chat.date_time)}}</p></div>
                </div>
                <div v-if="chat.sympathy === globalUsername && chat.currentUser === match.match_crush_username">
                  <h4 style="margin-left:20px;text-align: initial;">{{chat.currentUser}}</h4>
                  <div style="text-align:initial"><img src="@/assets/user_icon.png" style="width:50px;height:50px;border-radius:25px"></div>
                  <p style="text-align: initial;">{{chat.message}}</p>
                  <div class="msg-info-time"> <p style="text-align: initial;">{{formatDate(chat.date_time)}}</p></div>
                </div>
              </div>
            </div>
            </div>
        </main>

        <form class="msger-inputarea">
            <input v-model="message" type="text" class="msger-input" placeholder="Enter your message...">
            <button type="submit" @click.prevent="sendMessage(message,match.crush_username,match.match_crush_username,match.match_id)" class="msger-send-btn">Send</button>
        </form>
    </div>
    </section>
</div>

</template>
<script>
import { firebase, db } from '@/firebase'
import store from '@/store.js'
import moment from 'moment'
//import dayjs from 'dayjs'
export default({
    data: function(){
        return{
            users:[],
            matches:[],
            username:'',
            image_url:'',
            gender:'',        
            interests:'', 
            nature:'', 
            animals:'', 
            reading_books:'',
            watching_movies:'',
            about_you:'',
            globalUsername:'',
            globalImage:'',
            selectedMatch:null,
            message:'',
            chat:[],
            date_time:null
        }
    },
    
    methods:{
        fetchMutualSympathy() {
            db.collection("like_person")
                .get()
                .then((query) => {
                const users = []; // kreiranje praznog polja za korisnike
                query.forEach((doc) => {
                    const data = doc.data();
                    users.push(data); // dodavanje podataka korisnika u polje users
                });

                // Iteriranje kroz polje users kako bi se pronašli korisnici s obostranim simpatijama
                for (let i = 0; i < users.length; i++) {
                    for (let j = i + 1; j < users.length; j++) {
                      //Petlja stoji na prvom dokumentu i ali zato iterira drugi dokument j do kraja, kada j dođe do kraja i kreće na drugi dokument i zatim j ide ponovno do kraja
                    if (
                        users[i].crush_username === users[j].username && //users[i].crush_username === users[j].username -> Ako se korisniku iz dokumenta i (Filip) sviđa osoba iz dokumenta j (Ivana)
                        users[i].username === users[j].crush_username //users[i].username === users[j].crush_username -> Ako se toj istoj osobi (Ivana) sviđa ta prva osoba (Filip)
                        //kad su u dva različita dokumenta obostrane simpatije ulazi se u ovaj uvijet
                        ) {
                        // Ako postoje obostrane simpatije, stvaranje novog objekta u this.matches
                        let matched_person;
                        
                        if(users[i].crush_username!==users[i].username){
                          //Tražimo simpatiju osobe iz i dokumenta
                          console.log('users[i].username: ',users[i].username)
                          matched_person = users[i].username;
                        }
                        else if(users[j].match_crush_username!==users[i].username){
                          //Tražimo simpatiju osobe iz j dokumenta
                          console.log('users[j].match_crush_username ',users[j].match_crush_username)
                          matched_person = users[j].match_crush_username;
                        }
                        
                        //Dodaje se match_id, odnosno imena obostranih simpatija pridružuju se u jednu varijablu (Npr. Filip and Ivana)
                        let match_id = matched_person + " and " + users[j].username;
                        //U memoriju formiramo objekt sa obostranim simpatijama
                        
                        this.matches.push({
                          
                            username: users[i].username,
                            crush_username: users[i].crush_username,
                            crush_image: users[i].crush_image,
                            match_username: users[j].username,
                            match_crush_username: users[j].crush_username,
                            match_id: match_id
                        });
                        
                        console.log("Evo obostranih simpatija: ",this.matches);
                    }
                    }
                }
                });
        },
        
        sendMessage(message,crush_username,match_crush_username,match_id){
        let realCrush;
        if(crush_username!==this.globalUsername){
            realCrush=crush_username;
        }
        if(match_crush_username!==this.globalUsername){
            realCrush=match_crush_username;
        }
        try {
        db.collection("chat")
            .doc()
            .set({
                user:this.globalUsername,
                toUser:realCrush,
                message:message,
                date_time:this.date_time,
                match_id:match_id
            });
        } 
        catch(error) {
          
            }
        },
        
        fetchMessage() {
          db.collection("chat")
            .get()
            .then((query) => {
              query.forEach((doc) => {
                const data = doc.data();
                console.log(data);
                this.docs = data;
                let changedDate = data.date_time.replace(/(\d{2}).(\d{2}).(\d{4})/, '$2/$1/$3');
                let finalDate = new Date(changedDate);
                // Uklanjanje vremenske zone iz objekta Date
                this.chat.push({
                  message: data.message,
                  sympathy: data.toUser,
                  currentUser: data.user,
                  date_time: finalDate
                });
              });

              this.chat.sort((a, b) => a.date_time - b.date_time);

            });
},
    dateTime(value) {
      this.date_time = moment(value).format('DD.MM.YYYY HH:mm:ss')
      console.log(this.date_time)
      return moment(value).format('DD.MM.YYYY HH:mm:ss')
    },
    formatDate(date) {
      return new Date(date).toLocaleString();
    }
    },
    mounted(){
        this.fetchMutualSympathy();
        this.globalUsername=store.userName;
        this.globalImage=store.userImg;
        this.fetchMessage();
        let a = this.dateTime();
        console.log(a)
        console.log("Globalni username: ",this.globalUsername)
    }

});

</script>

<style scoped>
:root {
  --body-bg: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  --msger-bg: #fff;
  --border: 2px solid #ddd;
  --left-msg-bg: #ececec;
  --right-msg-bg: #579ffb;
}

html {
  box-sizing: border-box;
}

*,
*:before,
*:after {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}

body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: var(--body-bg);
  font-family: Helvetica, sans-serif;
}

.msger {
  display: flex;
  flex-flow: column wrap;
  justify-content: space-between;
  width: 100%;
  max-width: 867px;
  margin: 25px 10px;
  height: calc(100% - 50px);
  border: var(--border);
  border-radius: 5px;
  background: var(--msger-bg);
  box-shadow: 0 15px 15px -5px rgba(0, 0, 0, 0.2);
}

.msger-header {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: var(--border);
  background: #eee;
  color: #666;
}

.msger-chat {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
}
.msger-chat::-webkit-scrollbar {
  width: 6px;
}
.msger-chat::-webkit-scrollbar-track {
  background: #ddd;
}
.msger-chat::-webkit-scrollbar-thumb {
  background: #bdbdbd;
}
.msg {
  display: flex;
  align-items: flex-end;
  margin-bottom: 10px;
}
.msg:last-of-type {
  margin: 0;
}
.msg-img {
  width: 50px;
  height: 50px;
  margin-right: 10px;
  background: #ddd;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 50%;
}
.msg-bubble {
  max-width: 450px;
  padding: 15px;
  border-radius: 15px;
  background: var(--left-msg-bg);
}
.msg-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.msg-info-name {
  margin-right: 10px;
  font-weight: bold;
}
.msg-info-time {
  font-size: 0.85em;
}

.left-msg .msg-bubble {
  border-bottom-left-radius: 0;
}

.right-msg {
  flex-direction: row-reverse;
}
.right-msg .msg-bubble {
  background: var(--right-msg-bg);
  color: #fff;
  border-bottom-right-radius: 0;
}
.right-msg .msg-img {
  margin: 0 0 0 10px;
}

.msger-inputarea {
  display: flex;
  padding: 10px;
  border-top: var(--border);
  background: #eee;
}
.msger-inputarea * {
  padding: 10px;
  border: none;
  border-radius: 3px;
  font-size: 1em;
}
.msger-input {
  flex: 1;
  background: #ddd;
}
.msger-send-btn {
  margin-left: 10px;
  background: rgb(0, 196, 65);
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.23s;
}
.msger-send-btn:hover {
  background: rgb(0, 180, 50);
}

.msger-chat {
  background-color: #fcfcfe;
  /*background-image: url("");*/
}

</style>