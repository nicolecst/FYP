<template lang="">
  <div class="outer-container">
    <NavBar />
    <div class="container">
      <nav style="--bs-breadcrumb-divider: '>'" aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">Itinerary History</li>
        </ol>
      </nav>
      <div class="sub-container">
        <h1 style="font-family: BungeeInline">Check your planned trips!</h1>
        <!-- <p>{{ plans }}</p> -->
        <HistCard
          v-for="plan in plans"
          :key="plan._id"
          :id="plan._id"
          :name="plan.name"
          :type="plan.type"
          :participants="plan.participants"
          :start="plan.from"
          :end="plan.to"
          :rating="plan.rate"
          :view="plan.is_public"
        />
      </div>
    </div>
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

    console.log(response);
  },
};
</script>

<style scoped>
.container {
  margin-top: 30px;
}

.sub-container{
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #DCF2EC;
  padding: 30px;
}

</style>
