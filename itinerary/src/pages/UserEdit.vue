<template>
  <div class="bg">
    <NavBar />
    <!-- <h1>This is the user edit profile</h1> -->
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
              <p style="color:gray">UserID: {{ user._id }}</p>
            </div>
        </div>

        <div class="col-md-5">
          <div class="right">

            <div class="update-form">
              <form @submit.prevent="UpdateUser(user._id)">
                <div class="row mt-2">
                  <div class="form-group col-md-6">
                    <label for="">Username</label
                    ><input
                      type="text"
                      class="form-control"
                      v-model="user.username"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="">Email</label
                    ><input
                      type="text"
                      class="form-control"
                      v-model="user.email"
                    />
                  </div>
                </div>

                <div class="row mt-2">
                  <div class="form-group col-md-6">
                    <label for="">Gender</label
                    ><select class="form-control" v-model="user.gender">
                      <option>Male</option>
                      <option>Female</option>
                      <option>Prefer not to say</option>
                    </select>
                  </div>
                  <div class="form-group col-md-6">
                    <label for="">Age</label
                    >
                    <input
                      type="text"
                      class="form-control"
                      v-model="user.age"
                    />
                    
                  </div>
                </div>

                <div class="row mt-2">
                  <label for="">Preferences</label>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="basic-addon1"
                        >1st</span
                      >
                    </div>
                    <select
                      id="inputState"
                      class="form-control inline"
                      v-model="user.preference1"
                    >
                      <option selected>Choose a preference..</option>
                      <option>Natural Attractions</option>
                      <option>Cultural and Historical Sites</option>
                      <option>Urban Attractions</option>
                      <option>Adventure and Outdoor</option>
                      <option>Culinary and Food</option>
                      <option>Wellness and Retreats</option>
                      <option>Theme Parks</option>
                      <option>Entertainment Complexes</option>
                      <option>Shopping</option>
                    </select>
                  </div>

                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="basic-addon1"
                        >2nd</span
                      >
                    </div>
                    <select
                      id="inputState"
                      class="form-control inline"
                      v-model="user.preference2"
                    >
                      <option selected>Choose a preference..</option>
                      <option>Natural Attractions</option>
                      <option>Cultural and Historical Sites</option>
                      <option>Urban Attractions</option>
                      <option>Adventure and Outdoor</option>
                      <option>Culinary and Food</option>
                      <option>Wellness and Retreats</option>
                      <option>Theme Parks</option>
                      <option>Entertainment Complexes</option>
                      <option>Shopping</option>
                    </select>
                  </div>

                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="basic-addon1"
                        >3rd</span
                      >
                    </div>
                    <select
                      id="inputState"
                      class="form-control inline"
                      v-model="user.preference3"
                    >
                      <option selected>Choose a preference..</option>
                      <option>Natural Attractions</option>
                      <option>Cultural and Historical Sites</option>
                      <option>Urban Attractions</option>
                      <option>Adventure and Outdoor</option>
                      <option>Culinary and Food</option>
                      <option>Wellness and Retreats</option>
                      <option>Theme Parks</option>
                      <option>Entertainment Complexes</option>
                      <option>Shopping</option>
                    </select>
                  </div>
                </div>

                <div class="row mt-2">
                  <label for="">Type</label
                  ><select
                    name=""
                    id=""
                    class="form-control inline"
                    v-model="user.type"
                  >
                    <option>Solo</option>
                    <option>Couple</option>
                    <option>Friends</option>
                    <option>Family</option>
                  </select>
                </div>

                <div class="row mt-2">
                  <button class="btn btn-primary profile-button" type="submit">
                  Update!
                </button>
                </div>
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
        preference1: this.user.preference1,
        preference2: this.user.preference2,
        preference3: this.user.preference3,
        type: this.user.type,
      };

      await axios.put("/api/users/" + uid, updateUserData).then((response) => {
        console.log(response.data);
        alert("Successfully updated!");
        this.$router.push("/userProfile");
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
    axios.get("/api/users/" + t).then((response) => {
      this.user = response.data;
    });
  },
};
</script>

<style scoped>
.bg {
  background-color: #002224;
  /* background-size: cover; */
  height: 100%;
  align-items: center;
  /* width: 100vw;
  height: 100vh; */
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
  min-height: 500px;
  height: 70%;
  padding-left: 0px;
  padding-right: 0px;
  border-radius: 30px;
  margin-top: 30px;
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
.update-form {
  display: flex;
  align-content: start;
}
input {
  display: block;
}
</style>
