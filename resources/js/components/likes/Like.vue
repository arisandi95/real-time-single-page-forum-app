<template>
  <div>
      <v-btn icon>
          <v-icon :color="color" @click="likedIt">mdi-heart</v-icon> {{counter}}
      </v-btn>
  </div>
</template>

<script>


    export default{
        props:['component'],
        components: {},
        data(){
            return {
                counter: this.component.like_count,
                isLiked: this.component.liked,
            }
        },
        methods:{
            likedIt(){
                this.isLiked ? this.decr() : this.incr()
                this.isLiked = !this.isLiked
            },

            incr(){
                let endpoint = `/api/like/${this.component.id}`
                axios.post(endpoint)
                    .then(res => {
                        this.counter++
                    })
                    .catch(error => {
                        console.log(error.response.data)
                    })
            },

            decr(){
                let endpoint = `/api/like/${this.component.id}`
                axios.delete(endpoint)
                    .then(res => {
                        this.counter--
                    })
                    .catch(error => {
                        console.log(error.response.data)
                    })
            }

        },
        created(){
            Echo.channel('likeChannel')
                .listen('LikeEvent', (e) => {
                    if (this.component.id == e.id) {
                        (e.type == 1) ? this.counter++ : this.counter--
                    }
                });
        },
        computed:{
            color(){
                return this.isLiked ? 'red' : 'red lighten-4'
            }
        }
    }
</script>

<style>

</style>
