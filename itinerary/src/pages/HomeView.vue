<template>
  <div>
    <h1>HomePage</h1>
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
    const response = await axios.get("/api/");
    const activities = response.data;
    this.activities = activities;
  },
};
</script>
