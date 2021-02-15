<template>
<v-app>
    <div>
      <div>
      <div class="inbox_msg">
        <div class="inbox_people">
          <div class="headind_srch">
            <div class="recent_heading">
              <h4>Recent</h4>
            </div>
            <div class="srch_bar">
              <div class="stylish-input-group">
                <input type="text" class="search-bar"  placeholder="Search" >
                <span class="input-group-addon">
                <button type="button"> <i class="fa fa-search" aria-hidden="true"></i> </button>
                </span> </div>
            </div>
          </div>
          <div class="inbox_chat" >

            <v-list three-line>
            <div v-for="(item, index) in profile" :key="index">
              <div v-for="(itemmem, index) in item.member" :key="index">
                <v-list-item
                  :key="index"
                  :style="{'background-color': item.groupLineBody.groupLine_chatcolor}"
                  @click="fetchLineMessagesByUser(itemmem.bodymember.lineUserId,item.groupLineBody.groupLine_chatcolor), vAccessToken = item.groupLineBody.groupLine_token, vlineGroupUserId = item.groupLine_UserId"
                >
                <v-menu>
                <template v-slot:activator="{ on: menu, attrs }">
                  <v-btn v-bind="attrs" v-on="{ ...menu }">
                    <v-icon>mdi-dialpad</v-icon>
                  </v-btn>
                </template>
                <v-list>
                <v-row>
                <v-col>
                  <v-list-item-title @click="openNote(itemmem.bodymember.note,itemmem.bodymember.lineUserId,itemmem.indexKey)">note</v-list-item-title>
                </v-col>
                </v-row>
                <v-row>
                <v-col>
                  <v-list-item-title>add tag</v-list-item-title>
                  </v-col>
                </v-row>
                <!-- <v-row>
                <v-col>
                  <v-list-item-title>1asdfghj</v-list-item-title>
                  </v-col>
                </v-row> -->
              </v-list>
                </v-menu>
                  <v-row class="align-center">
                    <v-col cols="3">
                    <v-badge bordered bottom :color="item.groupLineBody.groupLine_textcolor" dot offset-x="10" offset-y="10">
                      <v-avatar>
                        <v-img :src="itemmem.proFile.pictureUrl"></v-img>
                      </v-avatar>
                      </v-badge>
                    </v-col>
                    <v-col cols="9">
                      <v-row>
                        <v-col cols="5" class="pb-0">
                          <v-list-item-title :style="{ 'color': item.groupLineBody.groupLine_textcolor}">
                            {{ itemmem.proFile.displayName }}
                          </v-list-item-title>
                        </v-col>
                        <v-col cols="7" class="pb-0">
                          <v-list-item-subtitle>
                            Group Line {{ item.groupLine_name }}
                          </v-list-item-subtitle>
                          
                        </v-col>
                      </v-row>
                      
                      <v-row>
                        <v-col cols="12" class="pb-0 text-start">
                          <v-list-item-subtitle>
                            test last message
                          </v-list-item-subtitle>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-list-item>
                <v-divider></v-divider>
              </div>
            </div>
          </v-list> 
          </div>
        </div>
        <div class="mesgs">
          <div class="msg_history">
            <div v-for="item in messageByUser" :key="item.index" class="incoming_msg">
              <!-- <div :class="[item.lineAdId!==senderlineUserId?'sent_msg':'received_msg']"> -->
              <!-- <div :class="[item.type!=='in'?'sent_msg':'received_msg']"> -->
              <div :class="[item.type!=='in'?'sent_msg':'received_msg']">
                <div class="received_withd_msg">
                  <p>{{item.message}}</p>
                  <br>
                </div>
              </div>
            </div>
            
          </div>
          <div class="type_msg">
            <div class="input_msg_write">
              <input @keyup.enter="sendMessage" v-model="message" type="text" class="write_msg" placeholder="Type a message" />
              
              <v-btn  v-if="message != ''" @click="sendMessage()" class="msg_send_btn" type="button">  <v-icon dark right >mdi-send-outline</v-icon></v-btn>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    <v-dialog v-model="dialogNote" max-width="500px" persistent  >
    <v-container >
    <v-row>
          <v-col cols="12" >
        <v-textarea outlined label="Outlined textarea"  :value="noteMessage" v-model="note" background-color="amber lighten-4"></v-textarea>
      <v-col cols="12" md="3">
      <v-btn @click="saveNote(noteMessage)">save</v-btn>
      </v-col>
      <v-col cols="12" md="3">
      <v-btn @click="cancelNote()">cancel</v-btn>
      </v-col>
      </v-col>
      </v-row>
      </v-container>
      </v-dialog>
      <v-snackbar v-model="snackbar" >
      บันทึกเรียบร้อย
      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
      
    </v-app>
</template>

