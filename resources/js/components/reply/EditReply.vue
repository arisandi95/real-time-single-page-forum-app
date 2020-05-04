<template>
    <div>
        <vue-simplemde v-model="form.body"/>

        <v-btn class="ma-2" tile outlined color="success" @click="update">
            <v-icon left>mdi-check</v-icon> Save Changes
        </v-btn>

        <v-btn class="ma-2" tile outlined color="red" @click="cancelEdit">
            <v-icon left>mdi-window-close</v-icon> Batal
        </v-btn>
    </div>
</template>

<script>
    export default{
        props:['data', 'question'],

        data(){
            return {
                form:{
                    body: null,
                }
            }
        },
        methods:{
            cancelEdit(){
                EventBus.$emit('CancelUpdate')
            },
            update(){
                let endpoint = `/api/question/${this.question.slug}/reply/${this.data.id}`
                axios.patch(endpoint, this.form)
                    .then(res => {
                        EventBus.$emit('SubmitUpdate')
                    })
                    .catch(error => {
                        console.log(error.response.data)
                    })
            },
        },
        mounted(){
            this.form.body = this.data.reply
        }
    }
</script>

<style>

</style>
