<template>
    <v-form
        @submit.prevent="login"
        lazy-validation
    >

        <v-text-field
            v-model="form.email"
            label="E-mail"
            required
            type="email"
        ></v-text-field>

        <v-text-field
            v-model="form.password"
            label="Password"
            required
            type="password"
        ></v-text-field>

        <v-btn
            color="success"
            class="mr-4"
            type="submit"
        >
            Login
        </v-btn>

        <router-link to="/signup">
            <v-btn>Signup</v-btn>
        </router-link>

    </v-form>
</template>

<script>
    export default{
        data(){
            return {
                form : {
                    email:null,
                    password:null
                }
            }
        },
        methods:{
            login(){
                User.login(this.form)
                this.$router.push({name : 'forum'})
            }
        }
    }
</script>

<style>

</style>
