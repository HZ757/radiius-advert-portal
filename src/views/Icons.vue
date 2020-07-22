<template>
  <div id="Background">
    <div style="height: 80px;"></div>
      <h1 style="margin-left:5vw; margin-bottom:2vh;">Manage Your Tags</h1>
      <div id="TagContainer">

        <div id="Tags">
          <div id="TagList">
            <div style="height:40vh">
              <div style="color:black; margin-left: 20px; margin-top:20px">
                <h5>Your Tags:</h5>
              </div>
              <vue-tags-input
                v-model='tag'
                :tags="tags"
                @tags-changed="newTags => tags = newTags"
                style="margin-left: 10px"
              />
            </div>
            <base-button v-on:click='saveTags' type="info" style="width:130px; margin-left: 11vw;">Save</base-button>
          </div>
        </div>

      <!-- CHART FOR SCANS -->
      <card header-classes="bg-transparent"  id="Scans" style="border: 1px solid #b0b0b0">
          <div slot="header" class="row align-items-center">
              <div class="col">
                  <h6 class="text-uppercase text-muted ls-1 mb-1">Performance</h6>
                  <h5 class="h3 mb-0">Number of Scans</h5>
              </div>
          </div>

          <bar-chart
                  :height="350"
                  ref="barChart"
                  :chart-data="redBarChart.chartData"
                  style="height:30vh">
          </bar-chart>

      </card>


    </div>
   <div>
  
</div>
<tabs tabNavClasses="nav-fill flex-column flex-sm-row nav-wrapper"
      tabContentClasses="card shadow">
    <tab-pane id="Tag Rewards">
        <span slot="title">
       
            Tag Rewards
        </span>
        
        <div id="RewardContainer">
      <div id="Rewards">
        <h3>Rewards</h3>

        <!-- These Cards should be converted to components in the future -->
        <div v-for='reward in tagRewards' :key='tagRewards'>
        <div class="card" id="Reward"> 
          <div style="margin-left: 20px; margin-top: 10px; margin-bottom: 10px">
            <div style="display:flex; flex-direction:row">
              <h3 style="margin-bottom: 0px;">{{reward.data.title}}
              <base-button v-on:click='editTagReward(reward.docID)' color="#C0C0C0" type="flat"  size='sm' ><vs-icon size='17px' icon='edit'></vs-icon></base-button></h3>
              <div class="h3" style="text-align:right; flex-grow: 1; margin-right: 30px; margin-top: 0px">
                <base-button v-on:click="deleteTagReward(reward.docID)" color="#C0C0C0" type="flat" size='sm' :round='true' ><vs-icon size='12px' icon='clear'></vs-icon></base-button>
              </div>
            </div>
            
            <p>{{reward.data.desc}}</p>
            <p style="color:black">Tags needed: {{reward.data.amountNeeded}}</p>
          </div>
        </div>
      </div>
      </div>

      <div style="border-left: 1px solid grey; height: 60vh"></div>
      
      <div id="AddAReward">
        <h3>Add a Reward</h3>
         <vue-form-generator  style="margin-bottom: 5px; margin-top: 5px;":schema="tagRewardForm" :model="newTagReward" :options="formOptions">
          </vue-form-generator>
        <base-button type="info" v-on:click='saveNewTagReward' style="width:130px; margin-top: 20px;">Save</base-button>

      </div>
        <vs-popup class="holamundo"  title="Edit Reward" :active.sync="editTagRewardPopup">
          <vue-form-generator  style="margin-bottom: 5px; margin-top: 25px;":schema="tagRewardForm" :model="editTagRewardModel" :options="formOptions">
          </vue-form-generator>
          <div style=" margin-bottom: 0px; margin-top: 5px;text-align: right">    
            <base-button  v-on:click="editTagRewardPopup=false" type='seconday'  style="margin-top:0px;margin-bottom:0px">Cancel</base-button>             
            <base-button  v-on:click="saveEditedTagReward" type='info'  style="margin-top:0px;margin-bottom:0px">Save</base-button> 
          </div>
        </vs-popup>
    </div>
    </tab-pane>

    <tab-pane id="profile">
        <span slot="title">
           
            Customer Level Rewards
        </span>
      <div id="RewardContainer">
      <div id="Rewards">
        <h3>Rewards</h3>

        <!-- These Cards should be converted to components in the future -->
        <div v-for='reward in levelRewards' :key='levelRewards'>
        <div class="card" id="Reward"> 
          <div style="margin-left: 20px; margin-top: 10px; margin-bottom: 10px">
            <div style="display:flex; flex-direction:row">
              <h3 style="margin-bottom: 0px;">{{reward.data.title}}
              <base-button v-on:click='editLevelReward(reward.docID)' color="#C0C0C0" type="flat"  size='sm' ><vs-icon size='17px' icon='edit'></vs-icon></base-button></h3>
              <div class="h3" style="text-align:right; flex-grow: 1; margin-right: 30px; margin-top: 0px">
                <base-button v-on:click="deleteLevelReward(reward.docID)" color="#C0C0C0" type="flat" size='sm' :round='true' ><vs-icon size='12px' icon='clear'></vs-icon></base-button>
              </div>
            </div>
            
            <p>{{reward.data.desc}}</p>
            <p style="color:black">Required Level: {{reward.data.amountNeeded}}</p>
          </div>
        </div>
      </div>
      </div>

      <div style="border-left: 1px solid grey; height: 60vh"></div>
      
      <div id="AddAReward">
        <h3>Add a Reward</h3>
         <vue-form-generator  style="margin-bottom: 5px; margin-top: 5px;":schema="levelRewardForm" :model="newLevelReward" :options="formOptions">
          </vue-form-generator>
        <base-button type="info" v-on:click='saveNewLevelReward' style="width:130px; margin-top: 20px;">Save</base-button>

      </div>
        <vs-popup class="holamundo"  title="Edit Reward" :active.sync="editLevelRewardPopup">
          <vue-form-generator  style="margin-bottom: 5px; margin-top: 25px;":schema="levelRewardForm" :model="editLevelRewardModel" :options="formOptions">
          </vue-form-generator>
          <div style=" margin-bottom: 0px; margin-top: 5px;text-align: right">    
            <base-button  v-on:click="editLevelRewardPopup=false" type='seconday'  style="margin-top:0px;margin-bottom:0px">Cancel</base-button>             
            <base-button  v-on:click="saveEditedLevelReward" type='info'  style="margin-top:0px;margin-bottom:0px">Save</base-button> 
          </div>
        </vs-popup>
    </div>
    </tab-pane>

  
