<template>
  <v-app>
    <div>
        <v-data-table :headers="headers" :items="allRow" sort-by="calories" class="elevation-1" height="70vh" fixed-header style="width: 100%">
    <template v-slot:top>
      <v-toolbar flat >
        <v-toolbar-title>Responsible Group Line</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-btn color="primary" dark class="mb-2" @click="dialogInsert = true">New Responsible </v-btn>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{item}">
      <v-icon small class="mr-2" @click="editRow(item)">
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
                
              </v-col>
              <v-col cols="12">
                
              </v-col>
              <v-col cols="12" sm="6">
                <v-select :items="allRow" return-object label="Group Line"  required >
                    <!-- <option v-bind:value="allRow" v-for="item in allRow">{{ item.username }}</option> -->
                </v-select>
                
              </v-col>
              
              <v-col cols="12" sm="6">
                <v-select :items="allRow" return-object label="User"  required ></v-select>
              </v-col>
              <v-col cols="12" sm="2" >
                  <v-btn color="primary">Add</v-btn>
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
          <span class="headline">Edit Password Profile</span>
        </v-card-title>
                <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <!-- <v-text-field label="User*" type="username" v-model="vuser" disabled></v-text-field> -->
              </v-col>
              <v-col cols="12">
                <!-- <v-text-field label="Password*"  v-model="vpassword" required></v-text-field> -->
              </v-col>
              <v-col cols="12" sm="6">
                <!-- <v-select :items="['admin', 'user']" label="Permission" v-model="vpermission" disabled ></v-select> -->
              </v-col>
              <v-col cols="12" sm="6" >
                <!-- <v-btn v-if="vpassword!== ''" :loading="loading3" :disabled="loading3" color="blue-grey" class="ma-2 white--text" @click="loader = 'loading3' , saveEditUser() "> SAVE <v-icon right dark>mdi-cloud-upload</v-icon></v-btn> -->
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
            <!-- <v-card-title class="headline">คุณแน่ใจที่จะลบ  {{this.vuser}}</v-card-title> -->
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialogDelete = false">Cancel</v-btn>
              <!-- <v-btn color="blue darken-1" text @click="deleteItemConfirm()">OK</v-btn> -->
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
        groupLineId:'',
        groupLineName:'',
        userId:'',
        userName:'',
      allRow:[],
      dialogDelete: false,
      dialogEdit: false,
      successSnackbar: false,
      loader: null,
      loading3: false,
      saveData:[],
      dialogInsert: false,
      dialogDelete: false,
      headers: [
        {
          text: 'id',
          align: 'start',
          sortable: false,
          value: 'id',
        },
        { text: 'Group Line', value: 'groupline_name' },
        { text: 'User ผู้รับผิดชอบ ', value: 'username' },
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
      this.getAllRow()
    },

    methods: {
        checkData(test1){
          console.log('test1 = ',test1)
        },
        getAllRow(){
             axios.get(APIURL+'/getAllResponsible').then((response)=>{
                        this.allRow=response.data
                    console.log('testtest',this.allRow)
             })
        },editRow(){
            this.dialogEdit = true
        },
        deleteItem (item) {
        this.dialogDelete = true
      }



      // save () {
      //   if (this.editedIndex > -1) {
      //     Object.assign(this.desserts[this.editedIndex], this.editedItem)
      //   } else {
      //     this.desserts.push(this.editedItem)
      //   }
      //   this.close()
      // },
    }
  }
</script>

<style lang="scss" scoped>

</style>