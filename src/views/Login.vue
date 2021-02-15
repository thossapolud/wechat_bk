<template>
<v-app>
    <div >
        <!-- <h1>Please Login with your google account to continue</h1>
        <button @click="login">login with google</button> -->
     <v-form>
    <v-container>
    <v-row>
    <v-col cols="12" sm="6">
    <v-text-field v-model="user" label="User Name" solo-inverted ></v-text-field>
    
    </v-col>
    <v-col
    cols="12"
    sm="6">
    <v-text-field v-model="password" label="password" type="password"  solo-inverted></v-text-field>
    </v-col>
    </v-row>
    <v-col
    cols="2">
    <v-btn color="success" @click="login(user,password)">Log in</v-btn>
    </v-col>
    </v-container>
     </v-form>
     <v-snackbar v-model="userNullsnackbar" color="red">
     กรุณาใส่ user
    </v-snackbar>
    <v-snackbar v-model="passwordNullsnackbar" color="red">
     กรุณาใส่ password
    </v-snackbar>
    <v-snackbar v-model="noUsersnackbar" color="red">
     ไม่พบ User ในระบบ
    </v-snackbar>
    <v-snackbar v-model="noPasswordsnackbar" color="red">
     Password ไม่ถูกต้อง กรุณาตรวจสอบ Password อีกครั้ง
    </v-snackbar>
    <v-snackbar v-model="successsnackbar" color="success">
     Log in สำเร็จ
    </v-snackbar>
    </div>
    </v-app>
</template>

<script>
    import firebase from 'firebase'
    import VueCookies from 'vue-cookies'
    export default {
        data () {
      return {
          successsnackbar:false,
          passwordNullsnackbar:false,
          userNullsnackbar:false,
          user: null,
          password: null,
          noUsersnackbar: false,
          noPasswordsnackbar:false
      }
      },
        methods: {
            login(user,password){
                
                db.collection("userWebsite").where('user','==',user).onSnapshot((querySnapshot) => {
                    let vuser = null
                    let vpassword = null
                    let data = null
                    querySnapshot.forEach((doc) => {
                        console.log('user = ', doc.data())
                        vuser = doc.data().user
                        vpassword = doc.data().password
                        data = doc.data()
                        // noUsersnackbar = doc.data().
                    })

                    if(user === null){
                        this.userNullsnackbar = true
                    }else if(password === null){
                        this.passwordNullsnackbar = true
                    }else if(user !== vuser){
                        this.noUsersnackbar =  true
                        
                    }else if(this.user === vuser && this.password !== vpassword){
                            this.noPasswordsnackbar = true
                    }else {
                        console.log('data = ', data)
                        this.successsnackbar=true
                        this.$cookies.set('user',data.user,'permissaion',data.permissaion)
                        this.$router.push('/chat')
                    }
                })
            }
        },
        
    }
</script>

<style lang="scss" scoped>

</style>