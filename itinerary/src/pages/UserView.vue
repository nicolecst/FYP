<template>
  <div class="bg">
    <NavBar />
    <h1>This is the user profile</h1>
    <div class="container">
      <img class="header" src="@/assets/Images/flowers.jpg" alt="header-img" />
      <div class="row">
        <div class="col-md-5">
          <img
            class="circle"
            src="@/assets/Images/male.jpg"
            alt="male-user-icon"
          />
        </div>
        <div class="col-md-5">
          <div class="right">
            <p>UserID: {{ user._id }}</p>
            <p>Username: {{ user.username }}</p>
            <p>Email: {{ user.email }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { onMounted } from "vue";
// import { useRoute } from "vue-router";
import axios from "axios";
import NavBar from "@/components/NavBar.vue";

export default {
  name: "UserView",
  components: {
    NavBar,
  },
  data() {
    return {
      user: {},
    };
  },
  mounted() {
    const i = localStorage.getItem("userID");
    console.log(i);
    axios
      .get("/api/users/" + i)
      .then((response) => (this.user = response.data));
  },
};
</script>

<style>
.bg {
  background-color: #002224;
  background-size: cover;
  margin: auto;
  align-items: center;
  width: 100vw;
  height: 100vh;
}

.container {
  background-color: white;
  width: 60%;
  min-height: 500px;
  height: 70%;
  padding-left: 0px;
  padding-right: 0px;
  border-radius: 30px;
  /* padding: 40px; */
}
img {
  width: 250px;
  height: 250px;
}
.circle {
  /* Make the image circle*/
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  -ms-border-radius: 50%;
  -o-border-radius: 50%;
  border-radius: 50%;
}

.row{
    padding: 40px;
}

.right {
  text-align: left;
}

.header {
  width: 100%;
  height: 100px;
  object-fit: cover;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
}
</style>
