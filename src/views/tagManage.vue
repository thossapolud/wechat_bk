<template>
  <v-app>
    <div>
        <v-data-table :headers="headers" :items="allTag" sort-by="calories" class="elevation-1" height="70vh" fixed-header style="width: 100%">
    <template v-slot:top>
      <v-toolbar flat >
        <v-toolbar-title>Tag Management</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-btn color="primary" dark class="mb-2" @click="openDialogNewTag()">New Tag </v-btn>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{item}">
      <v-icon small class="mr-2" @click="editTag(item)">
        mdi-pencil
      </v-icon>
      <v-icon small @click="deletetag(item)">
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
    <v-dialog v-model="dialogNewTag" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">New Tag</span>
        </v-card-title>
                <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
              v-model="tagName"
              color="purple darken-2"
              label="Tag Name"
              required
            ></v-text-field>
              </v-col>
               <v-col cols="12">
               <v-textarea outlined label="Outlined textarea"  :value="description" v-model="description"></v-textarea>
               </v-col>
              <v-col cols="12" sm="2" >
                  <v-btn color="primary" @click="saveTag()">Add</v-btn>
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
              <v-col cols="12">
                <v-text-field label="Tag Name" type="username" v-model="tagName" disabled></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea outlined label="Outlined textarea"  :value="description" v-model="description"></v-textarea>
              </v-col>
              <v-col cols="12" sm="6">
                <!-- <v-select :items="['admin', 'user']" label="Permission" v-model="vpermission" disabled ></v-select> -->
              </v-col>
              <v-col cols="12" sm="6" >
                <!-- <v-btn v-if="vpassword!== ''" :loading="loading3" :disabled="loading3" color="blue-grey" class="ma-2 white--text" @click="loader = 'loading3' , saveEditUser() "> SAVE <v-icon right dark>mdi-cloud-upload</v-icon></v-btn> -->
                <!-- <v-autocomplete :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']" label="Interests" multiple></v-autocomplete> -->
                <!-- <v-btn></v-btn> -->

                  <v-btn color="primary" @click="confirmEditTag()">Add</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline">คุณแน่ใจที่จะลบ  </v-card-title>
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
// import firebase from 'firebase'
  export default {
    data: () => ({
        dialogDelete : false,
        indexKey: '',
        successSnackbar:false,
        dialogEdit:false,
        tagName:null,
        description:null,
        dialogNewTag:false,
        createdAt:'',
        allTag:[],
      headers: [
        { text: 'ชื่อ Tag', value: 'tagName' },
        { text: 'รายละเอียด ', value: 'description' },
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
        this.getAllTag()
    },

    methods: {
        deleteItemConfirm(){    
            db.collection("tagMessage").doc(this.indexKey).update({
                    active: 0
                })
                this.dialogDelete = false
                this.successSnackbar = true
                this.getAllTag()
        },
        deletetag(item){
            this.indexKey = item.indexKey
            this.dialogDelete = true
            console.log('test = ', item)
            
        },
        confirmEditTag(){
            db.collection("tagMessage").doc(this.indexKey).update({
                    tagName: this.tagName,
                    description : this.description
                })
                this.dialogEdit = false
                this.successSnackbar = true
        },
        editTag(item){
            console.log('testdata = ', item)
            this.indexKey = item.indexKey
            this.tagName = item.tagName
            this.description = item.description
            this.createdAt = item.createdAt
            this.dialogEdit = true

        },
        checkData(test1){
          console.log('test1 = ',test1)
        },
        getAllTag(){
            db.collection("tagMessage").where('active','==',1).orderBy('createdAt').onSnapshot((querySnapshot) => {
                  // db.collection("chat").where('author','==',user).orderBy('createdAt').onSnapshot((querySnapshot) => {
                  let data=[];
                //   let alldata=[]
                  querySnapshot.forEach((doc) => {
                    //   data.push(doc.data())
                      data.push({
                        'indexKey':doc.id,
                        'tagName': doc.data().tagName,
                        'description': doc.data().description,
                        'createdAt': doc.data().createdAt
                      })
                  })
                   this.allTag=data;
                //    console.log('test alldata = ', alldata)
                  console.log('this.messages=',this.allTag);
                 
              });
             
        },
        openDialogNewTag(){
            this.tagName = ''
            this.description = ''
            this.dialogNewTag = true

        },
        saveTag(){
            db.collection('tagMessage').add({
                    tagName : this.tagName,
                   description : this.description,
                     createdAt : (new Date().toLocaleString("tr-TR", { timeZone: "UTC" })),
                     active : 1
                }).then(()=>{
                  this.successSnackbar = true
                  this.dialogNewTag = false
                })
                this.getAllTag()
        },
        editRow(){
            this.dialogEdit = true
        },
        deleteItem (item) {
        this.dialogDelete = true
        }
    }
  }
</script>

<style lang="scss" scoped>

</style>