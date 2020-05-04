<template>
   <div>
       <v-menu
           transition="slide-y-transition"
           bottom
       >
           <template v-slot:activator="{ on }">
               <v-badge
                   :content="unreadTotal"
                   :value="unreadTotal"
                   :color="color"
                   overlap
                   bordered
               >
                   <v-btn icon v-on="on">
                       <v-icon>mdi-bell</v-icon>
                   </v-btn>

               </v-badge>
           </template>
           <v-list subheader>
               <v-subheader>New</v-subheader>
               <v-list-item v-for="item in unread"
                            :key="item.data.question">
                   <v-list-item-content>
                       <router-link :to="item.data.path">
                           <v-list-item-title @click="readIt(item.id)"
                                              v-text="item.data.question"></v-list-item-title>
                       </router-link>
                   </v-list-item-content>
               </v-list-item>

           </v-list>
           <v-list subheader>
               <v-subheader>Read</v-subheader>
               <v-list-item v-for="item in read"
                            :key="item.data.question"
                            @click="">
                   <v-list-item-content>
                       <v-list-item-title v-text="item.data.question"></v-list-item-title>
                   </v-list-item-content>
               </v-list-item>
           </v-list>
       </v-menu>

   </div>
</template>

<script>
    export default{
        created(){
            if(User.loggedIn()){
                this.getNotification()
            }
        },
        computed: {
          color(){
              return (this.unreadTotal < 2) ? "red" : "green"
          }
        },
        data(){
            return {
                read:{},
                unread:{},
                unreadTotal: 0,
            }
        },
        methods:{
            getNotification(){
                let endpoint = '/api/notifications'
                axios.post(endpoint)
                    .then(res => {
                        this.read = res.data.read
                        this.unread = res.data.unread

                        this.unreadTotal = (typeof res.data.unread.length === 'undefined') ? 0 : res.data.unread.length
                    })
                    .catch(error => {
                        console.log(error.response.data)
                    })
            },
            readIt(notificationId){
                let endpoint = '/api/markAsRead'
                axios.post(endpoint, {'id' : notificationId})
                    .then(res => {
                        this.getNotification()
                    })
                    .catch(error => {
                        console.log(error.response.data)
                    })
            }
        },
    }
</script>

<style>

</style>
