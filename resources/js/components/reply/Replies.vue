<template>
    <v-card
        max-width="100%"
        class="mx-auto mt-10">
        <v-toolbar
            color="pink"
            dark
        >
            <v-toolbar-title>Replies</v-toolbar-title>
            <v-spacer></v-spacer>
        </v-toolbar>

        <reply v-for="reply in replies" :key="reply.id" :data="reply" :question="question"></reply>
    </v-card>

</template>

<script>
    import Reply from './Reply'

    export default{
        components: {Reply},
        props:['question'],
        data(){
            return {
                replies : {}
            }
        },
        methods:{
            fetchReplies(){
                let endpoint = `/api/question/${this.question.slug}/reply`
                axios.get(endpoint)
                    .then(res => {
                        this.replies = res.data.data
                    })
                    .catch(error => {
                        console.log(error.response.data)
                    })
            },

            listen(){
                EventBus.$on('AddReply', () => {
                    this.fetchReplies()
                })

                EventBus.$on('DeleteReply', () => {
                    this.fetchReplies()
                })

                EventBus.$on('SubmitUpdateSuccess', () => {
                    this.fetchReplies()
                })

                Echo.private('App.User.' + User.id())
                    .notification((notification) => {
                        this.fetchReplies()
                    });

                Echo.channel('deleteReplyChannel')
                    .listen('DeleteReplyEvent', (e) => {
                        for (var i = 0; i < this.replies.length; i++) {
                            if ( this.replies[i]['id'] == e.id ) {
                                this.fetchReplies()
                            }
                        }
                    });
            },

        },
        created(){
            this.replies = this.question.replies
            this.listen()
        }
    }
</script>

<style>

</style>
