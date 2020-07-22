<template>
        <div class="row justify-content-center" style="height:100vh">
            <div class="col-lg-5 col-md-7">
                <div id="firebaseui-auth-container"></div>
            </div>
        </div>
</template>
<script>
import { firebaseApp } from './firebase';
import 'firebase/auth';
import "firebaseui/dist/firebaseui.css";
var firebase = require('firebase');
var firebaseui = require('firebaseui');

  export default {
    name: 'login',
    data() {
      return {
        model: {
          email: '',
          password: ''
        }
      }
    },
    mounted() {
        var ui = new firebaseui.auth.AuthUI(firebaseApp.auth());
        var uiConfig = {
            signInSuccessUrl: "#/register",
            signInOptions: [
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                firebase.auth.EmailAuthProvider.PROVIDER_ID,
            ]
        };
        ui.start("#firebaseui-auth-container", uiConfig);
    }
  }
</script>


<style>
</style>
