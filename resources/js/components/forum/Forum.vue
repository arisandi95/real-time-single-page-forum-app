<template>
    <v-layout swap>
        <v-flex xs8>
            <question
                v-for="question in questions"
                :key="question.path"
                :data=question
            >
            </question>
        </v-flex>
        <v-spacer></v-spacer>
        <v-flex xs4>
            <app-side-bar></app-side-bar>
        </v-flex>
    </v-layout>
</template>

<script>
    import question from './Question'
    import AppSideBar from './AppSideBar'

    export default{
        components: {question, AppSideBar},
        data(){
            return {
                questions : {}
            }
        },
        created(){
            axios.get('/api/question')
                .then(res => {
                    this.questions = res.data.data
                })
                .catch(error => {
                    console.log(error.response.data)
                })
        },
        methods:{

        }
    }
</script>

<style>

</style>
