<template>
  <v-app>
    <div>
        <v-data-table :headers="headers" :items="allGroupLine" sort-by="calories" class="elevation-1" height="70vh" fixed-header style="width: 100%">
    <template v-slot:top>
      <v-toolbar flat >
        <v-toolbar-title>Gruoup Line Manage</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-btn color="primary" dark class="mb-2" @click="openDialogInsert()">New User </v-btn>
      </v-toolbar>
      
    </template>
    <template v-slot:item.groupline_textcolor="{item}">
      <v-btn :color='item.groupline_textcolor' elevation="2" x-small></v-btn>
    </template>
    <template v-slot:item.groupline_chatcolor="{item}">
      <v-btn :color='item.groupline_chatcolor' elevation="2" x-small></v-btn>
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
                <v-text-field label="Line@ID*" type="username" v-model="vlineId " required></v-text-field>
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
                <v-btn v-if="vlineName!=='' & vlineId!== '' & vlineAccessToken!== ''" :loading="loading3" :disabled="loading3" color="blue-grey" class="ma-2 white--text" @click="loader = 'loading3' , saveGroupLine() "> SAVE <v-icon right dark>mdi-cloud-upload</v-icon></v-btn>
                <!-- <v-autocomplete :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']" label="Interests" multiple></v-autocomplete> -->
                <!-- <v-btn></v-btn> -->
              </v-col>
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
                <v-text-field label="Line@ID*" type="username" v-model="vlineId " required></v-text-field>
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
                <v-btn @click="checkData(editVlineTextcolor.hex)" ></v-btn><br>
                 <v-btn :color='vlineTextcolor' elevation="2" x-small>สีชื่อ</v-btn>
                <v-color-picker disabled hide-canvas hide-inputs hide-mode-switch hide-sliders mode="hexa" show-swatches swatches-max-height="100" v-model="editVlineTextcolor" @click="checkData(editVlineTextcolor)"></v-color-picker>
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
const APIURL = "http://127.0.0.1:3000";
  export default {
    data: () => ({
        editVlineTextcolor:null,
        editVlineChatcolor:null,
        vurl:null,
        vlineAccessToken:null,
        vId:null,
        vlineId:null,
        vlineName:null,
        vlineRichMenuA:null,
        vlineRichMenuB:null,
        vlineSecret:null,
        vlineTextcolor:null,
        vlineChatcolor:null,
        insertGroup:[],
        allGroupLine:[],
      dialogDelete: false,
      dialogEdit: false,
      successSnackbar: false,
      loader: null,
      loading3: false,
      saveData:[],
      dialogInsert: false,
      headers: [
        {
          text: 'ลำดับ',
          align: 'start',
          sortable: false,
          value: 'groupline_id',
        },
        { text: 'ชื่อไลน์', value: 'groupline_name' },
        { text: 'Line@ID ', value: 'groupline_lineid' },
        { text: 'Ch.Secret', value: 'groupline_secret' },
        { text: 'Ch.Access Token', value: 'groupline_token', },
         { text: 'Rich Menu A', value: 'groupline_rich_menu_a' },
          { text: 'Rich Menu B', value: 'groupline_rich_menu_b' },
           { text: 'url', value: 'url' },
            { text: 'สีแชท', value: 'groupline_textcolor' },
             { text: 'สีชื่อ', value: 'groupline_chatcolor' },
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
                 axios.get(APIURL+'/getAllGroupLine').then((response)=>{
                        this.allGroupLine=response.data
                    console.log('testtest',this.allGroupLine)
              })
            },
        checkData(test1){
          console.log('test1 = ',test1)
        },
        saveGroupLine(){
            var data = []
            data.push({
           groupline_name : this.vlineName ,
           groupline_lineid : this.vlineId,
           groupline_secret : this.vlineSecret,
           groupline_token : this.vlineAccessToken,
           groupline_rich_menu_a : this.vlineRichMenuA,
           groupline_rich_menu_b : this.vlineRichMenuB,
           url : this.vurl,
           groupline_textcolor : this.vlineTextcolor,
           groupline_chatcolor : this.vlineChatcolor,
           groupline_itf_auth : '',
           groupline_url : '',
           s_token : ''

          })
          console.log('test inser user = ', data)
          axios.post(APIURL+'/setGroupLine',data[0]).then((response)=>{
          //           console.log('testtest',this.allUser)
                      this.dialogInsert = false
                      this.saveData = []
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
                      this.successSnackbar=true
                      this.getAllGroupLine()
             })
                     
        },
        getAllUser(){
             axios.get(APIURL+'/getAllUser').then((response)=>{
                        this.allUser=response.data
                    console.log('testtest',this.allUser)
             })
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
                      this.dialogInsert = true

        },
      editGroupLine(item){
          
        
        // this.vuserID = item.user_id
        // this.vuser= item.username
        // this.vpassword=item.password
        // this.vpermission= item.user_group
        console.log('item = ',item)
        console.log('item groupline_textcolor = ', item.groupline_textcolor)
        console.log('item groupline_chatcolor= ', item.groupline_chatcolor)
        this.vId = item.groupline_id
        this.vlineId = item.groupline_lineid
        this.vlineSecret = item.groupline_secret 
        this.vlineAccessToken = item.groupline_token 
        this.vlineRichMenuA = item.groupline_rich_menu_a 
        this.vlineRichMenuB = item.groupline_rich_menu_b 
        this.vurl = item.url 
        this.vlineTextcolor = item.groupline_textcolor 
        this.vlineChatcolor = item.groupline_chatcolor 
        this.dialogEdit = true

      },
      saveEditGroup(){
          
        var data=[];
        data.push({
        groupline_id    : this.vId,
      groupline_lineid  :  this.vlineId,
      groupline_secret : this.vlineSecret,
      groupline_token : this.vlineAccessToken,
      groupline_rich_menu_a : this.vlineRichMenuA,
      groupline_rich_menu_b : this.vlineRichMenuB,
      url : this.vurl,
      groupline_textcolor : this.editVlineTextcolor.hex,
      groupline_chatcolor : this.editVlineChatcolor.hex,
        })
        axios.post(APIURL+'/updateGroupLine',data[0]).then((response)=>{
                    // console.log('testtest',this.allUser)
                      this.dialogEdit = false
                      this.successSnackbar=true
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
                      this.getAllGroupLine()
                      console.log('success')
             })
      },
      deleteItem (item) {
        this.vId = item.groupline_id
        this.vlineName = item.groupline_name
        this.dialogDelete = true
      },
      deleteItemConfirm () {
        axios.post(APIURL+'/deleteGroupLine',{groupline_id : this.vId}).then((response)=>{
                      this.dialogDelete = false
                      this.vId = ""
                      this.vlineId = ""

                      this.successSnackbar=true
                      this.getAllGroupLine()
             })
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