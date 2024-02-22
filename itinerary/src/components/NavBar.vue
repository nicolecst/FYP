<template>
  <div>
    <!-- <nav class="navbar navbar-light bg-light">
      <a class="navbar-brand" href="#">Navbar</a>
      <a href="">home</a>
    </nav> -->
    <nav class="navbar nb navbar-light align-items-center">
      <div class="justify-content-left">
        <ul class="nav gap-1">
          <li class="nav-item">
            <img src="@/assets/Images/icon2.png" alt="" class="icon">
            <!-- <a v-if="user.is_Admin === false" class="navbar-brand" href="/"
              >E-trip</a
            >
            <a v-if="user.is_Admin === true" class="navbar-brand" href="/admin"
              >E-trip</a
            > -->
          </li>
          <li>
            <a class="nav-link">
              <span style="font-size: 1.5em; color: #ffffff">
                <font-awesome-icon icon="fa-solid fa-house" />
              </span>
              home
            </a>
          </li>
          <li>
            <a class="nav-link" href="/propose">
              <span style="font-size: 1.5em; color: #ffffff">
                <font-awesome-icon icon="fa-solid fa-lightbulb" />
              </span>
              Propose Activity
            </a>
          </li>
        </ul>
      </div>

      <div class="justify-content-right">
        <ul class="nav gap-1">
          <li>
            <a class="nav-link" href="/userProfile">
              <span style="font-size: 1.5em; color: #ffffff">
                <font-awesome-icon icon="fa-solid fa-circle-user" /> </span
            ></a>
          </li>
          <li>
            <button class="nav-link" @click="logOut()">
              <span style="font-size: 1.5em; color: #ffffff">
                <font-awesome-icon
                  icon="fa-solid fa-right-from-bracket"
                /> </span
              >LogOut
            </button>
          </li>

          <!-- <button @click="userProfile()" class="btn btn-sm">user</button> -->
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "NavBar",
  components: {},
  data() {
    return {
      user: {},
    };
  },
  methods: {},
  mounted() {
    const i = localStorage.getItem("userID");
    console.log(i);
    axios
      .get("/api/users/" + i)
      .then((response) => (this.user = response.data));
  },
  setup() {
    let token = localStorage.getItem("userID");

    const logOut = function () {
      localStorage.removeItem("userID");
      console.log(token);
      location.assign("/login");
    };

    const userProfile = async function () {
      location.assign("/userProfile");
    };

    return {
      userProfile,
      token,
      logOut,
    };
  },
};
</script>

<style scoped>
a {
  color: #ffffdd;
}

.btn {
  color: #ffffff;
  border-color: #ffffdd;
  height: 2.5em;
  /* margin: 5px; */
}
.btn:hover {
  background-color: #ffffff;
  color: #016a70;
  height: 2.5em;
}

.nb {
  background-color: #0C3B2E;
  color: #ffffff;
  /* display: flex; */
  /* align-items: center; */
}

.navbar {
  padding: 10px;
}

.navbar-brand {
  font-family: AchivoBlack;
  color: #ffffff;
  font-size: 2em;
}

.nav-link {
  color: #ffffff;
  padding-top: 20px;
  padding-bottom: 20px;
}

.nav-item {
  align-content: center;
}

.form-horizontal {
  border-radius: 6px;
  margin: 5px;
}
.icon{
  width: 70px;
  height: 70px;
}
</style>
