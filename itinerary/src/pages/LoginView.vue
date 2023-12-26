<template>
  <div>
    <h1>Login Page</h1>
    <form @submit.prevent= "login()">
      <label>Username</label>
      <input type="text" v-model="username" placeholder="username" />

      <label>Password</label>
      <input type="text" v-model="password" placeholder="password"/>

      <button type="submit" class="btn btn-primary">Login</button>
      <button @click="register()" type="submit" class="btn btn-danger">Sign up</button>
    </form>
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
  async created() {
    const response = await axios.get("/api/login");
    const users = response.data;
    this.users = users;
  },
  methods:{
    async register(){

        const response = await axios.post("/api/register", {
            users: this.user,
            username: this.username,
            password: this.password,
        })

        console.log(response)
        this.$router.push('/login')
    }
  },
};
</script>
