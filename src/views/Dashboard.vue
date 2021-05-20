<template>
  <div id="PageContainer" style="background-color: #e0fffd; min-height:100vh">
    <div style="height: 70px"></div>
    <div style="margin-left: 5%; display: flex; flex-direction: column">
      <h1>Virtual Billboards</h1>
      <div class="grid-container" style="width:90%; height: 500px; background-color:white;">
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
          <button v-for='billboard in billboards' :key='billboard' @click="innerClick(billboard)" style="height: 70px; display: flex; flex-direction: column; border: 1px solid lightgrey;">
            <h3 style="margin-bottom: 0px; margin-left: 5px;">{{ billboard.address }}</h3>
            <p style="margin-bottom: 0px; color: black; font-size: 12px; margin-left: 5px;">Current Bid: ${{ billboard.bid }}</p>
            <p style="margin-bottom: 0px; color: black; font-size: 12px; margin-left: 5px;">Closing Time: {{ billboard.closingTime }}</p>
          </button>
        </div>
        <div class="BillboardMap">
          <l-map
            v-if="showMap"
            :zoom="zoom"
            :center="center"
            :options="mapOptions"
            style="height: 100%"
            @update:center="centerUpdate"
            @update:zoom="zoomUpdate"
          >
            <l-tile-layer
              :url="url"
              :attribution="attribution"
            />
            <l-marker :lat-lng="withPopup">
              <l-popup>
                <div @click="innerClick">
                  I am a popup
                  <p v-show="showParagraph">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                    sed pretium nisl, ut sagittis sapien. Sed vel sollicitudin nisi.
                    Donec finibus semper metus id malesuada.
                  </p>
                </div>
              </l-popup>
            </l-marker>
            <l-marker :lat-lng="withTooltip">
              <l-tooltip :options="{ permanent: true, interactive: true }">
                <div @click="innerClick">
                  I am a tooltip
                  <p v-show="showParagraph">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                    sed pretium nisl, ut sagittis sapien. Sed vel sollicitudin nisi.
                    Donec finibus semper metus id malesuada.
                  </p>
                </div>
              </l-tooltip>
            </l-marker>
            <l-marker v-for='billboard in billboards' :key='billboard' :lat-lng=billboard.latLong>
              <l-tooltip :options="{ permanent: true, interactive: true }">
                <div @click="innerClick(billboard)">
                  <p v-show="billboard.showPointer">Pointer</p>
                  
                  <div v-show="billboard.showParagraph">
                  <p>
                    {{ billboard.address }}
                  </p>

                  <p>
                    Current Bid: {{ billboard.bid }}
                  </p>

                  <p>
                    Closing Time: {{ billboard.closingTime }}
                  </p>
                  </div>
                </div>
              </l-tooltip>
            </l-marker>
          </l-map>
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
        billboards: 
        [
          {
            address: "Nathan Phillips Square",
            bid: "600.00",
            closingTime: "11:59pm",
            latLong: latLng(43.6532, -79.3832),
            showParagraph: false,
            showPointer: true
          },
          {
            address: "University of Toronto",
            bid: "600.00",
            closingTime: "11:59pm",
            latLong: latLng(43.662767, -79.395560),
            showParagraph: false,
            showPointer: true
          },
          {
            address: "Yonge and Queen",
            bid: "600.00",
            closingTime: "11:59pm",
            latLong: latLng(43.652439, -79.379246),
            showParagraph: false,
            showPointer: true
          },
          {
            address: "CN Tower",
            bid: "600.00",
            closingTime: "11:59pm",
            latLong: latLng(43.641836, -79.386396),
            showParagraph: false,
            showPointer: true
          },
        ],
        zoom: 13,
        center: latLng(43.6532, -79.3832),
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        withPopup: latLng(47.41322, -1.219482),
        withTooltip: latLng(47.41422, -1.250482),
        currentZoom: 11.5,
        currentCenter: latLng(47.41322, -1.219482),
        showParagraph: false,
        mapOptions: {
          zoomSnap: 0.5
        },
        showMap: true
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
    methods: {
      zoomUpdate(zoom) {
        this.currentZoom = zoom;
      },
      centerUpdate(center) {
        this.currentCenter = center;
      },
      showLongText() {
        this.showParagraph = !this.showParagraph;
      },
      innerClick(billboard) {
        //alert("Click!");
        if (!billboard.showParagraph) {
          for (var i = 0; i<this.billboards.length; i++)
          {
            this.billboards[i].showParagraph = false;
            this.billboards[i].showPointer = false;
          }
          billboard.showParagraph = true;
        }
        else{
          billboard.showParagraph = false;
          for (var i = 0; i<this.billboards.length; i++)
          {
            this.billboards[i].showPointer = true;
            console.log("asdf");
          }
        }
        
      }
    }
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

.BillboardMap { grid-area: BillboardMap; }



</style>

