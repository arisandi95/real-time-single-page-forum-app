<template>
    <div>
        <toolbar></toolbar>
        <v-container grid-list-md>
            <router-view></router-view>

            <div style="margin-bottom: 10%"></div>
        </v-container>

        <app-footer></app-footer>
    </div>
</template>

<script>
    import toolbar from './Toolbar'
    import AppFooter from './AppFooter'

    export default{
        components: {toolbar, AppFooter}
    }
</script>

<style>

</style>
