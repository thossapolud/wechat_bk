<template>
<v-app>
    <div>
      <div class="messaging">
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
          <div class="inbox_chat">
            <!-- <div class="chat_list active_chat">
              <div class="chat_people">
                <div class="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"> </div>
                <div class="chat_ib">
                  <h5>Sunil Rajput <span class="chat_date">Dec 25</span></h5>
                  <p>Test, which is a new approach to have all solutions 
                    astrology under one roof.</p>
                </div>
              </div>
            </div> -->
          <div v-for="item in arrayReceiverlineUserId" :key="item.index" class="chat_list">
              <div v-if="item !== senderlineUserId" class="chat_people">
             
                <div class="chat_img"> <img src="https://sprofile.line-scdn.net/0hXTJ4UYz6B3tnTRET_QF5BBcdBBFEPF5pHitAFABMCUpafxMkTC5MT1EaDE4IeRUkQilOFQVFDUJrXnAdeRv7T2B9WUxeeUUoQixMmA" alt="sunil"> </div>
                <div class="chat_ib" @click="fetchLineMessagesByUser(item)">
                  <h5 >{{item}}<span class="chat_date">Dec 25</span></h5>
                  <p >Test, which is a new approach to have all solutions 
                    astrology under one roof.</p>
                    <v-btn @click="openNote(item)">Note</v-btn>
                </div>
                 
              </div>
            </div>
          </div>
        </div>
        <div class="mesgs">
          <div class="msg_history">
            <div v-for="item in messageByUser" :key="item.index" class="incoming_msg">
              <div :class="[item.lineAdId!==senderlineUserId?'sent_msg':'received_msg']">
                <div class="received_withd_msg">
                  <p>{{item.message}}</p> 
                  <br>
                  <!-- <p v-if="item.type!='out'">{{item.message}}</p>
                  <br v-if="item.type =='out'">
                  <p v-if="item.type =='out'" 
                  style="background: #00c300 none repeat scroll 0 0;
                  border-radius: 3px;
                  font-size: 14px;
                  margin: 0; color:#fff;
                  padding: 5px 10px 5px 12px;
                  width:100%;
                  float: right;
                  padding: 30px 15px 0 25px;
                  width: 60%;">{{item.message}}</p>
                  <br> -->
                  <!--<span class="time_date"> {{item.author}}</span>-->
                  <!--<span class="time_date">user line {{item.vreply_line_userID}}</span> -->
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
    <v-dialog v-model="dialogNote" max-width="500px" persistent>
    <v-container>
    <v-row>
          <v-col cols="12" >
        <v-textarea outlined label="Outlined textarea"  :value="noteMessage" v-model="noteMessage"></v-textarea>
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
    import firebase from 'firebase'
    const axios = require("axios");
    const APIURL = "http://127.0.0.1:3000";
    
    export default {
        name: 'PrivateChat',
        data() {
            return {
                snackbar:false,
                noteMessage: '',
                vlineUserId: '',
                dialogNote: false,
                message: '',
                messages: [],
                messageByUser: [],
                authUser: {},
                receiverlineUserId : '',
                arrayReceiverlineUserId :[],
                arrayReceiverlineMessage : [],
                arrayReceiverLastTime : [],
                lastReplyToken:'',
                // senderlineUserId : ''
                senderlineUserId:'U42a494c80f5dcdb13017efdf252be7e3',
                userWeb : 'admin'
            }
        },methods: {
            cancelNote(){
              this.dialogNote = false
            },
            saveNote(){
              console.log('message note =',this.noteMessage)

              db.collection('chatNote').add({
                    lineUserId : this.vlineUserId,
                   noteMessage : this.noteMessage,
                     createdAt : (new Date().toLocaleString("tr-TR", { timeZone: "UTC" }))
                }).then(()=>{
                  this.snackbar = true
                  this.dialogNote = false
                })
            },
            openNote(lineUserId){
              this.vlineUserId = lineUserId
              this.dialogNote = true
              console.log('Note == ',lineUserId)

              db.collection("chatNote").where('lineUserId','==',lineUserId).onSnapshot((querySnapshot) => {
                  // db.collection("chat").where('author','==',user).orderBy('createdAt').onSnapshot((querySnapshot) => {
                  let vnoteMessage=[];
                  querySnapshot.forEach((doc) => {
                      vnoteMessage.push(doc.data())
                  })
                   this.noteMessage=vnoteMessage[0].noteMessage;
                  // console.log('this.messages=',this.noteMessage);
                 
              });
            },
            scrollToBottom(){
              let box=document.querySelector('.msg_history');
              box.scrollTop=box.scrollHeight;
            },
            saveMessage(){ //ส่งข้อมูลไปยัง firebase
                //save to firestore
                db.collection('chat').add({
                    message:this.message,
                    author:this.authUser.displayName,
                    createdAt: new Date()
                }).then(()=>{
                  this.scrollToBottom();
                })
                // console.log('test = ', this.message)
                this.message = null

                setTimeout(()=>{
                  this.scrollToBottom();
                },1000);
            },
            sendMessage(){
              axios.post(APIURL+'/reply',{  // ตอบกลับไปยังไลน์
                                            "reply_token" : '',
                                            "message" : this.message,
                                            "lineUserId" : this.receiverlineUserId,
                                            "typeMessage" : 'text',
                                            "vmod" : 'active',
                                            "lineAdId" : this.senderlineUserId,
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
            fetchLineUserIdRecent(){ //ดึงข้อมูลโปรไฟล์ User
                let dataRowline = []
                let groupLine = []
                let recent = []
                let profile = []
             db.collection("responsible").where('user','==',this.userWeb).onSnapshot((querySnapshot)=>{ //Check การผูก User และ Group
                querySnapshot.forEach((doc)=>{   
                  this.arrayReceiverlineUserId.push(doc.data())
                })
                 for (let index = 0; index < this.arrayReceiverlineUserId.length; index++) {
                   let groupLine_UserId
                  //  console.log('arrayReceiverlineUserId= ', this.arrayReceiverlineUserId[index].groupLine_UserId)
                  // groupLine_UserId = this.arrayReceiverlineUserId[index].groupLine_UserId
                  // db.collection('groupLine').where('groupLine_LineId','=',groupLine_UserId).onSnapshot((querySnapshot)=>{
                  //   this.arrayReceiverlineUserId[index].push({groupLine : doc.data()})
                  // })
                }
                })
                console.log('test ==', this.arrayReceiverlineUserId)

             
                  // console.log('responsible = ',dataRowline.length)
              //     for (let index = 0; index < dataRowline.length; index++) {
              //     // const element = dataGroupline[index]
              //     groupLine.push(dataRowline[index])

              // db.collection("memberLineGroup").where('lineAdId','==',dataRowline[index].groupLine_UserId).onSnapshot((querySnapshot)=>{
              //       let data=[];
              //       querySnapshot.forEach((doc)=>{   
              //       recent.push(doc.data())
              //   })
              //   })
              //   }
                //  console.log('test log = ',recent)
              
                
                

                /////////// Get Profile

                     // db.collection('groupLine').where('groupLine_LineId','=',Recent.lineAdId).onSnapshot((querySnapshot)=>{
                //     let data=[];
                //     querySnapshot.forEach((doc)=>{   
                //     Recent.push(doc.data())
                // })
                // })
                

                // this.arrayReceiverlineUserId = Recent
                // console.log('arrayReceiverlineUserId = ', this.arrayReceiverlineUserId)              
            },
            fetchLineMessagesByUser(lineUserId){
              this.receiverlineUserId = lineUserId
              // console.log('test line user id = ', this.receiverlineUserId);
              db.collection("lineMessage").where('lineUserId','==',lineUserId).orderBy('createdAt').onSnapshot((querySnapshot)=>{
                let Msg = [];
                querySnapshot.forEach((doc) => {
                      Msg.push(doc.data())
                  })
                  this.messageByUser=Msg
              })
              console.log('test data ',this.messageByUser)
              // console.log('test data ',this.messageByUser.sort())
            }
        },
        
        created() {
          firebase.auth().onAuthStateChanged(user=>{
            if(user){
              this.authUser=user;
            }else{
              this.authUser={}
            }
          }
          )
          this.fetchLineMessages();
          this.fetchLineUserIdRecent();
            // this.fetchMessages();
        },
        beforeRouteEnter (to, from, next) {
          next(vm=>{

            firebase.auth().onAuthStateChanged(user=>{

              if(user){
                next();
              }else{
                vm.$router.push('/login')
              }
            })
          })
        }
    }
</script>

<style lang="scss" scoped>
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
  padding: 0 0 0 10px;
  vertical-align: top;
  width: 92%;
 }
 .received_withd_msg p {
  background: #585858 none repeat scroll 0 0;
  border-radius: 3px;
  color: #ffffff;
  font-size: 14px;
  margin: 0;
  padding: 5px 10px 5px 12px;
  width: 100%;
}
.time_date {
  color: #747474;
  display: block;
  font-size: 12px;
  margin: 8px 0 0;
}
.received_withd_msg { width: 57%;}
.mesgs {
  float: left;
  padding: 30px 15px 0 25px;
  width: 60%;
}

 .sent_msg p {
  background: #00c300 none repeat scroll 0 0;
  border-radius: 3px;
  font-size: 14px;
  margin: 0; color:#fff;
  padding: 5px 10px 5px 12px;
  width:100%;
}
.outgoing_msg{ overflow:hidden; margin:26px 0 26px;}
.sent_msg {
  float: right;
  padding: 30px 15px 0 25px;
  width: 60%;
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