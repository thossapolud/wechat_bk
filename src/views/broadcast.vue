<template class="broadcast">
    <div>
    broadcast page
    <v-card flat>
    <v-card-text>
      <v-container fluid>
      <v-row>
          <v-col cols="12" sm="4" md="4">
          <v-container fluid>
    <v-combobox v-model="select" :items="dataDemo"   :search-input.sync="search" hide-selected  label="Add some tags" multiple persistent-hint small-chips>
      <template v-slot:no-data>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              No results matching "<strong>{{ search }}</strong>". Press <kbd>enter</kbd> to create a new one
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-combobox>
  </v-container>
          </v-col>
      </v-row>
      </v-container>d
    </v-card-text>
    </v-card>
    </div>
</template>

<script>
    export default {
        data: () => ({
            dataDemo:[
                1,2,3,4,5
            ],
            allGroupLine:[],
            select:[],
            search: null

        }),
        methods:{
             getAllGroupLine(){
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
                        'active': doc.data().active
                        
                      })
                  })
                   this.allGroupLine=data;
                   console.log('test alldata = ', this.allGroupLine)
                  // console.log('this.data=',data);
                 
              });
            

        
        }
        },
        created() {
            this.getAllGroupLine()
        },
        watch: {
            select () {
                this.$nextTick(() => this.select.pop())
            }
        }
    }
       
</script>

<style lang="scss" scoped>

</style>