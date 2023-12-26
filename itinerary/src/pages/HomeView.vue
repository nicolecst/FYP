<template>
  <div>
    <h1>HomePage</h1>
    <p>{{activities}}</p>
  </div>
</template>

<script type="module">
import axios from "axios";

export default {
  name: "HomeView",
  components: {},
  data() {
    return {
      activities: [],
    };
  },
  async created() {
    const response = await axios.get("/api/login", {
      headers:{
        Authorization: 'Bearer' + localStorage.getItem('token')
      }
    });

    // const activities = response.data;
    // this.activities = activities;

    console.log(response)
    // location.assign('/')
  },
};
</script>
