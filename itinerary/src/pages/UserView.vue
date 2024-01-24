<template>
  <div class="bg">
    <NavBar />
    <h1>This is the user profile</h1>
    <div class="container">
      <img class="header" src="@/assets/Images/flowers.jpg" alt="header-img" />
      <div class="row">
        <div class="col-md-5 left">
          <img
            class="circle"
            src="@/assets/Images/male.jpg"
            alt="male-user-icon"
          />
          <div class="row mt-2">
            <p>UserID: {{ user._id }}</p>
          </div>
        </div>
        <div class="col-md-5">
          <div class="right">
            <div class="row mt-2">
              <p>
                <span style="font-weight: bold">Username: </span
                >{{ user.username }}
              </p>
            </div>

            <p>
              <span style="font-weight: bold">Email: </span>{{ user.email }}
            </p>
            <p>
              <span style="font-weight: bold">Gender: </span>{{ user.gender }}
            </p>
            <p><span style="font-weight: bold">Age: </span><span v-if="!user.age">N/A</span>{{ user.age }}</p>
            <p ><span style="font-weight: bold">Preferences: </span><span v-if="!user.preference1||!user.preference2||!user.preference3">N/A</span></p>
            <p v-if="user.preference1">1st: {{ user.preference1 }}</p>
            <p v-if="user.preference2">2nd: {{ user.preference2 }}</p>
            <p v-if="user.preference3">3rd: {{ user.preference3 }}</p>
            <p><span style="font-weight: bold">Type: </span><span v-if="!user.type">N/A</span>{{ user.type }}</p>
            <p style="color:grey">*'N/A' entries can set up by clicking the button below</p>
            <a href="/userEdit"
              ><button class="btn btn-primary">Edit Profile</button></a
            >
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

<style scoped>
.bg {
  background-color: #002224;
  background-size: cover;
  margin: auto;
  align-items: center;
  width: 100vw;
  height: 100vh;
}
.btn {
  background-color: #016a70;
  border-color: #016a70;
  color: #ffffdd;
  --bs-btn-line-height: 1.3;
}

.btn:hover {
  background-color: #ffffdd;
  color: #016a70;
}

.container {
  background-color: white;
  width: 60%;
  /* min-height: 500px;
  height: 70%; */
  padding-left: 0px;
  padding-right: 0px;
  border-radius: 30px;
  padding-bottom: 10px;
  /* padding: 40px; */
}
.circle {
  /* Make the image circle*/
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  -ms-border-radius: 50%;
  -o-border-radius: 50%;
  border-radius: 50%;
}

.right {
  text-align: left;
}
.left {
  padding: 40px;
}

.header {
  width: 100%;
  height: 100px;
  object-fit: cover;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
}
img {
  width: 250px;
  height: 250px;
}
</style>
