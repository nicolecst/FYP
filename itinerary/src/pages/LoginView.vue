<template>
  <div>
    <h1>Login Page</h1>
    <form @submit.prevent= "login()">
      <label>Username</label>
      <input type="text" v-model="username" placeholder="username" />

      <label>Password</label>
      <input type="password" v-model="password" placeholder="password"/>

      <button type="submit" class="btn btn-primary">Login</button>
    </form>
    <p>Don't have an account yet? <router-link to="/register">Register</router-link></p>
    <p>{{users}}</p>
  </div>
</template>

<script>
import axios from "axios";
// import Password from 'primevue/password';
export default {
  name: "LoginView",
  components: {},
  data() {
    return {
      users: [],
      username: '',
      password: '',
    };
  },
//   async created() {
//     const response = await axios.get("/api/login");
//     const users = response.data;
//     this.users = users;
//   },
  methods:{
    async login(){

        var response = await axios.post("/api/login", {
            users: this.user,
            username: this.username,
            password: this.password,
        }).then(function(response){
            var data = response
                alert(JSON.stringify(data))
                alert("login Successfully.")
                location.assign("/")
        }).catch(function(error){
            alert(error.response.statusText)
            console.log(error.response.statusText)
        })
        console.log(response)

        // if (response) {
        //         var data = await response
        //         alert(JSON.stringify(data))
        //         alert("login Successfully.")
        //         location.assign("/")
        //     } else {
        //         alert(response.statusText)
        //     }

        // localStorage.setItem('token', response.data.token)
        // if(response.ok){
        //     location.assign('/')
        // }
    }
  },
};
</script>

<!-- <style scoped>
body{

}
</style> -->
    
