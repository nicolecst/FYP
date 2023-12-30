<template>
  <div class="bg">
    <!-- <h1>Login Page</h1> -->
    <div class="loginForm">
      <form @submit.prevent="login()">
        <h1>E-Trip</h1>
        <label>Username</label>
        <input type="text" v-model="username" placeholder="username" />

        <label>Password</label>
        <input type="password" v-model="password" placeholder="password" />

        <button type="submit" class="btn">Login</button>
        <p>
        Don't have an account yet?
        <router-link to="/register">Register</router-link>
      </p>
      </form>
    </div>

    <!-- <p>{{ users }}</p> -->
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
      username: "",
      password: "",
    };
  },
  //   async created() {
  //     const response = await axios.get("/api/login");
  //     const users = response.data;
  //     this.users = users;
  //   },
  methods: {
    async login() {
      var response = await axios
        .post("/api/login", {
          users: this.user,
          username: this.username,
          password: this.password,
        })
        .then(function (response) {
          var data = response;
          alert(JSON.stringify(data));
          alert("login Successfully.");
          location.assign("/");
        })
        .catch(function (error) {
          alert(error.response.statusText);
          console.log(error.response.statusText);
        });
      console.log(response);

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
    },
  },
};
</script>

<style scoped>
.bg {
  background-color: #016a70;
  background-image: url('@/assets/Images/City.jpg');
  background-size: cover;
  /* filter:brightness(70%); */
  margin: auto;
  display: flex;
  align-items: center;
  width: 100vw;
  height: 100vh;
}
.btn{
    background-color: #016a70;
    border-color: #016a70;
    color:#ffffdd;
    --bs-btn-line-height: 1.3;
    margin: 5%;
}

.btn:hover{
    background-color: #ffffdd;
    color: #016a70;
}
.loginForm {
  width: 50%;
  height: 400px;
  background-color: #fff;
  box-shadow: 0 0 20px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  display: flex;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  margin: auto;
  /* margin-top: 30px; */
}
label{
    display:block;
    margin-left: 0;
    text-align: left;
    margin-top: 20px;
    /* font-weight: 600; */
}
input{
    display: block;
    margin: 3% auto;
    width: 100%;
}
p{
    display: block;
}
h1{
  font-family: rabikiso;
}
</style>
