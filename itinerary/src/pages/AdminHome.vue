<template>
  <div>
    <NavBarVue />
    <h1>This is the admin home page</h1>
    <h1>Waiting for approval...</h1>
    <div class="container">
      <div class="scrolls">
        <CardViewVue
          v-for="activity in notApproved().slice(0, 10)"
          :key="activity._id"
          :actname="activity.Act_name"
          :area="activity.Area"
          :district="activity.District"
          :type="activity.Type"
          :category="activity.Category"
          :charge="activity.Charge"
          :act_ID="activity._id"
          :approved="activity.Approved"
        />
      </div>
    </div>
    <h1>Approved activities</h1>
    <div class="container">
      <CardViewVue
        v-for="activity in approved()"
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
      activities: [],
    };
  },
  methods: {
    notApproved() {
      return this.activities.filter((a) => a.Approved === false);
    },
    approved() {
      return this.activities.filter((a) => a.Approved === true);
    },
  },
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

.scrolls {
  display: flex;
  flex-wrap: no-wrap;
  overflow-x: auto;
  margin: 20px;
}
</style>
