<template>
  <v-app>
    <div>
        <v-data-table :headers="headers" :items="allGroupLine" class="elevation-1" height="70vh" fixed-header style="width: 100%">
    <template v-slot:top>
      <v-toolbar flat >
        <v-toolbar-title>Gruoup Line Manage</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-btn color="primary" dark class="mb-2" @click="openDialogInsert()">New Group </v-btn>
      </v-toolbar>
      
    </template>
    <template v-slot:item.groupLine_textcolor="{item}">
      <v-btn :color='item.groupLine_textcolor' elevation="2" x-small></v-btn>
    </template>
    <template v-slot:item.groupLine_chatcolor="{item}">
      <v-btn :color='item.groupLine_chatcolor' elevation="2" x-small></v-btn>
    </template>
    <template v-slot:item.actions="{item}">
      <v-icon small class="mr-2" @click="editGroupLine(item)">
        mdi-pencil
      </v-icon>
      <v-icon small @click="deleteItem(item)">
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <!-- <v-btn color="primary" @click="initialize" >
        Reset
      </v-btn> -->
    </template>
  </v-data-table>


<v-row justify="center">

    <v-dialog v-model="dialogInsert" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Line Group Profile</span>
        </v-card-title>
                <v-card-text>
          <v-container>
            <v-row>
               <v-col cols="12">
                <v-text-field label="ชื่อไลน์*" type="username" v-model="vlineName " required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field label="Line@ID*" type="username" v-model="vlineAtID " required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field label="LineUserID*" type="username" v-model="vlineId " required disabled></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field label="Ch.Secret*" type="username" v-model="vlineSecret " required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Ch.Access Token*" type="username" v-model="vlineAccessToken" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Rich Menu A" type="username" v-model="vlineRichMenuA " ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Rich Menu B" type="username" v-model="vlineRichMenuB " ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="URL" type="username" v-model="vurl" ></v-text-field>
              </v-col>
              <v-col cols="12">
                <!-- <v-btn @click="checkData(textcolor.hex)" ></v-btn><br> -->
                สีชื่อ
                <v-color-picker disabled hide-canvas hide-inputs hide-mode-switch hide-sliders mode="hexa" show-swatches swatches-max-height="100" v-model="vlineTextcolor" ></v-color-picker>
              </v-col>
                <v-col cols="12">
                สีแชท
                <v-color-picker disabled hide-canvas hide-inputs hide-mode-switch hide-sliders mode="hexa" show-swatches swatches-max-height="100" v-model="vlineChatcolor" ></v-color-picker>
              </v-col>
              <v-col cols="12" sm="6" >
                <v-btn v-if="vlineName!=='' & vlineAtID!== '' & vlineAccessToken!== ''" :loading="loading3" :disabled="loading3" color="blue-grey" class="ma-2 white--text" @click="loader = 'loading3' , saveGroupLine() "> SAVE <v-icon right dark>mdi-cloud-upload</v-icon></v-btn>
                <!-- <v-autocomplete :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']" label="Interests" multiple></v-autocomplete> -->
                <!-- <v-btn></v-btn> -->
              </v-col>
              <P>**หลังจากการกด Save กรุณาส่งข้อความโดยระบุชื่อของ Line AO เพื่อทำการรับ Userline ID**</p>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogEdit" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Edit Group Line</span>
        </v-card-title>
                <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="ชื่อไลน์*" type="username" v-model="vlineName " required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field label="Line@ID*" type="username" v-model="vlineAtID" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field label="LineUserID*" type="username" v-model="vlineId " required disabled></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field label="Ch.Secret*" type="username" v-model="vlineSecret " required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Ch.Access Token*" type="username" v-model="vlineAccessToken" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Rich Menu A" type="username" v-model="vlineRichMenuA " ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Rich Menu B" type="username" v-model="vlineRichMenuB " ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="URL" type="username" v-model="vurl" ></v-text-field>
              </v-col>
              <v-col cols="12">
                <!--<v-btn @click="checkData(editVlineTextcolor.hex)" ></v-btn><br>-->
                 <v-btn :color='vlineTextcolor' elevation="2" x-small>สีชื่อ</v-btn>
                <v-color-picker disabled hide-canvas hide-inputs hide-mode-switch hide-sliders mode="hexa" show-swatches swatches-max-height="100" v-model="editVlineTextcolor" ></v-color-picker>
              </v-col>
                <v-col cols="12">
                <v-btn :color='vlineChatcolor' elevation="2" x-small>สีแชท</v-btn>
                <v-color-picker disabled hide-canvas hide-inputs hide-mode-switch hide-sliders mode="hexa" show-swatches swatches-max-height="100" v-model="editVlineChatcolor" ></v-color-picker>
              </v-col>
              <v-col cols="12" sm="6" >
                <v-btn :loading="loading3" :disabled="loading3" color="blue-grey" class="ma-2 white--text" @click="loader = 'loading3' , saveEditGroup() "> SAVE <v-icon right dark>mdi-cloud-upload</v-icon></v-btn>
                <!-- <v-autocomplete :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']" label="Interests" multiple></v-autocomplete> -->
                <!-- <v-btn></v-btn> -->
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>



    <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline">คุณแน่ใจที่จะลบ  {{this.vlineName}}</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialogDelete = false">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm()">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>

     <v-snackbar :timeout="3000" :value="true" color="success" v-model="successSnackbar" absolute left rounded="pill" top >
       Sign Up Success
    </v-snackbar>
