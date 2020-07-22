<template>
    <div class="row justify-content-center">
        <div class="col-lg-5 col-md-7">
            <div class="card bg-secondary shadow border-0">
                <div class="card-body px-lg-5 py-lg-5">
                    <div class="text-center text-muted mb-4">
                        <small>Step 1</small>
                    </div>
                    <form role="form">

                        <base-input placeholder="Business Name" v-model="businessName"></base-input>

                        <base-input placeholder="Address" v-model="address"></base-input>

                        <base-input placeholder="Postal Code" v-model="postalCode"></base-input>

                        <base-input placeholder="City" v-model="city"></base-input>

                        <base-input placeholder="Province" v-model="province"></base-input>

                        <div class="text-center">
                            <base-button type="primary" class="my-4" v-on:click="register0()">Continue</base-button>
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
        businessName: null,
        address: null,
        postalCode: null,
        city: null,
        province: null,
      }
    },
    methods: {
        register0() {
            //var globalThis = getGlobalThis();
            globalThis.businessName = this.businessName;
            globalThis.address = this.address;
            globalThis.postalCode = this.postalCode;
            globalThis.city = this.city;
            globalThis.province = this.province;
            this.$router.replace({ name: "register1" });
        }
    },
    mounted() {
        console.log("Mounted");
        console.log(query.get());
        query.get()
            .then((docSnapshot) => {
                if (docSnapshot.exists) {
                    console.log("Document Does Exist");
                    this.$router.replace({ name: "dashboard" });
                } else {
                    //usersRef.set({...}) // create the document
                    console.log("Document does not exist")
                }
            });
    }
}
</script>

<style>
</style>
