import { firebase } from "@firebase/app";
import 'firebase/auth';
import 'firebase/storage';
import "@firebase/firestore";

export const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyC-qDwNwNXn_U30zYlj-1QkvwLlaterBxA",
  authDomain: "radius-prototype.firebaseapp.com",
  databaseURL: "https://radius-prototype.firebaseio.com",
  projectId: "radius-prototype",
  storageBucket: "radius-prototype.appspot.com",
  messagingSenderId: "581571374985",
  appId: "1:581571374985:web:6f8e1761e0102e49b8fb58",
  measurementId: "G-W7ERWMLZ9P"
});

export const db = firebaseApp.firestore();
export const storageRef = firebase.storage().ref();

var firebaseui = require('firebaseui');

/*
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    console.log("logged in");
  } else {
    // No user is signed in.
    console.log("not logged in");
    this.$router.replace({ name: "login" });
  }
});
*/