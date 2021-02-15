<template>
<v-app>
  <v-card>
  <v-row>
    <v-col cols="2">
    <v-navigation-drawer
      v-model="drawer"
      permanent
    >
      <v-list-item class="px-2">

        <v-list-item-title>{{$cookies.get('user')}}</v-list-item-title>

      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
        >
          <v-list-item-icon>
          </v-list-item-icon>

          <v-list-item-content>
          <router-link to="/chat">Chat</router-link>
           <v-divider></v-divider>
            <router-link v-if="$cookies.get('user') === 'admin'" to="/userManage">User Manage</router-link>
            <v-divider v-if="$cookies.get('user') === 'admin'"></v-divider>
            <router-link v-if="$cookies.get('user') === 'admin'" to="/groupLineListDev">Group Line List</router-link>
             <v-divider v-if="$cookies.get('user') === 'admin'"></v-divider>
            <router-link v-if="$cookies.get('user') === 'admin'" to="/responsible">Responsible</router-link>
             <v-divider v-if="$cookies.get('user') === 'admin'"></v-divider>
            <router-link v-if="$cookies.get('user') === 'admin'" to="/broadcast">broadcast</router-link>
             <v-divider v-if="$cookies.get('user') === 'admin'"></v-divider>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-btn color="red" @click="logOut()">Log out</v-btn>
    </v-navigation-drawer>
    </v-col>
    <v-col cols="10">
    <router-view/>
    </v-col>
    </v-row>
  </v-card>
  </v-app>
</template>
<script>
export default {
    data() {
            return {
                mini: true,
                drawer: true
            }
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
        },
        created(){
            console.log('cookie = ', document.cookie)
        },
        methods: {
            logOut(){
                $cookies.remove('user')
                this.$router.push('/')
            }
        }
}
</script>
<style>
</style>
