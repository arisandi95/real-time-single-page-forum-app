<template>
    <div>
        <v-app-bar
            dark
            prominent
            src="https://picsum.photos/1920/1080?random"
        >
            <template v-slot:img="{ props }">
                <v-img
                    v-bind="props"
                    gradient="to top right, rgba(120, 2 ,6 ,.7), rgba(6, 17, 97,.7)"
                ></v-img>
            </template>

            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

            <v-toolbar-title>Sands Forum</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn icon>
                <v-icon>mdi-magnify</v-icon>
            </v-btn>

            <v-btn icon>
                <v-icon>mdi-filter</v-icon>
            </v-btn>

            <v-btn icon>
                <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>

            <app-notification v-if="isLoggedIn"></app-notification>
        </v-app-bar>

        <v-navigation-drawer
            v-model="drawer"
            absolute
            bottom
            temporary
        >
            <v-list-item>
                <v-list-item-avatar>
                    <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                    <v-list-item-title> {{nameLogin}} </v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <v-list
                dense
                rounded
            >
                <div v-for="item in items" :key="item.title" v-if="item.show">
                    <v-list-item link>
                        <v-list-item-icon>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-icon>

                        <router-link :to="item.link">
                            <v-list-item-content>
                                <v-list-item-title>{{ item.title }}</v-list-item-title>
                            </v-list-item-content>
                        </router-link>
                    </v-list-item>
                </div>

            </v-list>


            <div class="pa-10" v-show="logoutBtn">
                <router-link to="/logout">
                    <v-btn block>Logout</v-btn>
                </router-link>
            </div>

        </v-navigation-drawer>
    </div>
</template>

<script>
    import AppNotification from './AppNotification'
    export default{
        components:{AppNotification},
        data: () => ({
            isLoggedIn : User.loggedIn(),
            logoutBtn : User.loggedIn(),
            nameLogin : User.user(),
            drawer: false,
            group: null,
            items: [
                { title: 'Forum', icon: 'mdi-forum' , link:'/forum', show: true},
                { title: 'Ask Question', icon: 'mdi-face-agent' , link:'/ask', show: User.loggedIn()},
                { title: 'Category', icon: 'mdi-file-table-box-multiple', link:'/category', show: User.isAdmin() },
                { title: 'Login', icon: 'mdi-login' , link:'/login', show: !User.loggedIn()},
            ],
        }),
        created() {
            EventBus.$on('logout', () => {
                User.logout()
            })
        },
        watch: {
            group () {
                this.drawer = false
            }
        },
    }
</script>

<style>

</style>
