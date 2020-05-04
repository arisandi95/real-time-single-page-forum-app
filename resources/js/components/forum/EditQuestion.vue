<template>
    <v-form
        @submit.prevent=""
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
            v-model="defaultSelected"
            label="Category"
            @change="selectCategory"
            autocomplete
        ></v-select>

        <vue-simplemde v-model="form.body"/>


        <v-btn class="ma-2" tile outlined color="success" @click="edit">
            <v-icon left>mdi-check</v-icon> Save Changes
        </v-btn>

        <v-btn class="ma-2" tile outlined color="red" @click="cancel">
            <v-icon left>mdi-window-close</v-icon> Batal
        </v-btn>

    </v-form>
</template>

<script>
    export default{
        props: ['data'],
        data(){
            return {
                defaultSelected: {id:null},
                own:null,
                form:{},
                categories:{},
            }
        },
        methods:{
            edit(){
                let endpoint = `/api/question/${this.data.slug}`
                axios.patch(endpoint, this.form)
                    .then(res => {
                        this.cancel()
                    })
                    .catch(error => {
                        console.log(error.response.data)
                    })
            },

            cancel(){
                EventBus.$emit('cancelEditing')
            },

            selectCategory(){
                this.form.category_id = this.defaultSelected
            },

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
        },
        created(){
            this.fetchCategory()
            this.own = User.own(this.data.user_id)
            this.form = this.data
            this.defaultSelected.id = this.form.category_id
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
