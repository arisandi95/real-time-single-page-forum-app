<template>
    <v-card>
        <v-card-title class="pb-3">
            {{ data.title }}
            <v-spacer></v-spacer>
            <v-btn dark>{{data.reply_counter}} Replies</v-btn>
        </v-card-title>

        <v-card-subtitle class="pb-6">
            {{ data.user }} said {{ data.created_at }}
        </v-card-subtitle>

        <v-card-text class="text--primary" v-html="body"></v-card-text>

        <v-card-actions v-if=" own ">
            <v-btn class="ma-2" tile outlined color="success" @click="edit">
                <v-icon left>mdi-pencil</v-icon> Edit
            </v-btn>

            <v-btn class="ma-2" tile outlined color="red" @click="deleteQuestion">
                <v-icon left>mdi-trash-can</v-icon> Delete
            </v-btn>
        </v-card-actions>

    </v-card>
</template>

<script>
    export default{
        props: ['data'],
        data(){
            return {
                own:null,
            }
        },
        methods:{
            edit(){
                EventBus.$emit('startEditing')
            },

            deleteQuestion(){
                let endpoint = `/api/question/${this.data.slug}`
                axios.delete(endpoint)
                    .then(res => {
                        this.$router.push('/forum')
                    })
                    .catch(error => {
                        console.log(error.response.data)
                    })
            }
        },
        created(){
            this.own = User.own(this.data.user_id)
        },
        computed:{
            body(){
                return md.parse(this.data.body)
            }
        }
    }
</script>

<style>

</style>
