<template>
    <div>
        <v-form
            @submit.prevent="submit"
            lazy-validation
        >

            <v-text-field
                v-model="form.name"
                label="Category Name"
                required
                type="text"
            ></v-text-field>

            <div v-if="isEditMode">
                <v-btn
                    color="pink"
                    class="mr-4"
                    type="submit"
                >
                    Update
                </v-btn>
                <v-btn
                    color="teal"
                    class="mr-4"
                    @click="cancelEdit"
                >
                    Cancel
                </v-btn>
            </div>
            <v-btn
                color="success"
                class="mr-4"
                type="submit"
                v-else
            >
                Create
            </v-btn>

        </v-form>

        <v-card
            max-width="800"
            class="mx-auto mt-10"
        >
            <v-toolbar
                color="indigo"
                dark
            >
                <v-toolbar-title>Categories</v-toolbar-title>

            </v-toolbar>
            <v-list>
                <v-list-item
                    v-for="(item, index) in categories"
                    :key="item.id"
                >
                    <v-list-item-icon>
                        <v-btn @click="edit(index, item.slug)">
                            <v-icon color="success">mdi-pencil</v-icon>
                        </v-btn>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title v-text="item.name"></v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-icon>
                        <v-btn @click="destroy(item.slug)">
                            <v-icon color="red">mdi-trash-can</v-icon>
                        </v-btn>
                    </v-list-item-icon>
                </v-list-item>
            </v-list>
        </v-card>
    </div>

</template>

<script>
    export default{
        data(){
            return {
                form : {
                    name:null,
                },
                categories:{},
                isEditMode:false,
                editSlug:'',
            }
        },
        methods:{
            submit(){
                this.isEditMode ? this.update() : this.create()
            },
            create(){
                axios.post('/api/category', this.form)
                    .then(res => {
                        this.form.name = ''
                        this.fetchCategory()
                    })
                    .catch(error => {
                        this.errors = error.response.data.errors
                    });
            },
            update(){
                axios.patch(`/api/category/${this.editSlug}`, this.form)
                    .then(res => {
                        this.form.name = ''
                        this.fetchCategory()
                    })
                    .catch(error => {
                        this.errors = error.response.data.errors
                    });
            },
            cancelEdit(){
                this.isEditMode = false
                this.form.name = ''
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
            destroy(slug){
                let endpoint = `/api/category/${slug}`
                axios.delete(endpoint)
                    .then(res => {
                        this.fetchCategory()
                    })
                    .catch(error => {
                        console.log(error.response.data)
                    })
            },
            edit(index, slug) {
                this.form.name = this.categories[index].name
                this.isEditMode = true
                this.editSlug = slug
                this.checkField()
            },

        },
        created(){
            if( !User.isAdmin() ){
                this.$router.push({name : 'forum'})
            }

            this.fetchCategory()
        }
    }
</script>

<style>

</style>
