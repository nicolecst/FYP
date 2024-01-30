<template>
  <div>
    <NavBarVue />
    <h1>This is the admin home page</h1>
    <div class="container">
      <CardViewVue
        v-for="activity in activities"
        :key="activity._id"
        :actname="activity.Act_name"
        :area="activity.Area"
        :district="activity.District"
        :type="activity.Type"
        :category="activity.Category"
        :charge="activity.Charge"
        :act_ID="activity._id"
      />
    </div>

    <!-- <p>{{ activities }}</p> -->
  </div>
</template>

<script>
import NavBarVue from "@/components/NavBar.vue";
import CardViewVue from "@/components/CardView.vue";
import axios from "axios";
export default {
  name: "AdminHome",
  components: {
    NavBarVue,
    CardViewVue,
  },
  data() {
    return {
      activities: {},
    };
  },
  methods: {},
  async created() {
    await axios
      .get("/api/")
      .then((response) => (this.activities = response.data));
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
}
</style>
