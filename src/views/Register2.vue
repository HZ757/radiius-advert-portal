<template>
    <div class="row justify-content-center">
        <div class="col-lg-5 col-md-7">
            <div class="card bg-secondary shadow border-0">
                <div class="card-body px-lg-5 py-lg-5">
                    <div class="text-center text-muted mb-4">
                        <small>Step 3</small>
                    </div>
                    <form role="form">
                        
                        Choose Avatar
                        <input type="file" @change="onFileSelected">

                        <base-input placeholder="Description" style="margin-top: 10px" v-model="description"></base-input>

                        <div class="text-center">
                            <base-button type="primary" class="my-4" v-on:click="register2()">Finish Creating Account</base-button>
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
import { db, storageRef } from './firebase';

let query = db.collection("businesses").doc(firebase.auth().currentUser.uid);
let avatarRef = storageRef.child('avatars/'.concat(firebase.auth().currentUser.uid).concat('.jpg'));

export default {
    name: 'register',
    data() {
      return {
        description: null,
        selectedFile: null,
      }
    },
    methods: {
        onFileSelected(event){
            this.selectedFile = event.target.files[0];
        },
        register2() {
            query.set({
                address: globalThis.address,
                city: globalThis.city,
                desc: this.description,
                email: globalThis.businessEmail,
                id: firebase.auth().currentUser.uid,
                name: globalThis.businessName,
                phoNum: globalThis.phoneNumber,
                postCode: globalThis.postalCode,
                prodSecs: [],
                prov: globalThis.province,
                tags: [],
                web: globalThis.website,
            })

            avatarRef.put(this.selectedFile)

            this.$router.replace({ name: "dashboard" });
        }
    },
    mounted() {
        
    }
}
</script>

<style>
</style>