</tabs>
    
  </div>
</template>
<script>
  import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
  import { BTabs } from 'bootstrap-vue'
  import { BTab } from 'bootstrap-vue'
  import Vue from 'vue'
  import VueClipboard from 'vue-clipboard2'
  import BTooltipDirective from 'bootstrap-vue/es/directives/tooltip'
  import VueTagsInput from '@johmun/vue-tags-input'
  import BarChart from '@/components/Charts/BarChart';
  import { db } from './firebase';
  import { vsButton, vsSelect, vsPopup, vsIcon } from 'vuesax';
  import 'vuesax/dist/vuesax.css';
  import 'material-icons/iconfont/material-icons.css';
  import VueFormGenerator from "vue-form-generator";
  import "vue-form-generator/dist/vfg.css";
  import {Tabs, Tab} from 'vue-tabs-component';


  Vue.use(vsButton)
  Vue.use(vsSelect)
  Vue.use(vsPopup)
  Vue.use(vsIcon)

  Vue.use(VueClipboard)
  export default {
    components: {
      VueTagsInput,
      BarChart,
      BootstrapVue,
      IconsPlugin,
      "vue-form-generator": VueFormGenerator.component,
      'b-tabs':BTabs,
      'b-tab':BTab
    },
    directives: {
      'b-tooltip': BTooltipDirective
    },
    data() {
      return {
        tag: '',
        temp:"", 
        tags: [],
        businessUserId:null,
        redBarChart: {
          chartData: {
            labels: ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'],
            datasets: [{
              label: 'Scans',
              data: [25, 20, 30, 22, 17, 29, 30]
            }]
          }
        },
        tagRewards:[],
        levelRewards:[],
        businessDocID: null,
        newTagReward: {'title':"", 'desc':"", 'type':'tags', 'amountNeeded':'', 'redeemType':''},
        editTagRewardModel: {'title':"", 'desc':"", 'type':'tags', 'amountNeeded':'', 'redeemType':''},
        editTagRewardPopup: false,
        newLevelReward: {'title':"", 'desc':"", 'type':'level', 'amountNeeded':'', 'redeemType':''},
        editLevelRewardModel: {'title':"", 'desc':"", 'type':'level', 'amountNeeded':'', 'redeemType':''},
        editLevelRewardPopup: false,
        editingRewardDocID: null,
        tagRewardForm: {
        fields:[
                {
                    type: 'input',
                    inputType: 'text',
                    model: 'title',
                    id: 'reward_title',
                    label:"Title",
                    placeholder: 'An Awesome Reward!',
                    featured: false,
                    required: true,                 
                },
                 {
                    type: 'textArea',
                    inputType: 'text',
                    model: 'desc',
                    rows: 5,
                    id: 'reward_description',
                    label:"Description",
                    placeholder: 'The best reward in the history of rewards!',
                    featured: false,
                    required: true,                 
                },
                 {
                    type: 'input',
                    inputType: 'float',
                    model: 'amountNeeded',
                    id: 'rwards_tag_level',
                    label:"Tags Needed",
                    placeholder: '100',
                    featured: false,
                    required: true,                 
                },
                 {
                    type: 'select',
                    label: 'Type of Reward',
                    model: 'redeemType',
                    id: 'reward_type',
                    placeholder: 'Reedemable Once',
                   
                    help:'What section does your product fall under',
                    featured: false,
                    required: true,  
                    selectOptions: {
                       hideNoneSelectedText: true,
                    }, 
                    values: ['Reedemable Once', 'Reedamable Multiple Times', 'Reedemable Forever'],       
                },
              
            ],
        },
        levelRewardForm: {
        fields:[
                {
                    type: 'input',
                    inputType: 'text',
                    model: 'title',
                    id: 'reward_title',
                    label:"Title",
                    placeholder: 'An Awesome Reward!',
                    featured: false,
                    required: true,                 
                },
                 {
                    type: 'textArea',
                    inputType: 'text',
                    model: 'desc',
                    rows: 5,
                    id: 'reward_description',
                    label:"Description",
                    placeholder: 'The best reward in the history of rewards!',
                    featured: false,
                    required: true,                 
                },
                 {
                    type: 'input',
                    inputType: 'float',
                    model: 'amountNeeded',
                    id: 'rwards_tag_level',
                    label:"Required Level",
                    placeholder: '5',
                    featured: false,
                    required: true,                 
                },
                 {
                    type: 'select',
                    label: 'Type of Reward',
                    model: 'redeemType',
                    id: 'reward_type',
                    placeholder: 'Reedemable Once',
                   
                    help:'How often can this reward be redemed?',
                    featured: false,
                    required: true,  
                    selectOptions: {
                       hideNoneSelectedText: true,
                    }, 
                    values: ['Reedemable Once', 'Reedamable Multiple Times', 'Reedemable Forever'],       
                },
              
            ],
        },
        formOptions: {
        validateAfterLoad: true,
        validateAfterChanged: true,
        validateAsync: true
      },
      }
    },
    methods: {
      saveNewTagReward(){
        
        this.newTagReward['owner'] = this.businessUserId;
        console.log(this.newReward);
        var ref = db.collection('businesses').doc(this.businessDocID).collection('rewards').doc();
        var temp = {'docID': ref.id, 'data':{...this.newTagReward}};
        this.tagRewards.push(temp);
        db.collection('businesses').doc(this.businessDocID).collection('rewards').doc(ref.id).set(
          this.newTagReward,
        );
        
      },
      saveNewLevelReward(){
        
        this.newLevelReward['owner'] = this.businessUserId;
        console.log(this.newLevelReward);
        var ref = db.collection('businesses').doc(this.businessDocID).collection('rewards').doc();
        var temp = {'docID': ref.id, 'data':{...this.newLevelReward}};
        this.levelRewards.push(temp);
        db.collection('businesses').doc(this.businessDocID).collection('rewards').doc(ref.id).set(
          this.newLevelReward,
        );
        
      },
      onCopy() {
        this.$notify({
          type: 'success',
          title: 'Copied to clipboard'
        })
      },
      editTagReward(docID){
        this.editingRewardDocID = docID;
        this.editTagRewardModel =  {'title':"", 'desc':"", 'type':'tags', 'amountNeeded':'', 'redeemType':''};
        for (var i in this.tagRewards){
          if (this.tagRewards[i].docID == docID){
              this.editTagRewardModel = {...this.tagRewards[i].data};
          };
        };
        this.editTagRewardPopup = true; 
      },
      saveEditedTagReward(){
        for (var i in this.tagRewards){
          if (this.tagRewards[i].docID == this.editingRewardDocID){
              this.tagRewards[i].data ={...this.editTagRewardModel}
          };
        };
        this.editTagRewardPopup = false;
         db.collection('businesses').doc(this.businessDocID).collection('rewards').doc(this.editingRewardDocID).update(
           this.editTagRewardModel,
         );
      },
      deleteTagReward(docID){
        console.log(this.tagRewards);
        for (var i in this.tagRewards){
          if (this.tagRewards[i].docID == docID){
              this.tagRewards.splice(i, 1);
          };
        };
        console.log(this.rewards);
        db.collection('businesses').doc(this.businessDocID).collection('rewards').doc(docID).delete();
      },
      editLevelReward(docID){
        this.editingRewardDocID = docID;
        this.editLevelRewardModel =  {'title':"", 'desc':"", 'type':'level', 'amountNeeded':'', 'redeemType':''};
        for (var i in this.levelRewards){
          if (this.levelRewards[i].docID == docID){
              this.editLevelRewardModel = {...this.levelRewards[i].data};
          };
        };
        this.editLevelRewardPopup = true; 
      },
      saveEditedLevelReward(){
        for (var i in this.levelRewards){
          if (this.levelRewards[i].docID == this.editingRewardDocID){
              this.levelRewards[i].data ={...this.editLevelRewardModel}
          };
        };
        this.editLevelRewardPopup = false;
         db.collection('businesses').doc(this.businessDocID).collection('rewards').doc(this.editingRewardDocID).update(
           this.editLevelRewardModel,
         );
      },
      deleteLevelReward(docID){
        console.log(this.rewards);
        for (var i in this.levelRewards){
          if (this.levelRewards[i].docID == docID){
              this.levelRewards.splice(i, 1);
          };
        };
        console.log(this.rewards);
        db.collection('businesses').doc(this.businessDocID).collection('rewards').doc(docID).delete();
      },

      saveTags(){
        var temp = [];
        for (var i in this.tags){
          temp.push(this.tags[i].text);
        };
         db.collection('businesses').doc(this.businessDocID).update(
           {
           'tags': temp,
           }
         );
      },
      populate(){
        db.collection("businesses").where('id', '==', 'test').get()
            .then(snapshot => {
                if (snapshot.empty) {
                console.log('No matching documents.');
                return;
                }  

            snapshot.forEach(doc => {
            console.log(doc.id, '=>', doc.data());
            this.businessDocID = doc.id;
            var datum = doc.data();
            this.businessUserId = datum.id;  
            this.tags = datum.tags;
            this.getRewards();         
            });
            
            })
        .catch(err => {
            console.log('Error getting documents', err);
        });
      },
      addTab(){},
      getRewards(){
        db.collection("businesses").doc(this.businessDocID).collection('rewards').get()
            .then(snapshot => {
                if (snapshot.empty) {
                console.log('No matching documents.');
                return;
                }  

            snapshot.forEach(doc => {
            console.log(doc.id, '=>', doc.data());
            var datum = doc.data();
            var temp = {'docID':doc.id, 'data':datum};
            if (datum.type =='tags'){
              this.tagRewards.push(temp);  
            }
            else{
              this.levelRewards.push(temp);  
            }
                   
            });
            
            })
        .catch(err => {
            console.log('Error getting documents', err);
        });
        }
      },
      
      mounted(){
        this.populate();
      }
  };
</script>
<style scoped>

#Background {
    height: 200vh;
    z-index: 1;
    background-color: #e0fffd;
    display: flex;
    flex-direction: column;
}

#TagContainer {
    margin-left: 5vw;
    margin-right: 2vw;
    display: flex;
    flex-direction: row;
    margin-bottom: 20px;
}

#Tags {
    display: flex;
    flex-direction: column;
    align-content: flex-start;
}

#TagList {
    width: 32vw;
    height: 50vh;
    background-color: white;
    border: 1px solid #b0b0b0;
    border-radius: 16px;
}

.Tag {
    height: 23px;
    border-radius: 16px;
}

#Scans {
  margin-left: 2vw;
  height: 50vh;
  width: 40vw;
}

#RewardContainer {
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  
}

#Rewards {
  width: 40vw;
  margin-left: 5vw;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;

}

#AddAReward {
  width: 30vw;
  margin-left: 3vw;
  display: flex;
  flex-direction: column;
}

#Reward {
  display:flex;
  flex-direction: column;
  margin-right: 5vw;
  margin-bottom: 10px;
  border-radius: 16px;
  border: 1px solid #b0b0b0;
}

</style>

<style>

.vue-tags-input .ti-input {
    border: 1px solid white;
  }

</style>
