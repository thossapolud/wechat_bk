<template>
    <div class="selectGroupLine">
        Select Group Line Page
        <div>
        <v-container fluid>
            <v-row justify="center">
                <v-subheader>Select Group</v-subheader>
                 <v-expansion-panels popout>
                    <v-expansion-panel v-for="(lineGroup, i) in allGroupLine" :key="i" hide-actions>
                         <v-col cols="4" sm="2" md="1">
                            <v-btn>Chat</v-btn>
                        </v-col>
                    <v-expansion-panel-header>
                        
                        <v-row align="center" class="spacer" no-gutters>
                        <v-col cols="4" sm="2" md="1">
                        </v-col>
                        
                        <v-col class="hidden-xs-only" sm="5" md="3">
                            <strong v-html="lineGroup.groupline_name"></strong>
                            <!-- <span v-if="message.total" class="grey--text">
                            </span> -->
                        </v-col>
                        <v-col class="text-no-wrap" cols="5" sm="3">

                            <strong v-html="lineGroup.groupline_lineid"></strong>
                        </v-col>
              <!-- <v-col v-if="message.excerpt" class="grey--text text-truncate hidden-sm-and-down" >
                &mdash;
                {{ message.excerpt }}
              </v-col> -->
            </v-row>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-divider></v-divider>
            <v-card-text >จำนวนสมาชิค</v-card-text>
          </v-expansion-panel-content>
         
        </v-expansion-panel>
        
      </v-expansion-panels>
    </v-row>
  </v-container>
        </div>
    </div>
</template>

<script>
const axios = require("axios");
const APIURL = "http://127.0.0.1:3000";

    export default {
        data() {
            return {
                allGroupLine:[]
                }
        },
        methods:{
             getAllGroupLine(){
                 axios.get(APIURL+'/getAllGroupLine').then((response)=>{
                        this.allGroupLine=response.data
                    console.log('testtest',this.allGroupLine)
              })
            }
        },
        created(){
            this.getAllGroupLine()
        }
        
    }
</script>

<style lang="scss" scoped>

</style>