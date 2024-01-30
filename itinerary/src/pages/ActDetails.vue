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
    <p>{{ activity.Charge }}</p>
    <p>{{ activity.Description }}</p>
    <a href="">{{ activity.Info}}</a>
    <p>{{ activity.Approved }}</p>

    <a :href="'/actEdit/'+ activity._id">
        <button v-if="user.is_Admin==true" class="btn btn-primary">Edit</button>
    </a>
    

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
        user: {}
    }
  },
  mounted() {

    const route = useRoute();
    axios
      .get("/api/activities/" + route.params.id)
      .then((response) => this.activity = response.data);

    const i = localStorage.getItem("userID");
    console.log(i);
    axios
      .get("/api/users/" + i)
      .then((response) => (this.user = response.data));
  },
};
</script>

<style scoped>
a{
    color: #016a70;
}
</style>