<script>
import firebase from 'firebase/app'
import firestore from "firebase/firestore"
import VueCookies from 'vue-cookies'
    const axios = require("axios");
    // const APIURL = "http://127.0.0.1:8000";
    const APIURL = "https://wechatbackend.herokuapp.com"
    // axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

    export default {
        name: 'PrivateChat',
        data() {
            return {

                NoteindexKey:'',
                note:'',
                vreplyToken:'',
                vAccessToken:'',
                chatColor:'',
                profile: [],
                snackbar:false,
                noteMessage: '',
                vlineUserId: '',
                dialogNote: false,
                message: '',
                messages: [],
                messageByUser: [],
                // authUser: {},
                receiverlineUserId : '',
                arrayReceiverlineUserId :[],
                arrayReceiverlineMessage : [],
                arrayReceiverLastTime : [],
                lastReplyToken:'',
                // senderlineUserId : ''
                vlineGroupUserId:'',
                // senderlineUserId:'U42a494c80f5dcdb13017efdf252be7e3',
                userWeb : ''
            }
        },
        computed:{
          
        },
        methods: {
            cancelNote(){
              this.dialogNote = false
            },
            saveNote(){
              console.log('message note =',this.note)

                db.collection("memberLineGroup").doc(this.NoteindexKey).update({
                    note : this.note
                }).then(()=>{
                  this.snackbar = true
                  this.dialogNote = false
                })
                
            },
            openNote(note,userID,indexKey){
              console.log('userID = ', userID)
              console.log('openNote = ', note)
              console.log('indexKey = ', indexKey)
              this.note = note
              this.vlineUserId = userID
              this.NoteindexKey = indexKey
              // this.vlineUserId = lineUserId
              this.dialogNote = true

            },
            scrollToBottom(){
              let box=document.querySelector('.msg_history');
              box.scrollTop=box.scrollHeight;
            },
            // saveMessage(){ //ส่งข้อมูลไปยัง firebase
            //     //save to firestore
            //     db.collection('chat').add({
            //         message:this.message,
            //         author:this.authUser.displayName,
            //         createdAt: new Date()
            //     }).then(()=>{
            //       this.scrollToBottom();
            //     })
            //     // console.log('test = ', this.message)
            //     this.message = null

            //     setTimeout(()=>{
            //       this.scrollToBottom();
            //     },1000);
            // },
            sendMessage(){
              axios.post(APIURL+'/reply',{  // ตอบกลับไปยังไลน์
                                            "reply_token" : this.vreplyToken,
                                            "accessToken" : this.vAccessToken,
                                            "message" : this.message,
                                            "lineUserId" : this.receiverlineUserId,
                                            "typeMessage" : 'text',
                                            "vmod" : 'active',
                                            "lineAdId" : this.vlineGroupUserId,
                                            "type" : 'out',
                                            "read" : 1,
                                            "createdAt" : (new Date().toLocaleString("tr-TR", { timeZone: "UTC" }))
                                            }).then((response)=>{
              })
              this.message = null
              setTimeout(()=>{
                  this.scrollToBottom();
                },1000);
            },
            fetchLineMessages(){ //ดึงข้อมูลจาก firebase
                db.collection("lineMessage").orderBy('createdAt').onSnapshot((querySnapshot) => {
                  // db.collection("chat").where('author','==',user).orderBy('createdAt').onSnapshot((querySnapshot) => {
                  let allMessages=[];
                  querySnapshot.forEach((doc) => {
                      allMessages.push(doc.data())
                  })
                  this.messages=allMessages;
                  // console.log('this.messages=',this.messages);
              });
            },
            async fetchLineUserIdRecent(){ //ดึงข้อมูลโปรไฟล์ User
            // let userWeb = req.body.userWeb

            let userWebdata =[]

            const test = await db.collection("responsible").where('user','==',this.userWeb).get()
            test.forEach(doc => {
              
              if (doc.data().active === 1) {
                userWebdata.push(doc.data())
                console.log('test',userWebdata)
              }
            })

            
            for (let index = 0; index < userWebdata.length; index++) { //หา body ของ group line
              

              let response = await db.collection("groupLine").where('groupLine_LineId','==',userWebdata[index].groupLine_UserId).get()
              response.forEach(doc => {
                Object.assign(userWebdata[index], {'groupLineBody' : doc.data()})
              })
              
              let response2 = await db.collection("memberLineGroup").where('lineAdId','==',userWebdata[index].groupLine_UserId).get()
              
              let member =[]
              response2.forEach(doc => {
                if(userWebdata[index].groupLine_UserId === doc.data().lineAdId && userWebdata[index].active === 1){
                // console.log('data = ', doc.data())//body member
                
                  axios.post(APIURL+'/getProfile',{'lineUserId': doc.data().lineUserId,
                                                  'lineToken': userWebdata[index].groupLineBody.groupLine_token} //
                                            ).then((response)=>{
                                              // console.log('response.data.profile = ',response.data.profile)
                                              member.push({
                                                            'indexKey': doc.id,
                                                            'bodymember' : doc.data(),
                                                            'proFile' : response.data.profile})                
                // })
                })
                Object.assign(userWebdata[index], {'member' : member})
                }
              })
                console.log('userWebdata = ',userWebdata)
              } 
              this.profile =  userWebdata
              
              // console.log('response profile= ', this.profile )
            // axios.post(APIURL+'/getProfile',userWebdata //
            //                                 ).then((response)=>{
            //                                   this.profile  = response.data                     
            // })
            },
            fetchLineMessagesByUser(lineUserId,color){
            // console.log('vlineGroupId  = ', this.vlineGroupUserId)
            // console.log('vAccessToken  = ', this.vAccessToken)
              this.receiverlineUserId = lineUserId
              this.chatColor=color
              // console.log('test line user id = ', this.receiverlineUserId);
              db.collection("lineMessage").where('lineUserId','==',lineUserId).orderBy('createdAt').onSnapshot((querySnapshot)=>{
                let Msg = [];
                querySnapshot.forEach((doc) => {
                      Msg.push(doc.data())
                      this.vreplyToken = doc.data().reply_token
                  })
                  this.messageByUser=Msg
                  // this.vreplyToken=this.messageByUser.sort().reply_token
                  // console.log('vreplyToken = ',this.vreplyToken)
              })
              // console.log('test data ',this.messageByUser)
              setTimeout(()=>{
                  this.scrollToBottom();
                },10);
            }
        },
        
        created() {
          this.userWeb =  $cookies.get('user')
          console.log('log ==', $cookies.get('user'))
          this.fetchLineUserIdRecent()
          // firebase.auth().onAuthStateChanged(user=>{
          //   if(user){
          //     this.authUser=user;
          //   }else{
          //     this.authUser={}
          //   }
          // }
          // )
          this.fetchLineMessages();
          this.fetchLineUserIdRecent();
            // this.fetchMessages();
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
hr {
  margin: 0px;
}
.container{max-width:1170px; margin:auto;}
img{ max-width:100%;}
.inbox_people {
  background: #f8f8f8 none repeat scroll 0 0;
  float: left;
  overflow: hidden;
  width: 40%; border-right:1px solid #c4c4c4;
}
.inbox_msg {
  border: 1px solid #c4c4c4;
  clear: both;
  overflow: hidden;
}
.top_spac{ margin: 20px 0 0;}


.recent_heading {float: left; width:40%;}
.srch_bar {
  display: inline-block;
  text-align: right;
  width: 60%; 
  padding:0%;
}
.headind_srch{ padding:10px 29px 10px 20px; overflow:hidden; border-bottom:1px solid #c4c4c4;}

.recent_heading h4 {
  color: #05728f;
  font-size: 21px;
  margin: auto;
}
.srch_bar input{ border:1px solid #cdcdcd; border-width:0 0 1px 0; width:80%; padding:2px 0 4px 6px; background:none;}
.srch_bar .input-group-addon button {
  background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
  border: medium none;
  padding: 0;
  color: #707070;
  font-size: 18px;
}
.srch_bar .input-group-addon { margin: 0 0 0 -27px;}

.chat_ib h5{ font-size:15px; color:#464646; margin:0 0 8px 0;}
.chat_ib h5 span{ font-size:13px; float:right;}
.chat_ib p{ font-size:14px; color:#989898; margin:auto}
.chat_img {
  float: left;
  width: 11%;
}
.chat_ib {
  float: left;
  padding: 0 0 0 15px;
  width: 88%;
}

.chat_people{ overflow:hidden; clear:both;}
.chat_list {
  border-bottom: 1px solid #c4c4c4;
  margin: 0;
  padding: 18px 16px 10px;
}
.inbox_chat { height: 550px; overflow-y: scroll;}

.active_chat{ background:#ebebeb;}

.incoming_msg_img {
  display: inline-block;
  width: 6%;
}
.received_msg {
  display: inline-block;
  width: 57%;
  float: left;
 }
 .received_withd_msg p {
  background: #585858 none repeat scroll 0 0;
  border-radius: 3px;
  color: #ffffff;
  font-size: 14px;
  margin: 0;
  padding: 5px 10px 5px 12px;
}
.received_withd_msg {
  overflow-x: hidden;
}
.mesgs {
  float: left;
  padding: 30px 15px 0 25px;
  width: 60%;
}

 .sent_msg p {
  background: #00c300 none repeat scroll 0 0;
  border-radius: 3px;
  font-size: 14px;
}
.outgoing_msg{ overflow:hidden; margin:26px 0 26px;}
.sent_msg {
  float: right;
  width: 57%;
}
.input_msg_write input {
  background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
  border: medium none;
  color: #4c4c4c;
  font-size: 15px;
  min-height: 48px;
  width: 100%;
}

.type_msg {border-top: 1px solid #c4c4c4;position: relative;}
.msg_send_btn {
  background: #00c300 none repeat scroll 0 0;
  border: medium none;
  border-radius: 20%;
  color: #fff;
  cursor: pointer;
  font-size: 17px;
  height: 30px;
  position: absolute;
  right: 0;
  top: 11px;
  width: 40px;
}
.messaging { padding: 0 0 50px 0;}
.msg_history {
  height: 516px;
  overflow-y: auto;
}
</style>