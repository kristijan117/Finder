import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDVDsDuos2fn4T-utHNOFbVeqRFLa_vvZQ",
  authDomain: "finder-6f2e6.firebaseapp.com",
  projectId: "finder-6f2e6",
  storageBucket: "finder-6f2e6.appspot.com",
  messagingSenderId: "724477821298",
  appId: "1:724477821298:web:e7bacfa086795145dd9deb",
  measurementId: "G-GY00PE4KSQ"
};

firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();
let storage = firebase.storage();

export { 
    firebase, db, storage 
};
  
