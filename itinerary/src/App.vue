<template>
  <div>
    <!-- <NavBar/> -->
    <router-view></router-view>
  </div>
</template>

<script>
// import NavBar from './components/NavBar.vue';
export default {
  name: "App",
  components: {
    // NavBar
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
}
h1{
    font-weight: 800;
}
label{
    font-weight: 600;
}
@font-face {
  font-family: "rabikiso";
  src: local("rabikiso"),
   url(./assets/fonts/RubikDoodleShadow-Regular.ttf) format("truetype");
}
@font-face {
  font-family: "AchivoBlack";
  src: local("achivoblack"),
   url(./assets/fonts/ArchivoBlack-Regular.ttf) format("truetype");
}
</style>
