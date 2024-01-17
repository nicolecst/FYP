<template>
  <div>
    <!-- <nav class="navbar navbar-light bg-light">
      <a class="navbar-brand" href="#">Navbar</a>
      <a href="">home</a>
    </nav> -->
    <nav class="navbar nb navbar-light">
      <div class="justify-content-left">
        <a class="navbar-brand">E-trip</a>
        <a href="">Home</a>
      </div>

      <div class="justify-content-right">
        <ul class="nav gap-1">
          <li class="nav-item">
            <input
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
            </button>
          </li>
          <li>
            <a class="nav-link" href="/userProfile">
              <span style="font-size: 1.5em; color: #ffffdd">
                <font-awesome-icon icon="fa-solid fa-circle-user" /> </span
            ></a>
          </li>

          <!-- <button @click="userProfile()" class="btn btn-sm">user</button> -->
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  components: {},
  data() {},
  methods: {},
  setup() {
    const userProfile = async function () {
      location.assign("/userProfile");
    };
    return {
      userProfile,
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
  margin: 5px;
}
.btn:hover {
  background-color: #ffffdd;
  color: #016a70;
}

.nb {
  background-color: #016a70;
  color: #ffffdd;
  display: flex;
  align-items: center;
}

.navbar {
  padding: 10px;
}

.navbar-brand {
  font-family: AchivoBlack;
  color: #ffffdd;
  font-size: xx-large;
}

.form-horizontal {
  border-radius: 6px;
  margin: 5px;
}
</style>