</v-row>
    
    </div>
    </v-app>
</template>

<script>
const axios = require("axios");
// const APIURL = "http://127.0.0.1:3000";
const APIURL = "https://wechatbackend.herokuapp.com"
  export default {
    data: () => ({
        indexKey:'',
        editVlineTextcolor:'',
        editVlineChatcolor:'',
        vlineAtID: '',
        vurl:'',
        vlineAccessToken:'',
        vId:'',
        vlineId:'',
        vlineName:'',
        vlineRichMenuA:'',
        vlineRichMenuB:'',
        vlineSecret:'',
        vlineTextcolor:'',
        vlineChatcolor:'',
        // insertGroup:[],
        allGroupLine:[],
      dialogDelete: false,
      dialogEdit: false,
      successSnackbar: false,
      loader: null,
      loading3: false,
      saveData:[],
      dialogInsert: false,
      headers: [
        // {
        //   text: 'ลำดับ',
        //   align: 'start',
        //   sortable: false,
        //   value: 'groupline_id',
        // },
        { text: 'ชื่อไลน์', value: 'groupLine_name' },
        { text: 'Line@ID ', value: 'lineAtID' },
        { text: 'LineUserID ', value: 'groupLine_LineId' },
        { text: 'Ch.Secret', value: 'groupLine_secret' },
        { text: 'Ch.Access Token', value: 'groupLine_token', },
         { text: 'Rich Menu A', value: 'groupLine_richMenuA' },
          { text: 'Rich Menu B', value: 'groupLine_richMenuB' },
           { text: 'url', value: 'url' },
            { text: 'สีแชท', value: 'groupLine_chatcolor' },
             { text: 'สีชื่อ', value: 'groupLine_textcolor' },
             { text: 'Actions', value: 'actions', sortable: false }
      ],
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      loader () {
            const l = this.loader
            this[l] = !this[l]

            setTimeout(() => (this[l] = false), 1000)
            this.loader= null
      }
    },

    created () {
        this.getAllGroupLine()
    },

    methods: {
        getAllGroupLine(){
              //    axios.get(APIURL+'/getAllGroupLine').then((response)=>{
              //           this.allGroupLine=response.data
              //       console.log('testtest',this.allGroupLine)
              // })
              db.collection("groupLine").where('active','==',1).orderBy('createdAt').onSnapshot((querySnapshot) => {
                  let data=[];
                //   let alldata=[]
                  let val=[]
                  querySnapshot.forEach((doc) => {
                      // data.push(doc.data())
                      val.push(doc)
                      data.push({
                        'indexKey':doc.id,
                        'groupLine_name':doc.data().groupLine_name,
                        'groupLine_LineId': doc.data().groupLine_LineId,
                        'groupLine_secret': doc.data().groupLine_secret,
                        'groupLine_token': doc.data().groupLine_token,
                        'groupLine_richMenuA':doc.data().groupLine_richMenuA,
                        'groupLine_richMenuB': doc.data().groupLine_richMenuB,
                        'url': doc.data().url,
                        'groupLine_textcolor': doc.data().groupLine_textcolor,
                        'groupLine_chatcolor':doc.data().groupLine_chatcolor,
                        'groupLine_itf_auth': doc.data().groupLine_itf_auth,
                        'groupLine_url': doc.data().groupLine_url,
                        's_token': doc.data().s_token,
                        'createdAt':doc.data().createdAt,
                        'active': doc.data().active,
                        'lineAtID': doc.data().lineAtID
                        
                      })
                  })
                   this.allGroupLine=data;
                   console.log('val = ', val)
                  console.log('val =',val);
                 
              });

            },
        checkData(test1){
          console.log('test1 = ',test1)
        },
        testSave(){
          
        },
        saveGroupLine(){
          console.log('vlineTextcolor = ', this.vlineTextcolor)
          console.log('vlineChatcolor = ', this.vlineChatcolor)
          db.collection('groupLine').add({

                    groupLine_name : this.vlineName ,
                    groupLine_LineId : this.vlineId,
                    groupLine_secret : this.vlineSecret,
                    groupLine_token : this.vlineAccessToken,
                    groupLine_richMenuA : this.vlineRichMenuA,
                    groupLine_richMenuB : this.vlineRichMenuB,
                    url : this.vurl,
                    groupLine_textcolor : this.vlineTextcolor,
                    groupLine_chatcolor : this.vlineChatcolor,
                    lineAtID :  this.vlineAtID,
                    groupLine_itf_auth : '',
                    groupLine_url : '',
                    s_token : '',
                    createdAt : (new Date().toLocaleString("tr-TR", { timeZone: "UTC" })),
                    active : 1


                }).then(()=>{
                  this.successSnackbar = true
                  this.dialogInsert = false
                })
                this.getAllGroupLine()


        },
        openDialogInsert(){
                        
                      this.vlineName= ""
                      this.vlineId=""
                      this.vlineSecret= ""
                      this.vlineAccessToken= ""
                      this.vlineRichMenuA=""
                      this.vlineRichMenuB= ""
                      this.vurl= ""
                      this.vlineTextcolor=""
                      this.vlineChatcolor= ""
                      this.editVlineTextcolor=""
                      this.editVlineChatcolor=""
                      this.vlineAtID = ""
                      this.dialogInsert = true

        },
      editGroupLine(item){
          
        
        // this.vuserID = item.user_id
        // this.vuser= item.username
        // this.vpassword=item.password
        // this.vpermission= item.user_group
        console.log('Edit item = ',item)
        // console.log('item groupline_textcolor = ', item.groupline_textcolor)
        // console.log('item groupline_chatcolor= ', item.groupline_chatcolor)
        this.indexKey = item.indexKey
        this.vlineId = item.groupLine_LineId
        this.vlineName = item.groupLine_name
        this.vlineSecret = item.groupLine_secret 
        this.vlineAccessToken = item.groupLine_token 
        this.vlineRichMenuA = item.groupLine_richMenuA 
        this.vlineRichMenuB = item.groupLine_richMenuB 
        this.vurl = item.url 
        this.vlineTextcolor = item.groupLine_textcolor 
        this.vlineChatcolor = item.groupLine_chatcolor 
        this.vlineAtID = item.lineAtID
        this.dialogEdit = true



      },
      saveEditGroup(){

        db.collection("groupLine").doc(this.indexKey).update({
        
        groupLine_LineId    : this.vlineId,
        groupLine_name      : this.vlineName,
        groupLine_secret    : this.vlineSecret,
        groupLine_token     : this.vlineAccessToken,
        groupLine_richMenuA : this.vlineRichMenuA,
        groupLine_richMenuB : this.vlineRichMenuB,
        groupLine_textcolor : this.editVlineTextcolor,
        groupLine_chatcolor : this.editVlineChatcolor
                })
                this.dialogEdit = false
                this.successSnackbar = true
                this.vlineName= ""
                this.vlineId=""
                this.vlineSecret= ""
                this.vlineAccessToken= ""
                this.vlineRichMenuA=""
                this.vlineRichMenuB= ""
                this.vurl= ""
                this.vlineTextcolor=""
                this.vlineChatcolor= ""
                this.editVlineTextcolor=""
                this.editVlineChatcolor=""
      },
      deleteItem (item) {
        console.log('test data = ', item)
        this.indexKey = item.indexKey
        this.vlineName = item.groupLine_name
        this.dialogDelete = true
      },
      deleteItemConfirm () {
         db.collection("groupLine").doc(this.indexKey).update({
           active : 0
         })
         this.dialogDelete = false
         this.successSnackbar=true
        // axios.post(APIURL+'/deleteGroupLine',{groupline_id : this.vId}).then((response)=>{
        //               this.dialogDelete = false
        //               this.vId = ""
        //               this.vlineId = ""

        //               this.successSnackbar=true
        //               this.getAllGroupLine()
        //      })
      }
    }
  }
</script>

<style lang="scss" scoped>
.batman {
	width: 100px;
	background-color: #333;
}

</style>