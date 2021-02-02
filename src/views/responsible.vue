<template>
  <v-app>
    <div>
        <v-data-table :headers="headers" :items="allRow" sort-by="calories" class="elevation-1" height="70vh" fixed-header style="width: 100%">
    <template v-slot:top>
      <v-toolbar flat >
        <v-toolbar-title>Responsible Manage</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-btn color="primary" dark class="mb-2" @click="openDialogNewRow()">New Responsible</v-btn>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{item}">
      <v-icon small class="mr-2" @click="editRow(item)">
        mdi-pencil
      </v-icon>
      <v-icon small @click="deleteRow(item)">
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
    <v-dialog v-model="dialogNewRow" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">New Responsible</span>
        </v-card-title>
                <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="6" md="3">
               <v-select :items="allGroupLine" item-text="groupLine_name" item-value="indexKey" label="Group Line" v-model="indexGroupLine"></v-select>
              </v-col>
              <v-col cols="6" md="3">
               <v-select :items="allUser" item-text="user" item-value="indexKey" label="User" v-model="indexUser"></v-select>
              </v-col>
               <v-col cols="12">
               </v-col>
              <v-col cols="12" sm="2" >
                  <v-btn color="primary" @click="saveRow()">Add</v-btn>
                <!-- <v-btn v-if="vuser!=='' & vpassword!== '' & vpermission!== ''" :loading="loading3" :disabled="loading3" color="blue-grey" class="ma-2 white--text" @click="loader = 'loading3' , insertRow() "> SAVE <v-icon right dark>mdi-cloud-upload</v-icon></v-btn> -->
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
          <span class="headline">Edit Tag</span>
        </v-card-title>
                <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="6" md="3">
               <v-select :items="allGroupLine" item-text="groupLine_name" item-value="indexKey" label="Group Line" v-model="indexGroupLine"></v-select>
              </v-col>
              <v-col cols="6" md="3">
               <v-select :items="allUser" item-text="user" item-value="indexKey" label="User" v-model="indexUser"></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <!-- <v-select :items="['admin', 'user']" label="Permission" v-model="vpermission" disabled ></v-select> -->
              </v-col>
              <v-col cols="12" sm="6" >
                <!-- <v-btn v-if="vpassword!== ''" :loading="loading3" :disabled="loading3" color="blue-grey" class="ma-2 white--text" @click="loader = 'loading3' , saveEditUser() "> SAVE <v-icon right dark>mdi-cloud-upload</v-icon></v-btn> -->
                <!-- <v-autocomplete :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']" label="Interests" multiple></v-autocomplete> -->
                <!-- <v-btn></v-btn> -->

                  <v-btn color="primary" @click="saveEditRow()">Add</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline">คุณแน่ใจที่จะลบ</v-card-title>
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
import firebase from 'firebase'
  export default {
    data: () => ({
        indexGroupLine:'',
        indexUser:'',
        allUser:[],
        allGroupLine: [],
        dialogDelete : false,
        indexKey: '',
        successSnackbar:false,
        dialogEdit:false,
        tagName:null,
        description:null,
        dialogNewRow:false,
        createdAt:'',
        allRow:[],
      headers: [
        { text: 'Group Line', value: 'groupLine_name' },
        { text: 'User ผู้รับผิดชอบ ', value: 'user' },
        { text: 'วันที่สร้าง ', value: 'createdAt' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },

    watch: {

    },

    created () {
        // this.getAllTag()
        this.getAllRow()
        this.getAllGroupLine()
        this.getAllUser()
        
    },

    methods: {
      deleteItemConfirm(){    
            db.collection("responsible").doc(this.indexKey).update({
                    active: 0
                })
                this.dialogDelete = false
                this.successSnackbar = true
                this.getAllRow()
        },
      deleteRow(item){
        this.indexKey = item.indexKey
         this.dialogDelete = true
      },
      saveEditRow(){
        console.log('indexGroupLine = ',this.indexGroupLine)
        console.log('indexUser = ',this.indexUser  )

        let username
        let lineGroupName
          // console.log('indexGroupLine === ', this.indexGroupLine)
          // console.log('indexUser === ', this.indexUser)

             for (let index = 0; index < this.allUser.length; index++) {
        const element = this.allUser[index]
        // console.log('this.allUser[index] = ',this.allUser[index].indexKey)
        if(this.indexUser ===  this.allUser[index].indexKey){
          username = this.allUser[index].user
        }
        // this.arraySelectGroup.push(element)
          }

          for (let index = 0; index < this.allGroupLine.length; index++) {
        const element = this.allGroupLine[index]
        // console.log('this.allUser[index] = ',this.allUser[index].indexKey)
        if(this.indexGroupLine ===  this.allGroupLine[index].indexKey){
          lineGroupName = this.allGroupLine[index].groupLine_name
        }
        // this.arraySelectGroup.push(element)
          }

        db.collection("responsible").doc(this.indexKey).update({
                    indexGroupLine : this.indexGroupLine,
                    groupLine_name : lineGroupName,
                    indexUser : this.indexUser,
                    user : username
                })
                this.dialogEdit = false
                this.successSnackbar = true


      },
      editRow(item){
        this.indexKey = item.indexKey
        this.indexGroupLine = item.indexGroupLine
        this.indexUser = item.indexUser
        this.dialogEdit = true


console.log('item = ', item)
      },
      saveRow(){
        let username
        let lineGroupName
          // console.log('indexGroupLine === ', this.indexGroupLine)
          // console.log('indexUser === ', this.indexUser)

             for (let index = 0; index < this.allUser.length; index++) {
        const element = this.allUser[index]
        // console.log('this.allUser[index] = ',this.allUser[index].indexKey)
        if(this.indexUser ===  this.allUser[index].indexKey){
          username = this.allUser[index].user
        }
        // this.arraySelectGroup.push(element)
          }
          console.log('user = ',username)

          for (let index = 0; index < this.allGroupLine.length; index++) {
        const element = this.allGroupLine[index]
        // console.log('this.allUser[index] = ',this.allUser[index].indexKey)
        if(this.indexGroupLine ===  this.allGroupLine[index].indexKey){
          lineGroupName = this.allGroupLine[index].groupLine_name
        }
        // this.arraySelectGroup.push(element)
          }
          console.log('user = ',lineGroupName)

          db.collection('responsible').add({
                    indexGroupLine : this.indexGroupLine,
                    groupLine_name : lineGroupName,
                    indexUser : this.indexUser,
                    user : username,
                     createdAt : (new Date().toLocaleString("tr-TR", { timeZone: "UTC" })),
                     active : 1
                }).then(()=>{
                  this.successSnackbar = true
                  this.dialogNewRow = false
                })
                this.getAllRow()
      },
      getAllRow(){
        db.collection("responsible").where('active','==',1).orderBy('createdAt').onSnapshot((querySnapshot) => {
                  // db.collection("chat").where('author','==',user).orderBy('createdAt').onSnapshot((querySnapshot) => {
                  let data=[];
                //   let alldata=[]
                  querySnapshot.forEach((doc) => {
                    //   data.push(doc.data())
                      data.push({
                        'indexKey':doc.id,
                        'active':doc.data().active,
                        'createdAt': doc.data().createdAt,
                        'groupLine_name': doc.data().groupLine_name,
                        'indexGroupLine': doc.data().indexGroupLine,
                        'indexUser':doc.data().indexUser,
                        'user':doc.data().user

                      })
                  })
                   this.allRow=data;
                //    console.log('test alldata = ', alldata)
                  console.log('this.allRow=',this.allRow);
                 
              });

      },
      openDialogNewRow(){
        this.indexGroupLine = ''
        this.indexUser = ''
        this.dialogNewRow = true

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
                  //  console.log('allUser = ', this.allUser)
                 
              });
        },
             getAllGroupLine(){
              db.collection("groupLine").where('active','==',1).orderBy('createdAt').onSnapshot((querySnapshot) => {
                  let data=[];
                //   let alldata=[]
                  querySnapshot.forEach((doc) => {
                      // data.push(doc.data())
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
                        'active': doc.data().active
                        
                      })
                  })
                   this.allGroupLine=data;
                  //  console.log('allGroupLine = ', this.allGroupLine)
                  // console.log('this.data=',data);
                 
              });

            }
        
}
}
</script>

<style lang="scss" scoped>

</style>