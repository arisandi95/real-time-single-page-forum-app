<template>
    <div>
        <div v-if="question">
            <div v-if="editing">
                <edit-question :data="question"></edit-question>
            </div>
            <div v-else>
                <show-question :data="question" ></show-question>
            </div>

            <new-reply :data="question"></new-reply>
            <replies :question="question" v-if="question.replies"></replies>
        </div>


    </div>
</template>

<script>
    import ShowQuestion from './ShowQuestion'
    import EditQuestion from './EditQuestion'
    import Replies from '../reply/Replies'
    import NewReply from '../reply/NewReply'

    export default{
        components: {ShowQuestion, EditQuestion, Replies, NewReply},
        data(){
            return {
                question:null,
                editing:false
            }
        },
        methods:{
            fetchQuestion(){
                let endpoint = `/api/question/${this.$route.params.slug}`
                axios.get(endpoint)
                    .then(res => {
                        this.question = res.data.data
                    })
                    .catch(error => {
                        console.log(error.response.data)
                    })
            },

            listen(){
                EventBus.$on('startEditing', () => {
                    this.editing = true
                }),

                EventBus.$on('cancelEditing', () => {
                    this.editing = false
                })

            }
        },
        created(){
            this.fetchQuestion()
            this.listen()
        }
    }
</script>

<style>

</style>
