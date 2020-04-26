<template>
    <v-form
        @submit.prevent="create"
        lazy-validation
    >
        <v-text-field
            v-model="form.title"
            label="Title"
            required
            type="text"
        ></v-text-field>

        <v-select
            :items="categories"
            item-text="name"
            item-value="id"
            v-model="form.category_id"
            label="Category"
            autocomplete
        ></v-select>

        <vue-simplemde v-model="form.body"/>

        <v-btn
            color="success"
            class="mr-4"
            type="submit"
        >
            Create
        </v-btn>

    </v-form>
</template>

<script>
    export default{
        data(){
            return {
                form:{
                    title : null,
                    body : null,
                    category_id : null
                },
                categories:{},
                errors:''
            }
        },
        methods:{
            fetchCategory(){
                let endpoint = '/api/category'
                axios.get(endpoint)
                    .then(res => {
                        this.categories = res.data.data
                    })
                    .catch(error => {
                        console.log(error.response.data)
                    })
            },

            create(){
                let endpoint = '/api/question'
                axios.post(endpoint, this.form)
                    .then(res => {
                        let path = res.data.path
                        this.$router.push(path)
                    })
                    .catch(error => {
                        this.errors = error.response.data.error
                    })
            }

        },
        created(){
            if( !User.loggedIn() ){
                this.$router.push({name : 'forum'})
            }

            this.fetchCategory()

        }
    }
</script>

<style>

</style>
