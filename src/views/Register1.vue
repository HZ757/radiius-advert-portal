<template>
    <div class="row justify-content-center">
        <div class="col-lg-5 col-md-7">
            <div class="card bg-secondary shadow border-0">
                <div class="card-body px-lg-5 py-lg-5">
                    <div class="text-center text-muted mb-4">
                        <small>Step 2</small>
                    </div>
                    <form role="form">

                        <base-input placeholder="Phone Number" v-model="phoneNumber"></base-input>

                        <base-input placeholder="Website" v-model="website"></base-input>

                        <base-input placeholder="Business Email" v-model="businessEmail"></base-input>

                        <div class="text-center">
                            <base-button type="primary" class="my-4" v-on:click="register1()">Continue</base-button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { firebase } from "@firebase/app";
import "@firebase/firestore";
import { db } from './firebase';

let query = db.collection("businesses").doc(firebase.auth().currentUser.uid);

export default {
    name: 'register',
    data() {
      return {
        phoneNumber: null,
        website: null,
        businessEmail: null,
      }
    },
    methods: {
        register1() {
            globalThis.phoneNumber = this.phoneNumber;
            globalThis.website = this.website;
            globalThis.businessEmail = this.businessEmail;
            this.$router.replace({ name: "register2" });
        }
    },
    mounted() {
    }
}
</script>

<style>
</style>
