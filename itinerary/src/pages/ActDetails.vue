<template>
  <div>
    <NavBar />
    <h1>this is the actDetail page</h1>
    <p>{{ activity.Act_ID }}</p>
    <p>{{ activity.Act_name }}</p>
    <p>{{ activity.Location }}</p>
    <p>{{ activity.Area }}</p>
    <p>{{ activity.District }}</p>
    <p>{{ activity.Type }}</p>
    <p>{{ activity.Category }}</p>
    <p>{{ activity.Description }}</p>
    <a href="">{{ activity.Info}}</a>

  </div>
</template>

<script>
import axios from "axios";
import NavBar from "@/components/NavBar.vue";
import { useRoute } from "vue-router";

export default {
  name: "ActDetails",
  components: {
    NavBar,
  },
  data() {
    return{
        activity: {},
    }
  },
  mounted() {

    const route = useRoute();
    axios
      .get("/api/activities/" + route.params.id)
      .then((response) => this.activity = response.data);
  },
};
</script>

<style scoped>
a{
    color: #016a70;
}
</style>
