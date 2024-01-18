<template>
  <div>
    <!-- <nav class="navbar navbar-light bg-light">
      <a class="navbar-brand" href="#">Navbar</a>
      <a href="">home</a>
    </nav> -->
    <nav class="navbar nb navbar-light">
      <div class="justify-content-left">
        <ul class="nav gap-1">
          <li class="nav-item">
            <a class="navbar-brand" href="/">E-trip</a>
          </li>
          <a class="nav-link">
            <span style="font-size: 1.5em; color: #ffffdd">
              <font-awesome-icon icon="fa-solid fa-house" />
            </span>
            home
          </a>
        </ul>
      </div>

      <div class="justify-content-right">
        <ul class="nav gap-1">
          <li class="nav-item">
            <div class="search-container">
              <form action="">
                <input type="text" placeholder="Search.." name="search" />
                <button type="submit"><font-awesome-icon :icon="['fas', 'magnifying-glass']" /></button>
              </form>
            </div>
            <!-- <input
              class="form-horizontal mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              class="btn btn-outline-success btn-sm my-2 my-sm-0"
              type="submit"
            >
              Search
            </button> -->
          </li>
          <li>
            <a class="nav-link" href="/userProfile">
              <span style="font-size: 1.5em; color: #ffffdd">
                <font-awesome-icon icon="fa-solid fa-circle-user" /> </span
            ></a>
          </li>
          <li>
            <button class="nav-link" @click="logOut()">
              <span style="font-size: 1.5em; color: #ffffdd">
                <font-awesome-icon
                  icon="fa-solid fa-right-from-bracket"
                /> </span
              >LogOut</button
            >
          </li>

          <!-- <button @click="userProfile()" class="btn btn-sm">user</button> -->
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  components: {},
  data() {},
  methods: {},
  setup() {
    let token = localStorage.getItem("userID");

    const logOut = function(){
      localStorage.removeItem("userID");
      console.log(token);
      location.assign('/login');
    }

    const userProfile = async function () {
      location.assign("/userProfile");
    };


    return {
      userProfile,
      token,
      logOut
    };
  },
};
</script>

<style>
a {
  color: #ffffdd;
}

.btn {
  color: #ffffdd;
  border-color: #ffffdd;
  height: 2.5em;
  /* margin: 5px; */
}
.btn:hover {
  background-color: #ffffdd;
  color: #016a70;
  height: 2.5em;
}

.nb {
  background-color: #016a70;
  color: #ffffdd;
  /* display: flex; */
  /* align-items: center; */
}

.navbar {
  padding: 10px;
}

.navbar-brand {
  font-family: AchivoBlack;
  color: #ffffdd;
  font-size: 2em;
}

.nav-link {
  color: #ffffdd;
}

.nav-item{
  align-content: center;
}

.form-horizontal {
  border-radius: 6px;
  margin: 5px;
}

</style>
