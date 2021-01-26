<template>
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
                <div class="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"> </div>
                <div class="chat_ib" @click="fetchLineMessagesByUser(item)">
                  <h5 >{{item}}<span class="chat_date">Dec 25</span></h5>
                  <p >Test, which is a new approach to have all solutions 
                    astrology under one roof.</p>
                </div>
              </div>
            </div>
    
          </div>
        </div>

        <div class="mesgs">
          <div class="msg_history">

            <div v-for="item in messageByUser" :key="item.index" class="incoming_msg">

              <div :class="[item.vdestination!==senderlineUserId?'sent_msg':'received_msg']">
                <div class="received_withd_msg">
                  <!-- <p>{{item.message}}</p> -->
                  <br>
                  <p v-if="item.statusMessage!='send'">{{item.vreply_message}}</p>
                  <br v-if="item.statusMessage =='send'">
                  <p v-if="item.statusMessage =='send'" 
                  style="background: #00c300 none repeat scroll 0 0;
                  border-radius: 3px;
                  font-size: 14px;
                  margin: 0; color:#fff;
                  padding: 5px 10px 5px 12px;
                  width:100%;
                  float: right;
                  padding: 30px 15px 0 25px;
                  width: 60%;">{{item.vreply_message}}</p>
                  <br>
                  <!--<span class="time_date"> {{item.author}}</span>-->
                  <!--<span class="time_date">user line {{item.vreply_line_userID}}</span> -->
                </div>
              </div>
            </div>
            
          </div>
          <div class="type_msg">
            <div class="input_msg_write">
<<<<<<< Updated upstream
              <input @keyup.enter="sendMessage" v-model="message" type="text" class="write_msg" placeholder="Type a message" />
              
              <v-btn  v-if="message != ''" @click="sendMessage()" class="msg_send_btn" type="button">  <v-icon dark right >mdi-send-outline</v-icon></v-btn>
=======
              <input @keyup.enter="saveMessage" v-model="message" type="text" class="write_msg" placeholder="Type a message" />

              <button v-if="message != ''" @click="saveMessage() , getMessageLine()" class="msg_send_btn" type="button">
              <v-icon dark right>mdi-send-outline</v-icon>
              </button>
>>>>>>> Stashed changes
            </div>
          </div>
        </div>
      </div>
      
      
    </div>
    </div>
</template>

<script>
    // import axios from 'axios'
    import firebase from 'firebase'
<<<<<<< Updated upstream
    const axios = require("axios");
    const APIURL = "http://127.0.0.1:3000";
=======
    const APIURL = "http://127.0.0.1:3000";
    // const APIURL = "http://monkeycave.net/joe/PM";
    const axios = require("axios");

>>>>>>> Stashed changes
    export default {
        name: 'PrivateChat',
        data() {
            return {
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
                senderlineUserId:'U42a494c80f5dcdb13017efdf252be7e3'
            }
        },methods: {
              getMessageLine(){
              axios.post(APIURL+'/main/getdata').then((response)=>{
                console.log('test=',response.data)
              })
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
                console.log('test = ', this.message)
                this.message = null

                setTimeout(()=>{
                  this.scrollToBottom();
                },1000);
            },
            sendMessage(){
              console.log('testttttt ===',this.receiverlineUserId)
              axios.post(APIURL+'/reply',{"message" : this.message,
                                            "sendTo" : this.receiverlineUserId,
                                            "senderlineUserId" : this.senderlineUserId}).then((response)=>{
                console.log('test=',response.data)
                console.log('url',APIURL)
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
                  console.log('this.messages=',this.messages);
              });
            },
            fetchLineUserIdRecent(){
              db.collection("lineMessage").onSnapshot((querySnapshot)=>{
                let data=[];
                let varrayReceiverlineUserId = [];
                let vartest = [];
                // let reply_line_userID=[];
                querySnapshot.forEach((doc)=>{   
                    data.push(doc.data())
                    // console.log('this doc == ', doc.data())
                    varrayReceiverlineUserId.push(doc.data().vreply_line_userID)
                    
                    vartest.push({
                     vreply_line_userID: doc.data().vreply_line_userID,
                     vreply_message: doc.data().vreply_message

                     })
                    // varrayReceiverLastTime
                    
                    // reply_line_userID.push(doc.data())
                })

                this.arrayReceiverlineUserId = new Set(varrayReceiverlineUserId)
                // this.arrayReceiverlineUserId = new Set(varrayReceiverlineUserId)
                // console.log('tetst------',new Set(varrayReceiverlineUserId));
              
              })
              
            },
            fetchLineMessagesByUser(lineUserId){
              this.receiverlineUserId = lineUserId
              // console.log('test line user id = ', this.receiverlineUserId);
              db.collection("lineMessage").where('vreply_line_userID','==',lineUserId).orderBy("createdAt").onSnapshot((querySnapshot)=>{
                let Msg=[];
                querySnapshot.forEach((doc) => {
                      Msg.push(doc.data())
                  })
                  this.messageByUser=Msg
              })
              // console.log('test data ',this.messageByUser.sort())
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
<<<<<<< Updated upstream

          this.fetchLineMessages();
          this.fetchLineUserIdRecent();
            // this.fetchMessages();
=======
            this.fetchMessages();
>>>>>>> Stashed changes
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