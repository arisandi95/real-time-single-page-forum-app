<template>
    <div>
        <v-img
            src="https://cdn.vuetifyjs.com/images/lists/ali.png"
            height="300px"
            dark
        >
            <v-row class="fill-height">

                <v-card-title class="white--text pl-12 pt-12">
                    <div class="display-1 pl-12 pt-12">Category</div>
                </v-card-title>
            </v-row>
        </v-img>

        <v-list v-for="item in categories"
                :key="item.id"
                @click="">
            <v-list-item>
                <v-list-item-icon>
                    <v-icon color="black">mdi-star</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title v-text="item.name"></v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </div>
</template>

<script>
    export default{
        data(){
            return {
                categories:{},
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
        },
        created(){
            this.fetchCategory()
        }
    }
</script>

<style>

</style>
