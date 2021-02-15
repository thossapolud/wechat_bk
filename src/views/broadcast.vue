<template>
    <div>
    <v-app>
    broadcast page
    <v-card flat>
    <v-container fluid>
    <v-row>
      <v-col cols="6">
        <v-select :items="lineGroup" item-text="groupLine_name" item-value="groupLine_token" label="Group Line" v-model="groupToken"></v-select>
      </v-col>
      <v-btn @click="enter(groupToken)">Enter</v-btn>
    </v-row>
  </v-container>
    <v-card-text>
      <v-container fluid>
      <v-row>
          <!-- <v-col cols="12" sm="4" md="4"> -->
          <div>
    <v-data-table :headers="headers" :items="lineMember" class="elevation-1" >
      <template v-slot:item.select="{ item }">
        <v-simple-checkbox v-model="item.select" :ripple="false" ></v-simple-checkbox>
      </template>
    </v-data-table>
  </div>
  
  
          <!-- </v-col> -->
      </v-row>
      </v-container>
       <v-container fluid>
    <v-textarea clearable clear-icon="mdi-close-circle" label="Text" value="This is clearable text." v-model="message"></v-textarea>
    <v-row>
      <v-col cols="2">
    <v-btn color="primary" @click="sendMessage(message,lineMember,groupToken)">broadcast</v-btn>
      </v-col>
    </v-row>
  </v-container>
    </v-card-text>
    </v-card>


    <v-timeline dense clipped>
    <v-timeline-item fill-dot class="white--text mb-12"
        color="orange"
        large
      >
      <template v-slot:icon>
          <span>History</span>
        </template>

    <!-- <v-text-field
          v-model="message"
          hide-details
          flat
          label="Leave a comment..."
          solo
          @keydown.enter="sendMessage(message,lineMember,groupToken)"
        >
          <template v-slot:append>
            <v-btn
              class="mx-0"
              depressed
              @click="sendMessage(message,lineMember,groupToken)"
            >
              Post
            </v-btn>
          </template>
        </v-text-field> -->
    </v-timeline-item>
    <v-slide-x-transition
        group
      >
      <v-timeline-item
          v-for="event in history"
          :key="event.createdAt"
          class="mb-4"
          :color="colotHistory"
          small
        >
          <v-row justify="space-between">
            <v-col
              cols="7"
              v-text="event.message"
            ></v-col>
            <v-col
              class="text-right"
              cols="5"
              v-text="event.createdAt"
            ></v-col>
          </v-row>
        </v-timeline-item>
      </v-slide-x-transition>
    </v-timeline>


    <v-snackbar v-model="snackbar" >
    Broadcast สำเร็จ
    </v-snackbar>
    </v-app>
    </div>
</template>

<script>
//  import firebase from 'firebase'
 const axios = require("axios");
 const APIURL = "https://wechatbackend.herokuapp.com"
//  const APIURL = "http://127.0.0.1:8000";
  export default {
    data () {
      return {
        colotHistory: '',
        history: [],
        snackbar: false,
        groupToken:'',
        message:'',
        selectLineGroup: '',
        lineGroup:[],
        select:[],
        lineMember: [],
        headers: [
          {
            text: 'Line Member',
            align: 'start',
            sortable: false,
            value: 'lineUserId',
          },
          { text: 'Line Group', value: 'lineAdId' },
          { text: 'Created', value: 'createdAt' },
          { text: 'Select', value: 'select'}
        ],
      }
    },
    computed: {
      timeline () {
        return this.events.slice().reverse()
      },
    },
    methods:{
      getHistory(groupToken){
        this.history = []
        db.collection("broadcast").where('groupToken','==',groupToken).onSnapshot((querySnapshot) => {
          let data = []
          // let groupLine_LineId = ''
              querySnapshot.forEach((doc) => {
                console.log('history = ', doc.data())
                data.push(doc.data())
                // console.log('data = ',doc.data().groupLine_LineId)
                // groupLine_LineId = doc.data().groupLine_LineId
              })
              this.history = data 
              console.log('log = ', this.history)
              // this.getMemberLine(groupLine_LineId)
        })

      },
      async enter(groupToken){
        this.colotHistory = ''
       db.collection("groupLine").where('groupLine_token','==',groupToken).onSnapshot((querySnapshot) => {
          // data = []
          let groupLine_LineId = ''
          let color = ''
              querySnapshot.forEach((doc) => {
                // console.log('data = ',doc.data().groupLine_LineId)
                groupLine_LineId = doc.data().groupLine_LineId
                color = doc.data().groupLine_chatcolor
              })
              this.colotHistory = color
              this.getMemberLine(groupLine_LineId)
              this.getHistory(groupToken)
        })
      },
      
      sendMessage(message,lineMember,groupToken){
        let data = []
        let SelectlineMember =[]
        const time = (new Date()).toTimeString()
        for (let index = 0; index < lineMember.length; index++) {
          if(lineMember[index].select === true){
            SelectlineMember.push(lineMember[index].lineUserId)
          }
        }
        data.push({
          'groupToken' : groupToken,
          'message' : message,
          'lineMember' : SelectlineMember
        })
        console.log('data = ', data)

      axios.post(APIURL+'/multicast',{"groupToken" : groupToken,
                                      "message"  : message,
                                      "SelectlineMember":SelectlineMember
                                                      }).then((response)=>{  
        this.snackbar = true
        this.message = ''
        // console.log('res', response)            
      })
      

      },
      showData(value){
        console.log('data = ', value)
        console.log('lineMember = ', this.lineMember)
      },
      getLineGroup(){
        this.lineGroup = []
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
                        'active': doc.data().active,
                        'select': false
                        
                      })
                  })
                   this.lineGroup=data;
                   console.log('test alldata = ', this.lineGroup)
                  // console.log('this.data=',data);
                 
              });

      },
      getMemberLine(groupLine_LineId){
        console.log('groupLine_LineId ====',groupLine_LineId)
        let dat = groupLine_LineId
        this.lineMember = []
        this.allGroupLine = []
       db.collection("memberLineGroup").where('lineAdId','==',dat).onSnapshot((querySnapshot) => {
         let data=[];
          querySnapshot.forEach((doc) => {
                      // data.push(doc.data())
                      if(doc.data().active === 1){
                      this.lineMember.push({
                          'active' : doc.data().active,
                          'lineUserId' : doc.data().lineUserId,
                          'lineAdId' : doc.data().lineAdId,
                          'createdAt' : doc.data().createdAt,
                          'select' : false

                      })
                      }
                      // Object.assign(this.lineMember.member, {'select' : false})
                      console.log('test == ',this.lineMember)
                  })
                   this.allGroupLine=data;
                   console.log('test alldata = ', this.allGroupLine)
                  // console.log('this.data=',data);
              });
      }
    },
    created() {
      this.getLineGroup()
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
.incoming_msg_img {
  display: inline-block;
  width: 6%;
}
.sent_msg {
  float: right;
  width: 57%;
}
 .sent_msg p {
  background: #00c300 none repeat scroll 0 0;
  border-radius: 3px;
  font-size: 14px;
}
.mesgs {
  float: left;
  padding: 30px 15px 0 25px;
  width: 60%;
}
</style>