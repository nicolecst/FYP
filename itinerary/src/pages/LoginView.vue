<template>
  <div class="bg">
    <!-- <h1>Login Page</h1> -->
    <div class="loginForm">
      <form @submit.prevent="login()">
        <h1>E-Trip {{ name }}</h1>
        <label>Username</label>
        <input
          type="text"
          v-model="username"
          placeholder="username"
          name="username"
        />

        <label>Password</label>
        <input
          type="password"
          v-model="password"
          placeholder="password"
          name="password"
        />

        <button type="submit" class="btn">Login</button>
        <p>
          Don't have an account yet?
          <router-link to="/register"><span style="color: #016a70; text-decoration: underline">Register</span></router-link>
        </p>
      </form>
    </div>

    <!-- <p>{{ users }}</p> -->
  </div>
</template>

<script>
import axios from "axios";
// import { onMounted, ref } from "vue";
// import Password from 'primevue/password';
// import jwt_decode from "jwt-decode";

export default {
  name: "LoginView",
  components: {},
  setup() {},
  data() {
    return {
      users: [],
      username: "",
      password: "",
    };
  },
  methods: {
    async login() {
      const response = await axios.post("/api/login", {
        users: this.user,
        username: this.username,
        password: this.password,
      });
      console.log(response);
      if (response.status == 200) {
        var data = await response.data;
        localStorage.setItem("userToken", data.token);
        localStorage.setItem("userID", data.id);
        localStorage.setItem("preference1", data.preference1)
        localStorage.setItem("preference2", data.preference2)
        localStorage.setItem("preference3", data.preference3)

        const u = localStorage.getItem("userToken");
        const i = localStorage.getItem("userID");
        const p = localStorage.getItem("preference1");
        console.log(u)
        console.log(i)
        console.log(p)

        // alert(response.data);
        alert("Successful Login");
        this.$router.push("/");
      } else {
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
