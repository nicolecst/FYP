<template>
  <div class="bg">
    <NavBar />
    <h1>This is the user edit profile</h1>
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
            <div class="update-form">
              <form @submit.prevent="UpdateUser(user._id)">
                <label for="">Username</label
                ><input type="text" v-model="user.username" />

                <label for="">Email</label
                ><input type="text" v-model="user.email" />

                <label for="">Gender</label
                ><input type="text" v-model="user.gender" />

                <label for="">Age</label
                ><input type="text" v-model="user.age" />

                <label for="">Preference</label
                ><input type="text" v-model="user.preference" />

                <label for="">Type</label
                ><input type="text" v-model="user.type" />

                <p>UserID: {{ user._id }}</p>
                <p>Username: {{ user.username }}</p>
                <p>Email: {{ user.email }}</p>

                <button class="btn btn-primary profile-button" type="submit">
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { useRoute } from "vue-router";
import axios from "axios";
import NavBar from "@/components/NavBar.vue";
// import { onMounted, ref } from 'vue';

export default {
  name: "UserEdit",
  components: {
    NavBar,
  },
  methods: {
    async UpdateUser(uid) {
      const updateUserData = {
        username: this.user.username,
        email: this.user.email,
        gender: this.user.gender,
        age: this.user.age,
        preference: this.user.preference,
        type: this.user.type,
      };

      await axios
        .put("/api/users/" + uid, updateUserData)
        .then((response) => {
          console.log(response.data);
          alert("Successfully updated!");
          this.$router.push('/userProfile')
        });
    },
  },
  data() {
    return {
      user: {},
      // update_username: '',
      // update_email: '',
      // update_gender: '',
      // update_age: '',
      // update_preference: '',
      // update_type: '',
    };
  },
  mounted() {
    const t = localStorage.getItem("userID");
    console.log(t);
    axios
      .get("/api/users/" + t)
      .then((response) => {
        (this.user = response.data);
      });
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

.row {
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
input {
  display: block;
}
</style>
