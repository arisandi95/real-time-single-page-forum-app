import Token from './token'
import AppStorage from './app-storage'

class User {
    login(data){
        axios.post('/api/auth/login', data)
            .then(res => {
                this.responseAfterLogin(res)
            })
            .catch(error => {
                console.log(error.response)
            });
    }

    responseAfterLogin(res){
        const access_token = res.data.access_token
        const username = res.data.user
        if ( Token.isValid(access_token) ) {
            AppStorage.store(username, access_token)
            window.location = '/forum'
        }
    }

    hasToken(){
        const storedToken = AppStorage.getToken()
        if ( storedToken ) {
            return Token.isValid(storedToken) ? true : false
        }
        return false
    }

    loggedIn(){
        return this.hasToken()
    }

    logout(){
        AppStorage.clear()
        window.location = '/forum'
    }

    user(){
        if(this.loggedIn()){
            return AppStorage.getUser()
        }
        return false
    }

    id(){
        if(this.loggedIn()){
            const payload = Token.payload( AppStorage.getToken() )
            return payload.sub
        }
        return false
    }

    own(id){
        return this.id() == id
    }

    isAdmin(){
        return this.id() == 11 //DUMMY
    }
}

export default User = new User();
