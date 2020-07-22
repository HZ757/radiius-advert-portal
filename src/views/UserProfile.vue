<template>
    <!-- Note: I need to find out how to remove the nav-bar from this page -->

    <div style="height:100%;" id="Background" >

        <div id="Profile">
            <div style="height:70px"></div>
            <div style="margin-left:5vw">

                <!-- IMAGE GALLERY COMPONENT -->
                <div id="Gallery" style="background-color:white; width:50vw; height:50vh; display: grid; padding: 10px; padding-bottom: 0px;">
                <carousel  style=" width:49vw; height:50vh;" :per-page="1" paginationPosition="top-overlay" :navigationEnabled='true'  :paginationEnable='true' :mouse-drag="false">
                    
                    <slide v-for='url in businessImagesURL' >
                    <div  >
                           <img   style=" width:49vw; height:50vh;" :src="url"></img>
                    </div>
                    </slide>
                    
                    
                    
                   
                </carousel>
                </div>
                

                <div style="background-color: white; width: 50vw; height: 12vh; text-align: center">
                    <base-button outline type="default" style="margin-top:5vh" @click="savePhotos">Add or Delete Photos</base-button>
                </div>
                
                    <div style=" width: 50vw; margin-bottom: 5px; margin-top: 5px;text-align: center">              
                            
                            <vs-popup class="holamundo"  title="Add Section" :active.sync="newSectionPopup">
                                <vue-form-generator  style="margin-bottom: 5px; margin-top: 20px;":schema="section" :model="newSection" :options="formOptions">
                                </vue-form-generator>
                                <div style=" margin-bottom: 0px; margin-top: 5px;text-align: right"> 
                                    <base-button  v-on:click="newSectionPopup = false" type='seconday'  style="margin-top:0px;margin-bottom:0px">Cancel</vs-icon></base-button>             
                                    <base-button  v-on:click="saveNewSection" type='info'  style="margin-top:0px;margin-bottom:0px">Save</vs-icon></base-button> 
                                </div>
                            </vs-popup>
                            <vs-popup class="holamundo"  title="Edit Product" :active.sync="editingProduct">
                                
                                <vue-form-generator  style="margin-bottom: 5px; margin-top: 50px;":schema="product" :model="editProductModel" :options="formOptions">
                                </vue-form-generator>
                                <div style=" margin-bottom: 0px; margin-top: 5px;text-align: right">              
                                    <base-button  v-on:click="editingProduct=false" type='seconday'  style="margin-top:0px;margin-bottom:0px">Cancel</vs-icon></base-button>   
                                    <base-button  v-on:click="saveEditedProduct" type='info'  style="margin-top:0px;margin-bottom:0px">Save</vs-icon></base-button> 
                                </div>
                            </vs-popup>
                            <vs-popup class="holamundo"  title="Add New Product" :active.sync="newProductPopup">
                                <vue-form-generator  style="margin-bottom: 5px; margin-top: 50px;":schema="product" :model="newProduct" :options="formOptions">
                                </vue-form-generator>
                                <div style=" margin-bottom: 0px; margin-top: 5px;text-align: right">    
                                    <base-button  v-on:click="newProductPopup=false" type='seconday'  style="margin-top:0px;margin-bottom:0px">Cancel</base-button>             
                                    <base-button  v-on:click="saveNewProduct" type='info'  style="margin-top:0px;margin-bottom:0px">Save</base-button> 
                                </div>
                            </vs-popup>
                            <vs-popup class="holamundo"  title="Edit Information" :active.sync="editBusinessInfoPopUp">
                                <vue-form-generator  style="margin-bottom: 5px; margin-top: 50px;":schema="businessForm" :model="newBusinessInfo" :options="formOptions">
                                </vue-form-generator>
                                <div style=" margin-bottom: 0px; margin-top: 5px;text-align: right">    
                                    <base-button  v-on:click="editBusinessInfoPopUp=false" type='seconday'  style="margin-top:0px;margin-bottom:0px">Cancel</base-button>             
                                    <base-button  v-on:click="saveBusinessInfo" type='info'  style="margin-top:0px;margin-bottom:0px">Save</base-button> 
                                </div>
                            </vs-popup>
                            <vs-popup class="holamundo"  title="Add New Promotion" :active.sync="newPromotionPopup">
                                <vue-form-generator  style="margin-bottom: 5px; margin-top: 50px;":schema="promotionForm" :model="newPromotion" :options="formOptions">
                                </vue-form-generator>
                                <div style=" margin-bottom: 0px; margin-top: 5px;text-align: right">    
                                    <base-button  v-on:click="newPromotionPopup=false" type='seconday'  style="margin-top:0px;margin-bottom:0px">Cancel</base-button>             
                                    <base-button  v-on:click="saveNewPromotion" type='info'  style="margin-top:0px;margin-bottom:0px">Save</base-button> 
                                </div>
                            </vs-popup>
                            <vs-popup class="holamundo"  title="Edit Promotion" :active.sync="editPromotionPopup">
                                <vue-form-generator  style="margin-bottom: 5px; margin-top: 50px;":schema="promotionForm" :model="editPromotionModel" :options="formOptions">
                                </vue-form-generator>
                                <div style=" margin-bottom: 0px; margin-top: 5px;text-align: right">    
                                    <base-button  v-on:click="editPromotionPopup=false" type='seconday'  style="margin-top:0px;margin-bottom:0px">Cancel</base-button>             
                                    <base-button  v-on:click="saveEditedPromotion" type='info'  style="margin-top:0px;margin-bottom:0px">Save</base-button> 
                                </div>
                            </vs-popup>
                            <vs-popup class="holamundo"  title="Add or Delete Photos" :active.sync="savePhotosPopup">
                                <div v-for='url in businessImagesURL' style="margin-bottom: 10px">
                                    <img   style=" width:384px; height:216px;" :src="url"></img>
                                     <base-button outline type="danger" v-on:click="deleteImage(url)" style="margin-left: 10px"><i class="fas fa-trash-alt"></i></base-button>
                                </div>
                                <h3 style="width: 100%">Upload Image</h3>
                                <input type="file" @change="onFileSelected">
                                <div style=" margin-bottom: 0px; margin-top: 5px;text-align: right"> 
                                    <base-button  v-on:click="savePhotosPopup = false" type='seconday'  style="margin-top:0px;margin-bottom:0px">Cancel</vs-icon></base-button>             
                                    <base-button  v-on:click="onUpload" type='info'  style="margin-top:0px;margin-bottom:0px">Save</vs-icon></base-button> 
                                </div>
                            </vs-popup>
                            
                    </div>
                   
                </div>
        </div>
    </div>
