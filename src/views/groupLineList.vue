<template style="width:100; height:100;">
    <div class="groupLineList" style="width:100; height:100;">
        <div>   
            <v-simple-table >
            <template v-slot:default>
            <thead  height="70vh" fixed-header style="width: 100%">
                <tr>
                <th class="text-left">ลำดับ</th>
                <th class="text-left">ชื่อไลน์</th>
                <th class="text-left">Line@ID</th>
                <th class="text-left">Ch.Secret</th>
                <th class="text-left"  width="50">Ch.Access Token</th>
                <th class="text-left"> Rich Menu A</th>
                <th class="text-left">Rich Menu B</th>
                <th class="text-left">URL</th>
                <th class="text-left">สีแชท</th>
                <th class="text-left">สีชื่อ</th>
                <th class="text-left">
                   
                </th>
                </tr>
            </thead>
            <tbody >
                <tr
                v-for="item in allGroupLine"
                :key="item.name"
                >
                <td class="text-left">{{ item.groupline_id }}</td>
                <td class="text-left">{{ item.groupline_name }}</td>
                <td class="text-left">{{ item.groupline_lineid }}</td>
                <td class="text-left">{{ item.groupline_secret }}</td>
                <td class="text-left" style="width: 200px">{{ item.groupline_token }}</td>
                <td class="text-left">{{ item.groupline_rich_menu_a }}</td>
                <td class="text-left">{{ item.groupline_rich_menu_b }}</td>
                <td class="text-left">{{ item.url }}</td>
                <td class="text-left">{{ item.groupline_chatcolor }}</td>
                <td class="text-left">{{ item.groupline_textcolor }}</td>
                <td class="text-left"><v-btn @click="dialog=true"><v-icon > mdi-wrench </v-icon></v-btn></td>
                </tr>
                <tr >
                <td class="text-left"></td>
                <td class="text-left" ><v-text-field label="ชื่อไลน์" dense outlined v-model="vgroupline_name"></v-text-field></td>
                <td class="text-left"><v-text-field label="Line@ID"   dense outlined v-model="vgroupline_lineid"></v-text-field></td>
                <td class="text-left"><v-text-field label="Ch.Secret" dense outlined v-model="vgroupline_secret"></v-text-field></td>
                <td class="text-left"><v-text-field label="Ch.Access Token" dense outlined v-model="vgroupline_token"></v-text-field></td>
                <td class="text-left"><v-text-field label="Rich Menu A" dense outlined v-model="vgroupline_rich_menu_a"></v-text-field></td>
                <td class="text-left"><v-text-field label="Rich Menu B" dense outlined v-model="vgroupline_rich_menu_b"></v-text-field></td>
                <td class="text-left"><v-text-field label="URL" dense outlined v-model="vurl"></v-text-field></td>
                <td class="text-left"><v-text-field label="สีแชท" dense outlined v-model="vgroupline_chatcolor"></v-text-field></td>
                <td class="text-left"><v-text-field label="สีชื่อ" dense outlined v-model="vgroupline_textcolor"></v-text-field></td>
                <v-btn :loading="loading3" :disabled="loading3" color="blue-grey" class="ma-2 white--text" @click="loader = 'loading3' , saveGroupLine()"> Upload <v-icon right dark>mdi-cloud-upload</v-icon></v-btn>
                </tr>
            </tbody>
            </template>
        </v-simple-table>
        </div>
          <!-- <v-btn color="purple" dark>
          Add Line Group
         </v-btn> -->
        <v-dialog v-model="dialog" persistent max-width="600px" dark>
            <v-card>
            <v-card-actions>
             <v-btn color="blue darken-1" text @click="dialog = false">
            Save
          </v-btn>
          </v-card-actions>
      </v-card>
        </v-dialog>
    </div>
</template>

<script>
const axios = require("axios");
const APIURL = "http://127.0.0.1:3000";

    export default {
        data() {
            return {
               
                groupLine:[],
                allGroupLine: [],
                vgroupline_name: '',
                vgroupline_lineid: '',
                vgroupline_secret: '',
                vgroupline_token: '',
                vgroupline_rich_menu_a: '',
                vgroupline_rich_menu_b: '',
                vurl: '',
                vgroupline_chatcolor: '',
                vgroupline_textcolor: '',
                loader: null,
                loading3: false,
                dialog: false

        }
        },
        methods:{
            saveGroupLine(){
                this.groupLine = []
                this.groupLine.push({
                    groupline_lineid: this.vgroupline_lineid,
                    groupline_secret: this.vgroupline_secret,
                    groupline_name: this.vgroupline_name,
                    groupline_token: this.vgroupline_token,
                    url: this.vurl,
                    groupline_chatcolor: this.vgroupline_chatcolor,
                    groupline_textcolor:this.vgroupline_textcolor,
                    groupline_rich_menu_a: this.vgroupline_rich_menu_a,
                    groupline_rich_menu_b: this.vgroupline_rich_menu_b,
                    groupline_itf_auth: '',
                    groupline_url: this.vurl,
                    s_token: ''
                })
                
                axios.post(APIURL+'/setGroupLine',this.groupLine[0]).then((response)=>{
                    this.getAllGroupLine()
                    this.loader = null
                })
                this.vgroupline_name= '',
                this.vgroupline_lineid= '',
                this.vgroupline_secret= '',
                this.vgroupline_token= '',
                this.vgroupline_rich_menu_a= '',
                this.vgroupline_rich_menu_b= '',
                this.vurl= '',
                this.vgroupline_chatcolor= '',
                this.vgroupline_textcolor= ''
            },

            getAllGroupLine(){
                 axios.get(APIURL+'/getAllGroupLine').then((response)=>{
                        this.allGroupLine=response.data
                    console.log('testtest',this.allGroupLine)
              })
            },
            editGroupLine(groupline_id){
                
                console.log('test groupline_id = ', groupline_id);

            }
        },
        created() {
            this.getAllGroupLine()
        },
        watch: {
        loader () {
            const l = this.loader
            this[l] = !this[l]

            setTimeout(() => (this[l] = false), 1000)

            
      }
    }
    }
</script>

<style lang="scss" scoped>

</style>