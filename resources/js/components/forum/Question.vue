<template>
    <v-card shaped class="mb-5">
        <v-card-title class="pb-3">
            <router-link :to="data.path">
                {{ data.title }}
            </router-link>
        </v-card-title>
        <v-card-subtitle class="pb-6">
            {{ data.user }} said {{ data.created_at }}
        </v-card-subtitle>

        <v-card-text class="text--primary">
            <div>{{data.body}}</div>
        </v-card-text>

    </v-card>
</template>

<script>
    export default{
        props:['data'],
        data(){
            return {

            }
        },
        methods:{

        }
    }
</script>

<style>

</style>
