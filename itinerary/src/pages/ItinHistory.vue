<template lang="">
  <div>
    <NavBar />
    <h1>Itinerary History</h1>
    <!-- <p>{{ plans }}</p> -->
    <HistCard v-for="plan in plans" :key="plan._id"
    :id="plan._id"
    :name="plan.name"
    :type="plan.type"
    :participants="plan.participants"
    :start="plan.from"
    :end="plan.to"
    :view="plan.is_public" />
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import HistCard from "@/components/HistCard.vue";
import axios from "axios";

export default {
  name: "ItinHistory",
  components: {
    NavBar,
    HistCard,
  },
  data() {
    return {
      plans: [],
    };
  },
  async created() {
    const i = localStorage.getItem("userID");
    console.log(i);

    const response = axios
      .get("/api/itinHistory/" + i)
      .then((response) => (this.plans = response.data));
      
      console.log(response)
  },
};
</script>

<style scoped></style>
