<template>
  <div class="bg">
    <div class="loginForm">
      <form @submit.prevent="register()">
        <h1>Registration</h1>
        <label>Username</label>
        <input type="text" v-model="username" placeholder="username" />

        <label>Email</label>
        <input type="email" v-model="email" placeholder="email" />

        <label>Password</label>
        <input type="password" v-model="password" placeholder="password" />

        <label>Confirm password</label>
        <input type="confirm_password" v-model="confirm_password" placeholder="confirm_password" />

        <button type="submit" class="btn btn-primary">Sign Up</button>
      </form>
    </div>

    <!-- <p>{{ users }}</p> -->
  </div>
</template>

<script>
import axios from "axios";
// import Password from 'primevue/password';

export default {
  name: "RegisterView",
  components: {},
  data() {
    return {
      users: [],
      username: "",
      email: "",
      password: "",
      confirm_password: "",
      createdAt: ""
    };
  },
  // async created() {
  //   const response = await axios.get("/api/login");
  //   const users = response.data;
  //   this.users = users;
  // },
  methods: {

    async register() {
      const response = await axios.post("/api/register", {
        users: this.user,
        username: this.username,
        email: this.email,
        password: this.password,
        confirm_password: this.confirm_password,
        createdAt: this.createdAt,
      });

      console.log(response);
      if(response.status==201){
        alert(response.data);
        this.$router.push("/login");
      }else{
        alert(response.data);
      }

    },
  },
};
</script>

<style scoped>
.bg {
  background-color: #016a70;
  background-image: url("@/assets/Images/City.jpg");
  background-size: cover;
  /* filter:brightness(70%); */
  margin: auto;
  display: flex;
  align-items: center;
  width: 100vw;
  height: 100vh;
}
.btn {
  background-color: #016a70;
  border-color: #016a70;
  color: #ffffdd;
  --bs-btn-line-height: 1.3;
  margin: 5%;
}

.btn:hover {
  background-color: #ffffdd;
  color: #016a70;
}
.loginForm {
  width: 50%;
  height: 500px;
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
label {
  display: block;
  margin-left: 0;
  text-align: left;
  margin-top: 20px;
  /* font-weight: 600; */
}
input {
  display: block;
  margin: 3% auto;
  width: 100%;
}
p {
  display: block;
}
h1 {
  font-family: rabikiso;
}
</style>
