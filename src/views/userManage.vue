<template>
  <v-app>
    <div>
        <v-data-table :headers="headers" :items="allUser" sort-by="calories" class="elevation-1" height="70vh" fixed-header style="width: 100%">
    <template v-slot:top>
      <v-toolbar flat >
        <v-toolbar-title>User Manage</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-btn color="primary" dark class="mb-2" @click="dialogInsert = true">New User </v-btn>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{item}">
      <v-icon small class="mr-2" @click="editUser(item)">
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
          <span class="headline">User Profile</span>
        </v-card-title>
                <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="User*" type="username" v-model="vuser" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Password*" type="password" v-model="vpassword" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select :items="['admin', 'user']" label="Permission" v-model="vpermission" required ></v-select>
              </v-col>
              <v-col cols="12" sm="6" >
                <v-btn v-if="vuser!=='' & vpassword!== '' & vpermission!== ''" :loading="loading3" :disabled="loading3" color="blue-grey" class="ma-2 white--text" @click="loader = 'loading3' , insertUser(vuser,vpassword,vpermission) "> SAVE <v-icon right dark>mdi-cloud-upload</v-icon></v-btn>
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
          <span class="headline">Edit Password Profile</span>
        </v-card-title>
                <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="User*" type="username" v-model="vuser" disabled></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Password*"  v-model="vpassword" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select :items="['admin', 'user']" label="Permission" v-model="vpermission" disabled ></v-select>
              </v-col>
              <v-col cols="12" sm="6" >
                <v-btn v-if="vpassword!== ''" :loading="loading3" :disabled="loading3" color="blue-grey" class="ma-2 white--text" @click="loader = 'loading3' , saveEditUser() "> SAVE <v-icon right dark>mdi-cloud-upload</v-icon></v-btn>
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
            <v-card-title class="headline">คุณแน่ใจที่จะลบ  {{this.vuser}}</v-card-title>
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
// const APIURL = "http://127.0.0.1:3000";https://wechatbackend.herokuapp.com/
const APIURL = "https://wechatbackend.herokuapp.com"
  export default {
    data: () => ({
      indexKey:'',
      dialogDelete: false,
      dialogEdit: false,
      successSnackbar: false,
      loader: null,
      loading3: false,
      saveData:[],
      vuserID: "",
      vuser: "",
      vpassword:"",
      vpermission: "",
        allUser: [],
      dialogInsert: false,
      dialogDelete: false,
      headers: [
        { text: 'User name', value: 'user' ,align: 'start',},
        { text: 'Password', value: 'password' },
        { text: 'permission ', value: 'permissaion' },
        { text: 'วันที่สร้าง', value: 'createdAt' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },

    watch: {
      // dialog (val) {
      //   val || this.close()
      // },
      // dialogDelete (val) {
      //   val || this.closeDelete()
      // },
      loader () {
            const l = this.loader
            this[l] = !this[l]

            setTimeout(() => (this[l] = false), 1000)
            this.loader= null
      }
    },

    created () {
      this.getAllUser()
    },

    methods: {
        checkData(test1){
          console.log('test1 = ',test1)
        },
        insertUser(user,password,permissaion){
          db.collection('userWebsite').add({
                    user : user,
                   password : password,
                   permissaion : permissaion,
                     createdAt : (new Date().toLocaleString("tr-TR", { timeZone: "UTC" })),
                     active : 1
                }).then(()=>{
                  this.vuser= ""
                  this.vpassword=""
                  this.vpermission= ""
                  this.dialogInsert = false
                  this.successSnackbar = true
                  this.getAllUser()
                })
                
          // this.saveData.push({
          //   username : user,
          //   password : password,
          //   user_group : permissaion
          // })
          // console.log('test inser user = ', this.saveData)
          // axios.post(APIURL+'/insertUser',this.saveData[0]).then((response)=>{
          // //           console.log('testtest',this.allUser)
          //             this.dialogInsert = false
          //             this.saveData = []
          //             this.vuser= ""
          //             this.vpassword=""
          //             this.vpermission= ""
          //             this.successSnackbar=true
          //             this.getAllUser()
          //    })
                     
        },
        getAllUser(){
           db.collection("userWebsite").where('active','==',1).orderBy('createdAt').onSnapshot((querySnapshot) => {
                  // db.collection("chat").where('author','==',user).orderBy('createdAt').onSnapshot((querySnapshot) => {
                  let data=[];
                  // let alldata=[]
                  querySnapshot.forEach((doc) => {
                      // alldata.push(doc.data())
                      data.push({
                        'indexKey':doc.id,
                        'user': doc.data().user,
                        'password': doc.data().password,
                        'permissaion': doc.data().permissaion,
                        'createdAt': doc.data().createdAt
                      })
                  })
                   this.allUser=data;
                   console.log('test alldata = ', this.allUser)
                  // console.log('this.messages=',this.allTag);
                 
              });
            //  axios.get(APIURL+'/getAllUser').then((response)=>{
            //             this.allUser=response.data
            //         console.log('testtest',this.allUser)
            //  })
        },
      editUser(item){
        // console.log('item = ', item)
        this.dialogEdit = true
        this.vuser= item.user
        this.vpassword=item.password
        this.vpermission= item.permissaion
        this.indexKey = item.indexKey

      },
      saveEditUser(){
        // console.log('test index key = ', this.user)
        db.collection("userWebsite").doc(this.indexKey).update({
                    user: this.vuser,
                    password : this.vpassword
                })
                this.dialogEdit = false
                this.successSnackbar = true

        // var data=[];
        // data.push({
        //   user_id : this.vuserID,
        //   password : this.vpassword
        // })

        // // console.log('test ==== ', data)
        // axios.post(APIURL+'/updatePasswordUser',data[0]).then((response)=>{
        //             console.log('testtest',this.allUser)
        //               this.dialogEdit = false
        //               this.vuserID = ""
        //               this.vuser= ""
        //               this.vpassword=""
        //               this.vpermission= ""
        //               this.successSnackbar=true
        //               this.getAllUser()
        //      })
        
      },
      deleteItem (item) {
        this.indexKey = item.indexKey,
        this.vuser = item.user
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        db.collection("userWebsite").doc(this.indexKey).update({
                    active: 0
                })
                      this.indexKey = ""
                      this.vuser= ""
                      this.vpassword=""
                      this.vpermission= ""
                      this.dialogDelete = false
                      this.successSnackbar=true
                      this.getAllUser()
        // axios.post(APIURL+'/deleteUser',{userId : this.vuserID}).then((response)=>{
        //             console.log('testtest',this.allUser)
        //               this.dialogDelete = false
        //               this.vuserID = ""
        //               this.vuser= ""
        //               this.vpassword=""
        //               this.vpermission= ""
        //               this.successSnackbar=true
        //               this.getAllUser()
        //      })
      },
      // save () {
      //   if (this.editedIndex > -1) {
      //     Object.assign(this.desserts[this.editedIndex], this.editedItem)
      //   } else {
      //     this.desserts.push(this.editedItem)
      //   }
      //   this.close()
      // },
    },
      beforeRouteEnter (to, from, next) {
          next(vm=>{
          //   firebase.auth().onAuthStateChanged(user=>{
              if(document.cookie){
                next();
              }else{
                vm.$router.push('/')
              }
          //   })
          })
        }
  }
</script>

<style lang="scss" scoped>

</style>