<template>
  <div id="PageContainer" style="background-color: #e0fffd; min-height:120vh">
    <div style="height: 70px"></div>
    <div style="margin-left: 5%; display: flex; flex-direction: column">
      <h1>Your Advertisements</h1>
      <div class="grid-container" style="width:90%; height: 750px; background-color:white;">
        <div class="BillboardList">
          <div style="height: 75px; display: flex; flex-direction: column; border: 1px solid lightgrey;">
            <h3 style="margin-left: 5px; margin-bottom: 0px">Selected Area</h3>
            <form action="/action_page.php">
              <select name="cars" id="cars" style="border-radius: 40px; border: 1px solid grey; width: 90%; margin-left: 5px">
                <option value="volvo">Downtown Toronto</option>
                <option value="saab">Saab</option>
                <option value="opel">Opel</option>
                <option value="audi">Audi</option>
              </select>
            </form>
          </div>
          <div v-for='ad in adverts' :key='ad' style="height: 70px; display: flex; flex-direction: column; border: 1px solid lightgrey;">
            <h3 style="margin-bottom: 0px; margin-left: 5px;">{{ ad.name }}</h3>
            <p style="margin-bottom: 0px; color: black; font-size: 12px; margin-left: 5px;">Last Updated: {{ ad.lastUpdated }}</p>
          </div>
        </div>
        <div class="BillboardMap">
          <div style="margin: auto; display: flex; flex-direction: column">
            <div style="width: 480px; height: 360px; background-color: red; margin-bottom: 10px">

            </div>
            <div style="display: flex; flex-direction: row">
              <h3>Upload Image:</h3>
              <input type="file"
              id="avatar" name="avatar"
              accept="image/png, image/jpeg"
              style="margin-left: 10px">
            </div>
            <base-input placeholder="Name" class="advertInput"></base-input>
            <base-input placeholder="Title" class="advertInput"></base-input>
            <base-input placeholder="Description" class="advertInput"></base-input>
            <base-input placeholder="URL" class="advertInput"></base-input>
            <base-button size="sm" type="primary">Save</base-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
 import { firebase } from "@firebase/app";
 import { db, storageRef } from './firebase';
 import { L, latLng } from 'leaflet';
 import { LMap, LTileLayer, LMarker, LPopup, LTooltip } from 'vue2-leaflet';

  export default {
    components: {
      LMap,
      LTileLayer,
      LMarker,
      LPopup,
      LTooltip
    },
    data() {
      return {
        adverts: 
        [
          {
            name: "Ad 1",
            lastUpdated: "2020-07-22"
          },
          {
            name: "Ad 1",
            lastUpdated: "2020-07-22"
          },
          {
            name: "Ad 1",
            lastUpdated: "2020-07-22"
          },
          {
            name: "Ad 1",
            lastUpdated: "2020-07-22"
          },
          {
            name: "Ad 1",
            lastUpdated: "2020-07-22"
          },
          {
            name: "Ad 1",
            lastUpdated: "2020-07-22"
          },
          {
            name: "Ad 1",
            lastUpdated: "2020-07-22"
          },
          {
            name: "Ad 1",
            lastUpdated: "2020-07-22"
          },
          {
            name: "Ad 1",
            lastUpdated: "2020-07-22"
          }, 
          {
            name: "Ad 1",
            lastUpdated: "2020-07-22"
          },
          {
            name: "Ad 1",
            lastUpdated: "2020-07-22"
          },
          {
            name: "Ad 1",
            lastUpdated: "2020-07-22"
          }
        ],
      }
    },
    mounted() {
      /*
      var user = firebase.auth().currentUser;

        if (user) {
            // User is signed in.
            console.log("Signed in");
            console.log(user);
        } else {
            // No user is signed in.
            console.log("Signed out");
            this.$router.replace({ name: "login" });
        }
        */
    },
  }
</script>

<style>
h1, h2, h3 {
  color: black;
}

#PageContainer {
  display:flex;
  flex-direction:column; 
}

.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  gap: 1px 1px;
  grid-template-areas: "BillboardList BillboardMap BillboardMap BillboardMap BillboardMap";
}

.BillboardList { 
  grid-area: BillboardList;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
}

.BillboardMap { 
  grid-area: BillboardMap;
  display:flex;
  flex-direction: column;
}

.advertInput {
  margin-bottom: 10px;
}



</style>