</template>

<script>
import { firebase } from "@firebase/app";
import { db, storageRef } from './firebase';
import Vue from 'vue';
import { vsButton, vsSelect, vsPopup, vsIcon } from 'vuesax';
import 'vuesax/dist/vuesax.css';
import 'material-icons/iconfont/material-icons.css';
import VueFormGenerator from "vue-form-generator";
import "vue-form-generator/dist/vfg.css";
import VueSilentbox from "vue-silentbox";
import { Carousel, Slide } from 'vue-carousel';

Vue.use(VueSilentbox)
Vue.use(vsButton)
import Gallery from "vue-cover-gallery";
Vue.use(vsSelect)
Vue.use(vsPopup)
Vue.use(vsIcon)

 let businessRef = db.collection("businesses");
 let imagesRef = storageRef.child('businessImages/image.jpg');
 

export default{
    components: {
        "vue-form-generator": VueFormGenerator.component,
        Gallery,
        Carousel,
        Slide
    },
    data: () => {
    return {
        businessImagesURL: [],
        businessImagesToDelete: null,
        selectedFile: null,
        businessDocID: null,
        businessInfo:{
            name:null,
            address: null, 
            phoNum: null,
            city:null,
            postCode: null,
            prov: null,
            web: null,
            desc: null, 
            email: null, 
        },
        newBusinessInfo:{
            name:null,
            address: null, 
            phoNum: null,
            city:null,
            postCode: null,
            prov: null,
            web: null,
            desc: null, 
            email: null, 
        },

        name: null, //data.name, 
        updateCounter: 0,
        businessDocID:null,
        address:null, //data.address,
        phoneNumber: null,
        city: null,
        postalCode: null,
        province: null, 
        website: null, 
        description: null,
        sections: [],
        email: null, 
        promotions: [],
        test:[false],
        secPop:{},
        newProductPopup: false,
        newPromotionPopup: false,
        newSectionPopup: false,
        editPromotionPopup: false,
        products:{}, // all products organized by section
        fullProducts:{}, // This is all the products not organized by section 
        popups:{}, //Keeps track of popup window triggers for products
        popupActivo:false,
        popupActiv:false,
        popupActi:false,
        newProduct: {'name':"", 'desc':"", 'price':"", 'sec':""},
        editProductModel: {'name':"", 'desc':"", 'price':"", 'sec':""},
        editPromotionModel:{'title':"", 'desc':""},
        newPromotion:{'title':"", 'desc':""},
        editBusinessInfoPopUp: false,
        editingProduct:false,
        editingDocID: null, // The document id of the current product being edited. 
        editingPromotionDocID: null, // the document id of the current promotion being edited.
        newSection:{'sectionName': ""},
        legendTitle: "Sub-Section",
        savePhotosPopup: false,
      sub_section: 1,
      option: 1,
      model: [{
        id: 1,
        name: 'A game-changing product that can change the world!',
        price: ' ',
        description: "An Amazing Product that everyone loves, with a side of hummus.",
        password: 'J0hnD03!x4',
        skills: ['Javascript', 'VueJS'],
        email: 'john.doe@gmail.com',
        status: true,
        sub_sections: []
      },],

      section: {
        fields:[
                {
                    type: 'input',
                    inputType: 'text',
                    model: 'sectionName',
                    id: 'section_header',
                    label:"Section Header",
                    placeholder: 'Ex. Apetizers, Deserts, Clothes, Toys etc.',
                    featured: false,
                    required: true,                 
                },
              
            ],
      },
      product: {
        fields:[
                {
                    type: 'input',
                    inputType: 'text',
                    label: 'Product Name',
                    model: 'name',
                    id: 'product_name',
                    placeholder: 'Product Name',
                    help:'The name of your product',
                    featured: false,
                    required: true,
                    
                },
                {
                    type: 'input',
                    inputType: 'text',
                    label: 'Product Description',
                    model: 'desc',
                    id: 'product_description',
                    placeholder: 'Some super cool stuff everyone should try!',
                    help:'Product Description',
                    featured: false,
                    required: true,
                    
                },
                {
                    type: 'input',
                    inputType: 'float',
                    label: 'Price',
                    model: 'price',
                    id: 'product_price',
                    placeholder: '$9.99',
                    help:'The price of your product',
                    featured: false,
                    required: true,
                    
                },
                {
                    type: 'select',
                    label: 'Section',
                    model: 'sec',
                    id: 'product_section',
                    placeholder: 'Section',
                    help:'What section does your product fall under',
                    featured: false,
                    required: true,   
                    values: [],       
                },
              
            ],
      },
      promotionForm: {
        fields:[
                {
                    type: 'input',
                    inputType: 'text',
                    label: 'Name',
                    model: 'title',
                    id: 'promotion_name',
                    placeholder: 'Name',
                    help:'The name of the promotion',
                    featured: false,
                    required: true,
                    
                },
                {
                    type: 'input',
                    inputType: 'textArea',
                    label: 'Promotion Description',
                    model: 'desc',
                    id: 'promotion_description',
                    placeholder: 'This promotion is the best promotion in the history of promotions!',
                    help:'The promotion description',
                    featured: false,
                    required: true,
                    
                },
            ],
      },
      businessForm: {
        fields:[
                {
                    type: 'input',
                    inputType: 'text',
                    label: "Business Name",
                    model: 'name',
                    id: 'business_name',
                    placeholder: 'Name',
                    help:'The name of your business',
                    featured: false,
                    required: true,
                    
                },
                {
                    type: 'input',
                    inputType: 'text',
                    label: 'Address',
                    model: 'address',
                    id: 'business_address',
                    placeholder: 'Address',
                    help:'The business address',
                    featured: false,
                    required: true,
                    
                },
                {
                    type: 'input',
                    inputType: 'text',
                    label: 'City',
                    model: 'city',
                    id: 'business_city',
                    placeholder: 'City',
                    help:'The City your business is located in',
                    featured: false,
                    required: true,
                    
                },
                {
                    type: 'input',
                    inputType: 'text',
                    label: 'Province',
                    model: 'prov',
                    id: 'business_province',
                    placeholder: 'Province',
                    help:'The Province your business is located in',
                    featured: false,
                    required: true,
                    
                },
                {
                    type: 'input',
                    inputType: 'text',
                    label: 'Postal Code',
                    model: 'postCode',
                    id: 'business_postalCode',
                    placeholder: 'Postal Code',
                    help:"Your business' postal code",
                    featured: false,
                    required: true,
                    
                },
                {
                    type: 'input',
                    inputType: 'text',
                    label: 'Website',
                    model: 'web',
                    id: 'business_website',
                    placeholder: 'Website',
                    help:'Your Business Website',
                    featured: false,
                    required: false,
                    
                },
                {
                    type: 'input',
                    inputType: 'text',
                    label: 'Email',
                    model: 'email',
                    id: 'business_email',
                    placeholder: 'Contact Email',
                    help:'An contact email for customers',
                    featured: false,
                    required: false,
                    
                },
                {
                    type: 'textArea',
                    inputType: 'text',
                    label: 'Description',
                    model: 'desc',
                    id: 'business_description',
                    placeholder: '',
                    help:'A description of your business',
                    featured: false,
                    required: true,
                    
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
    methods:{
        deleteImage(url){
            this.businessImagesToDelete = url;
            firebase.storage().refFromURL(url).delete().then(url => {
                // File deleted successfully
                console.log("File Deleted Succesfully");
                console.log(this.businessImagesURL.length);
                console.log(this.businessImagesToDelete);
                for (var i = 0; i<this.businessImagesURL.length; i++)
                {
                    if (this.businessImagesURL[i] === this.businessImagesToDelete) {
                        this.businessImagesURL.splice(i, 1);
                        console.log("Deleted From BusinessImagesURL");
                    }
                }
            }).catch(function(error) {
                // Uh-oh, an error occurred!
                console.log(error);
            });
        },
        addNewPromotion(){
            this.newPromotion = {'title':"", 'desc':""};
            this.newPromotionPopup = true; 
        },
        saveNewPromotion(){
            var ref = db.collection('businesses').doc(this.businessDocID).collection('promotions').doc();
            var temp = {'docID': ref.id, 'data':this.newPromotion};
            this.promotions.push(temp);
            db.collection('businesses').doc(this.businessDocID).collection('promotions').doc(ref.id).set(
                this.newPromotion,
            );
            this.newPromotion = {'name':"", 'desc':""};
            this.newPromotionPopup = false; 
            this.updateCounter = this.updateCounter + 1;
        },
        
        deletePromotion(docID){
            var val = null; 
            for (var i in this.promotions){
                if (this.promotions[i].docID == docID){
                    val = i; 
                };
            };
            var ref = db.collection('businesses').doc(this.businessDocID).collection('promotions');
            ref.doc(this.promotions[val].docID).delete();

            if (val > -1){
               this.promotions.splice(val, 1);
            }
            this.updateCounter = this.updateCounter + 1; 


        },
        editPromotion(docID){
            this.editPromotionPopup = true;
            var val = null; 
            for (var i in this.promotions){
                if (this.promotions[i].docID == docID){
                    val = i; 
                };
            };
            this.editPromotionModel ={...this.promotions[val].data};
            this.editingPromotionDocID =this.promotions[val].docID;

        },
        saveEditedPromotion(){
            var docID = this.editingPromotionDocID;
            this.editPromotionPopup = false;
            var val = null; 
            for (var i in this.promotions){
                if (this.promotions[i].docID == docID){
                    val = i; 
                };
            };
            console.log(this.promotions[val].data);
            this.promotions[val].data = {...this.editPromotionModel};
            console.log(this.promotions[val].data);
            db.collection('businesses').doc(this.businessDocID).collection('promotions').doc(docID).update(
                this.editPromotionModel,
            );

            this.updateCounter = this.updateCounter + 1;
        },
        onFileSelected(event){
            this.selectedFile = event.target.files[0];
        },
        editBusinessInfo(){
            this.newBusinessInfo= {...this.businessInfo};
            this.editBusinessInfoPopUp = true;
        },
        saveBusinessInfo(){
            this.businessInfo = {...this.newBusinessInfo};
            this.editBusinessInfoPopUp = false;
            var ref = db.collection('businesses').doc(this.businessDocID);
            ref.update(
                this.businessInfo,
            );
        },
        deleteSection(section){
            var temp = this.products[section];
            var ref = db.collection('businesses').doc(this.businessDocID).collection('products');
            for (var i in temp){
                ref.doc(temp[i].docID).delete();
            };
            delete this.products[section];
            console.log(this.products);
            const index = this.sections.indexOf(section);
            if (index > -1){
               this.sections.splice(index, 1);
            }
            ref = db.collection('businesses').doc(this.businessDocID);
            ref.update(
                {
                    'prodSecs': this.sections,
                }
            );

            this.updateCounter = this.updateCounter + 1;
        },
        addNewProduct(section){
        console.log(section) ;
        this.newProductPopup = true;
        this.newProduct= {'name':"", 'desc':"", 'price':"", 'sec':""};
        this.newProduct.sec = section;
        this.product.fields[3].values = this.sections;
        },
        saveNewProduct(){
        this.newProductPopup = false;
       
        var ref = db.collection('businesses').doc(this.businessDocID).collection('products').doc();
        this.newProduct.price = parseFloat(this.newProduct.price).toFixed(2);
        var datum = {'docID': ref.id, 'data':this.newProduct, 'popUp':false};
        this.products[this.newProduct.sec].push(datum);
        this.fullProducts[ref.id] = datum;
        db.collection('businesses').doc(this.businessDocID).collection('products').doc(ref.id).set(
                this.newProduct,
        );
        
        },
        editProduct(docID){
        this.editingProduct = true;
        this.editingDocID = docID;
        this.editProductModel.name= this.fullProducts[docID].data.name;
        this.editProductModel.desc = this.fullProducts[docID].data.desc;
        this.editProductModel.price = this.fullProducts[docID].data.price;
        this.editProductModel.sec = this.fullProducts[docID].data.sec;
        this.product.fields[3].values = this.sections;
        },
        saveEditedProduct(){
            this.editingProduct = false;
            var currSection = this.fullProducts[this.editingDocID].data.sec;
            this.fullProducts[this.editingDocID].data.name = this.editProductModel.name;
            this.fullProducts[this.editingDocID].data.price =this.editProductModel.price;
            this.fullProducts[this.editingDocID].data.desc =this.editProductModel.desc;
            if (this.fullProducts[this.editingDocID].data.sec != this.editProductModel.sec) {
                this.fullProducts[this.editingDocID].data.sec=this.editProductModel.sec;
                const index = this.products[currSection].indexOf(this.fullProducts[this.editingDocID]);
                    if (index > -1){
                        this.products[currSection].splice(index, 1);
                        this.products[this.editProductModel.sec].push(this.fullProducts[this.editingDocID]);
                        console.log("BOI");
                    }

            }
            this.updateCounter = this.updateCounter + 1;
            db.collection('businesses').doc(this.businessDocID).collection('products').doc(this.editingDocID).set(
                this.fullProducts[this.editingDocID].data,
            );
            this.editingProductModel = "";
            this.updateCounter = this.updateCounter + 1;
        },
        deleteProduct(docID){
            console.log(docID);
            var temp = this.fullProducts[docID];
            delete this.fullProducts[docID];
            const index = this.products[temp.data.sec].indexOf(temp);
            this.updateCounter = this.updateCounter + 1;
            console.log(this.products[temp.data.sec].length)
            if (index > -1){
               this.products[temp.data.sec].splice(index, 1);
            }
            console.log(this.products[temp.data.sec].length)
            db.collection('businesses').doc(this.businessDocID).collection('products').doc(docID).delete(); 
        },
        addNewSection(){
            this.newSection = {'sectionName': ""};
            this.newSectionPopup = true;
        },
        savePhotos(){
            this.savePhotosPopup = true;
        },
        onUpload() {
            console.log("RightAfterThis");
            console.log(this.selectedFile.name);
            let imagesRef = storageRef.child('businessImages/'.concat(firebase.auth().currentUser.uid).concat('/').concat(this.selectedFile.name));
            imagesRef.put(this.selectedFile).then(function(snapshot){
                console.log('Uploaded a blob or file!');
            });

            imagesRef.getDownloadURL().then(url => {
                this.businessImagesURL.push(url);
            });
            
        },
        saveNewSection(){
            this.sections.push(this.newSection.sectionName);
            this.newSectionPopup = false;
            console.log(this.businessDocID);
            var ref = db.collection('businesses').doc(this.businessDocID);
            ref.update(
                {
                    'prodSecs': this.sections,
                }
            );
            this.products[this.newSection.sectionName]=[];
            this.updateCounter = this.updateCounter +1;
            
                

        },     
        getPromotions(docID){
            var query = db.collection('businesses').doc(docID).collection('promotions');
            query.get().then(snapshot => {
                if(snapshot.empty){
                    console.log('No documents');
                    return;
                }
                snapshot.forEach(doc => {
                    //console.log(doc.data());
                    this.promotions.push(
                        {
                            'docID': doc.id,
                            'data': doc.data(),
                        }
                    );
                });
                console.log(this.promotions[0].data);
            })
        },
        getProducts(docID){
            var query = db.collection('businesses').doc(docID).collection('products');
            
            query.get().then(snapshot => {
                if(snapshot.empty){
                    console.log('No documents');
                    return;
                }
                snapshot.forEach(doc => {
                    //console.log(doc.data());
                    var datum = {'docID': doc.id, 'data':doc.data(), 'popUp':false};
                    this.fullProducts[doc.id] = datum;
                    this.products[datum.data.sec].push(datum);
                });
            })
        },
        getImages(){
            let imagesRef = storageRef.child('businessImages/'.concat(firebase.auth().currentUser.uid).concat('/'));
        //globalThis.businessImagesURL
            this.businessImagesURL = [];
            console.log("ProfileMounted");
            imagesRef.listAll().then(result => {
                result.items.forEach(imagesRef => {
                // And finally display them
                    imagesRef.getDownloadURL().then(url => {
                        console.log(url);
                        this.businessImagesURL.push(url);
                    }).catch(function(error) {
                        // Handle any errors
                        console.log(error);
                    });
                });
            }).catch(function(error) {
                // Handle any errors
                console.log(error);
            });
        },
        populate(){
             businessRef.where('id', '==', firebase.auth().currentUser.uid).get()
            .then(snapshot => {
                if (snapshot.empty) {
                console.log('No matching documents.');
                return;
                }  

            snapshot.forEach(doc => {
            console.log(doc.id, '=>', doc.data());
            this.businessDocID = doc.id;
            var datum = doc.data();
            this.businessInfo.name = datum.name;
            this.businessInfo.address = datum.address;
            this.businessInfo.phoNum = datum.phoNum;
            this.businessInfo.city = datum.city;
            this.businessInfo.prov = datum.prov;
            this.businessInfo.postCode = datum.postCode;
            this.businessInfo.web = datum.web; 
            this.businessInfo.desc = datum.desc; 
            this.businessInfo.email = datum.email;
            this.sections = datum.prodSecs;
            for (var i in datum.prodSecs){
                this.products[datum.prodSecs[i]] = [];
                this.popups[datum.prodSecs[i]] = false;
                this.secPop[datum.prodSecs[i]] = false;

            };
            console.log('XX: ' + this.popups);
            this.getProducts(doc.id);
            this.getPromotions(doc.id);
                });
            
            })
        .catch(err => {
            console.log('Error getting documents', err);
        });
        },
    },
    
    mounted() {
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
        
        this.populate();
        this.getImages();
        console.log(db);

    },
};

</script>

<style scoped>

#Background {
    height: 300vh;
    z-index: 1;
    background-color: #e0fffd;
    display: flex;
    flex-direction: row;
}

#Profile {
    width: 70vw;
    display: flex;
    flex-direction: column;
    margin-top: 0px;
}

#ProfileSidebar {
    width: 30vw;
    background-color:white;
    display: flex;
    flex-direction: column;
}

#Avatar {
    border-radius: 50%;
    text-align: center;
}

/* Generated Grid START */

.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 10px 11px;
  grid-template-areas: "photo1 photo1 photo1 photo1 photo4 photo4" "photo1 photo1 photo1 photo1 photo5 photo5" "photo2 photo2 photo3 photo3 photo5 photo5";
}

.photo1 { grid-area: photo1; background-color: red; height: 42vh; }

.photo2 { grid-area: photo2; background-color: red; height: 20vh; }

.photo3 { grid-area: photo3; background-color: red; height: 20vh; }

.photo4 { grid-area: photo4; background-color: red; height: 20vh; }

.photo5 { grid-area: photo5; background-color: red; height: 42vh; }

/* Generated Grid END */

</style>
