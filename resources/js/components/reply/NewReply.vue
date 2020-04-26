<template>
    <div>
        <v-form
            @submit.prevent="submit"
            lazy-validation
        >

            <vue-simplemde v-model="form.body"/>

            <v-btn
                color="success"
                class="mr-4"
                type="submit"
            >
                Reply
            </v-btn>

        </v-form>

    </div>
</template>

<script>
    export default{
        props:['data'],

        data(){
            return {
                form:{
                    body: null,
                }
            }
        },
        methods:{
            submit(){
                let endpoint = `/api/question/${this.data.slug}/reply`
                axios.post(endpoint, this.form)
                    .then(res => {
                        this.form.body = ''
                        EventBus.$emit('AddReply')
                    })
                    .catch(error => {
                        this.errors = error.response.data.error
                    })
            }
        },
        created(){

        }
    }
</script>

<style>

</style>
