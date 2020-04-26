<template>
    <v-list three-line>
        <v-list-item-group>
            <v-list-item>
                <template>
                    <v-list-item-content>
                        <v-list-item-title v-text="reply.user"></v-list-item-title>
                        <v-list-item-subtitle class="text--primary" v-text="reply.created_at"></v-list-item-subtitle>

                        <v-list-item-subtitle v-if="!isEditing" v-html="replyParse"></v-list-item-subtitle>
                        <edit-reply v-else :data="data" :question="question"></edit-reply>
                    </v-list-item-content>

                    <!--<v-list-item-action>-->
                        <!--<v-list-item-action-text v-text="reply.created_at"></v-list-item-action-text>-->
                    <!--</v-list-item-action>-->
                    <div v-if="isOwn && !isEditing">
                        <v-list-item-icon>
                            <v-btn @click="editReply">
                                <v-icon color="teal">mdi-pencil</v-icon>
                            </v-btn>
                            <v-btn class="ml-1" @click="deleteReply">
                                <v-icon color="red">mdi-trash-can</v-icon>
                            </v-btn>
                        </v-list-item-icon>
                    </div>

                </template>
            </v-list-item>

            <v-divider></v-divider>
        </v-list-item-group>
    </v-list>
</template>

<script>
    import EditReply from './EditReply'

    export default{
        components:{EditReply},
        props:['data', 'question'],
        data(){
            return {
                isEditing:false,
                reply : null,
                isOwn: false,
            }
        },
        methods:{
            checkOwn(){
                this.isOwn = User.own(this.reply.user_id)
            },
            deleteReply(){
                let endpoint = `/api/question/${this.question.slug}/reply/${this.data.id}`
                axios.delete(endpoint)
                    .then(res => {
                        EventBus.$emit('DeleteReply')
                    })
                    .catch(error => {
                        console.log(error.response.data)
                    })
            },
            editReply(){
                this.isEditing = true
            },
            listen(){
                EventBus.$on('CancelUpdate', () => {
                    this.isEditing = false
                })

                EventBus.$on('SubmitUpdate', () => {
                    EventBus.$emit('SubmitUpdateSuccess')
                    this.isEditing = false
                })
            }
        },
        created(){
            this.reply = this.data
            this.checkOwn()
            this.listen()
        },
        computed:{
            replyParse(){
                return md.parse(this.data.reply)
            }
        }
    }
</script>

<style>

</style>
